
import { EmbeddingsUpgradeStrategy } from "./db.strategy"
import { CustomDBConfig, CustomDBSchema } from "./db.types"


export const schemadb: CustomDBSchema = {
    embeddings: {
        key: 'id',
        value: {
            id: '',
            vector: [],
        },
        indexes: {
            hash: 'hash',
            magnitude: 'magnitude',
            vector: 'vector',
            text: 'text',
            timestamp: 'timestamp',
        },
    },
};


export const configdb: CustomDBConfig = {
    database: { name: 'vector-store', version: 1 },
    storeName: ['embeddings'],
    keyPath: 'id',
    strategy: new EmbeddingsUpgradeStrategy(),
    options: { autoIncrement: true },
    uniqueIndexes: ['text'],
}
