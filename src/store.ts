import { IDBPDatabase } from 'idb'

import {
    CustomDBSchema,
    EmbeddingStrategy,
    IndexName,
    Insertable,
    LSH,
    MaxHeap,
    Transaction,
    Vector,
    VectorCache,
    VectorDTO,
    VectorStoreConfig,
    VectorStoreInterface,
    defaultConfig,
    helpers,
} from '.'

/**
 * `VectorStore` class for managing vector embeddings.
 *
 * @example
 * const db = // IDBPDatabase instance
 * const store = new VectorStore(db, { lsh: { dimension: 128, k: 50 }, magnitude: { tolerance: 0.5 }});
 */
export class VectorStore<T> implements VectorStoreInterface {
    private db: IDBPDatabase<CustomDBSchema>
    private config: VectorStoreConfig = defaultConfig

    private lsh: LSH = new LSH(this.config.lsh.dimension, this.config.lsh.k)
    private cache: VectorCache<string, Vector[]> = new VectorCache(this.config.cache.maxCandidates)
    private heap: MaxHeap<Vector & { score: number }> = new MaxHeap()

    private embeddingStrategy: EmbeddingStrategy<T> | null = null

    /**
     * Creates an instance of the `VectorStore` class.
     *
     * @param db - The indexedDB database to be used.
     * @param config - Configuration object. Uses default configuration if not provided.
     *
     * @throws {Error} Throws an error if the provided configuration is invalid.
     */
    constructor(db: IDBPDatabase<CustomDBSchema>, config: VectorStoreConfig = defaultConfig) {
        this.validateConfig(config)
        this.db = db
        this.config = config
    }

    /**
     * Validates the configuration object for `VectorStore`.
     *
     * @param config - Configuration object to validate.
     *
     * @throws {Error} Throws an error if any configuration parameter is invalid.
     * @private
     */
    private validateConfig(config: VectorStoreConfig): void {
        if (config.lsh.dimension <= 0 || config.lsh.k <= 0) {
            throw new Error('Invalid LSH configuration')
        }
        if (config.magnitude.tolerance <= 0) {
            throw new Error('Invalid magnitude threshold')
        }
        if (config.cache.maxCandidates <= 0) {
            throw new Error('Invalid maxCandidates for cache')
        }
    }

    /**
     * Sets the embedding strategy for this `VectorStore` instance.
     *
     * @param strategy - The embedding strategy to be used.
     */
    public setEmbeddingStrategy(strategy: EmbeddingStrategy<T>): void {
        this.embeddingStrategy = strategy
    }

    /**
     * Internal method to initiate a transaction.
     *
     * @param mode - The transaction mode. Can be 'readonly' or 'readwrite'.
     * @param skipDuplicates - Flag to skip duplicates during transaction.
     *
     * @returns An object containing the transaction and object store instances.
     * @private
     */
    private transaction = (
        mode: IDBTransactionMode,
        skipDuplicates = false
    ): Transaction<'embeddings'> => {
        const tx = this.db.transaction('embeddings', mode)
        const store = tx.objectStore('embeddings')

        tx.onerror = (event: any) => {
            if (event.target.error.name === 'ConstraintError') {
                if (!skipDuplicates) throw event.target.error
                event.preventDefault()
                console.info('ConstraintError: ', event.target.error.message)
            }
        }

        return { tx, store }
    }

    /**
     * Inserts an array of vectors into the store.
     *
     * @param records - An array of insertable records.
     * @param skipDuplicates - Whether to skip duplicate records.
     *
     * @throws {Error} Throws an error if no embedding strategy is set when needed.
     */
    async insert(records: Insertable[], skipDuplicates = false): Promise<void> {
        const timestamp = new Date().getTime()

        if (typeof records[0] === 'string') {
            if (!this.embeddingStrategy) throw new Error('No embedding strategy set')

            const raw = await this.embeddingStrategy.embed(records as string[])
            const embeddings = this.embeddingStrategy.parseEmbeddings(raw)

            const vectors = embeddings.map((embedding, index) => ({
                text: records[index] as string,
                vector: new Float32Array(embedding),
            }))

            await this.insert(vectors)
        } else if (typeof records[0] === 'object') {
            const typedRecords = records as Vector[]
            const { tx, store } = this.transaction('readwrite', skipDuplicates)

            const promises = typedRecords.map((record: Vector) => {
                const hydrated = new VectorDTO(record).hydrateVec(this.lsh).forInsert()
                return store.add!({ ...record, ...hydrated, timestamp })
            })

            await Promise.allSettled(promises).finally(() => tx.done)
        } else {
            throw new Error('Invalid record type')
        }
    }

