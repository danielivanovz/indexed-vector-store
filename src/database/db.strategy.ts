import { IDBPDatabase, IndexNames, StoreNames } from 'idb'
import { schemadb } from './db.config'
import { CustomDBSchema } from './db.types'

export interface UpgradeStrategy<DBSchemaType> {
    upgrade(
        db: IDBPDatabase<DBSchemaType>,
        config: Record<'storeName' | 'keyPath' | 'options' | 'uniqueIndexes', any>
    ): void
}

export class EmbeddingsUpgradeStrategy implements UpgradeStrategy<CustomDBSchema> {
    upgrade(
        db: IDBPDatabase<CustomDBSchema>,
        config: {
            storeName: StoreNames<CustomDBSchema>[]
            keyPath: string
            options?: IDBObjectStoreParameters
            uniqueIndexes: string[]
        }
    ): void {
        const { keyPath, options } = config

        for (const storeName of config.storeName) {
            const store = db.createObjectStore(storeName, { keyPath, ...options })

            if (schemadb.embeddings && storeName === 'embeddings') {
                Object.entries(schemadb.embeddings.indexes!).forEach(
                    ([indexName, indexKeyPath]) => {
                        store.createIndex(
                            indexName as IndexNames<CustomDBSchema, typeof storeName>,
                            indexKeyPath as string,
                            config.uniqueIndexes.includes(indexName)
                                ? { unique: true }
                                : { unique: false }
                        )
                    }
                )
            }

            if (schemadb.configurations && storeName === 'configurations') {
                /* configurations store has no indexes */
            }
        }
    }
}
