import { DBSchema } from 'idb'
import { EmbeddingsUpgradeStrategy } from './db.strategy'
import { DBConfig } from './db.types'

export const schemadb: DBSchema = {
    embeddings: {
        key: 'id',
        value: {
            id: 'id',
            vector: 'vector',
        },
        indexes: {
            hash: 'hash',
            magnitude: 'magnitude',
            vector: 'vector',
            text: 'text',
            timestamp: 'timestamp',
        },
    },
}

export const configdb: DBConfig = {
    database: { name: 'vector-store', version: 1 },
    storeName: ['embeddings'],
    keyPath: 'id',
    strategy: new EmbeddingsUpgradeStrategy(),
    options: { autoIncrement: true },
    uniqueIndexes: ['text'],
}