    /**
     * Searches vectors by a given index.
     *
     * @param indexName - The index by which to search.
     * @param vector - The vector for which to search.
     * @param limit - The maximum number of results to return.
     *
     * @returns An array of vectors that match the search criteria.
     *
     * @throws {Error} Throws an error for an invalid index name.
     */
    async searchByIndex(
        indexName: IndexName,
        vector: Vector,
        limit: number = 10
    ): Promise<Vector[]> {
        const cacheKey = `${indexName}-${vector.text}-${vector.timestamp}-${limit}`
        const cached = this.cache.get(cacheKey)
        if (cached) return cached

        const { tx, store } = this.transaction('readonly')

        const vectorf32 = new VectorDTO(vector).asFloat32Array()
        const get = async (index: string, range: any) => await store.index(index).getAll(range)

        // prettier-ignore
        const QueryStrategy: Record<IndexName, () => Promise<Vector[]>> = {
            text:       () => get(IndexName.Text, vector.text),
            hash:       () => get(IndexName.Hash, IDBKeyRange.bound(this.lsh.computeHash(vectorf32), this.lsh.computeHash(vectorf32))),
            magnitude:  () => get(IndexName.Magnitude, helpers.magnitudeIndex(vectorf32, this.config.magnitude.tolerance).range),
            vector:     () => get(IndexName.Vector, vectorf32),
            timestamp:  () => get(IndexName.Timestamp, vector.timestamp),
        }

        if (!QueryStrategy[indexName]) throw new Error('Invalid index name ' + indexName)

        const bucket = await QueryStrategy[indexName]().finally(() => tx.done)

        bucket.forEach((vector: Vector) => {
            const similarity = helpers.cosine(vectorf32, vector.vector as Float32Array)
            this.heap.insert({ ...vector, score: similarity })
        })

        const sorted = Array.from({ length: limit }, () => this.heap.extractMax()).filter(
            (v) => v !== null
        ) as Array<Vector & { score: number }>

        this.cache.set(cacheKey, sorted)

        return sorted
    }

    /**
     * Updates a record in the store by its ID.
     *
     * @param id - The ID of the record to update.
     * @param record - The new vector data.
     *
     * @throws {Error} Throws an error if the record is not found.
     */
    async update(id: number, record: Vector): Promise<void> {
        const { tx, store } = this.transaction('readwrite')
        const hydrated = new VectorDTO(record).hydrateVec(this.lsh)

        await store.put!({ ...hydrated, id })
            .then(() => tx.done)
            .finally(() => this.cache.clear())
    }

    /**
     * Deletes a record from the store by its ID.
     *
     * @param id - The ID of the record to delete.
     *
     * @throws {Error} Throws an error if the record is not found.
     */
    async delete(id: number): Promise<void> {
        const { tx, store } = this.transaction('readwrite')

        await store.delete!(id)
            .then(() => tx.done)
            .finally(() => this.cache.clear())
    }

    /**
     * Clears all records from the store.
     */
    async clear(): Promise<void> {
        const { tx, store } = this.transaction('readwrite')

        await store.clear!()
            .then(() => tx.done)
            .finally(() => this.cache.clear())
    }

    /**
     * Exports all records from the store to a JSON file.
     *
     * @param filename - The name of the file to export to.
     *
     */
    async exportToFile(filename?: string): Promise<void> {
        const { tx, store } = this.transaction('readonly')

        const vectors = await store.getAll().finally(() => tx.done)

        const vecs = vectors.map((vector) => ({
            ...vector,
            vector: Array.from(vector.vector),
        }))

        filename = filename ? filename : `vectors-${Date.now().toString()}.json`

        const blob = new Blob([JSON.stringify(vecs, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)

        const link = document.createElement('a')

        link.download = filename
        link.href = url

        document.body.appendChild(link)

        link.click()

        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }
}
