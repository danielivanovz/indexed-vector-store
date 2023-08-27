import { IDBPDatabase, IndexNames } from 'idb'
import { schemadb } from './db.config'
import { DBConfig, DBSchema } from './db.types'

export interface UpgradeStrategy<DBSchemaType> {
    upgrade(
        db: IDBPDatabase<DBSchemaType>,
        config: Record<'storeName' | 'keyPath' | 'options' | 'uniqueIndexes', any>
    ): void
}

export class EmbeddingsUpgradeStrategy implements UpgradeStrategy<DBSchema> {
    upgrade(db: IDBPDatabase<DBSchema>, config: DBConfig): void {
        const { keyPath, options } = config

        for (const storeName of config.storeName) {
            const store = db.createObjectStore(storeName, { keyPath, ...options })

            if (schemadb.embeddings && storeName === 'embeddings') {
                Object.entries(schemadb.embeddings.indexes!).forEach(
                    ([indexName, indexKeyPath]) => {
                        store.createIndex(
                            indexName as IndexNames<DBSchema, typeof storeName>,
                            indexKeyPath as string,
                            config.uniqueIndexes.includes(indexName)
                                ? { unique: true }
                                : { unique: false }
                        )
                    }
                )
            }
        }
    }
}
