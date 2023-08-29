
import { EmbeddingsUpgradeStrategy } from "./db.strategy"
import { CustomDBConfig, CustomDBSchema } from "./db.types"


export const schemadb: CustomDBSchema = {
    embeddings: {
        key: 'text',
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
    configurations: {
        key: 'name',
        value: {
            name: '',
            value: {
                dimension: 0,
                k: 0,
                projection: [],
            },
        },
        indexes: {},
    },
};


export const configdb: CustomDBConfig = {
    database: { name: 'vector-store', version: 1 },
    storeName: ['embeddings', 'configurations'],
    keyPath: 'text',
    strategy: new EmbeddingsUpgradeStrategy(),
    options: { autoIncrement: true },
    uniqueIndexes: ['text'],
}
