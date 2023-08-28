import { UpgradeStrategy } from './db.strategy'

export interface EmbeddingValue {
    id: string
    vector: number[]
}

export interface EmbeddingsStore {
    key: string
    value: EmbeddingValue
    indexes: {
        hash: string
        magnitude: string
        vector: string
        text: string
        timestamp: string
    }
}

export interface CustomDBSchema {
    embeddings: EmbeddingsStore
}

export interface CustomDBConfig {
    database: {
        name: string
        version: number
    }
    storeName: string[]
    keyPath: 'vector'
    strategy: UpgradeStrategy<CustomDBSchema>
    options: {
        autoIncrement: boolean
    }
    uniqueIndexes: string[]
}

export interface EmbeddingValue {
    id: string
    vector: number[]
}
