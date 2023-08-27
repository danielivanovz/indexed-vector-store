import { UpgradeStrategy } from './db.strategy'

export interface EmbeddingValue {
    readonly id: string
    readonly hash: string
    readonly text: string
    readonly vector: number[]
}

export interface EmbeddingsStore {
    readonly key: 'id'
    readonly value: EmbeddingValue
    readonly indexes: {
        readonly name: 'hash'
        readonly magnitude: 'magnitude'
        readonly vector: 'vector'
    }
}

export interface DBSchema {
    readonly embeddings: EmbeddingsStore
}

export interface DBConfig {
    readonly database: {
        readonly name: string
        readonly version: number
    }
    readonly storeName: string[]
    readonly keyPath: 'id'
    readonly strategy: UpgradeStrategy<DBSchema>
    readonly options: {
        readonly autoIncrement: boolean
    }
    readonly uniqueIndexes: string[]
}