import { IDBPObjectStore, IDBPTransaction } from 'idb'
import { CustomDBSchema } from '..'

export interface Vector {
    id?: number
    text: string
    vector: Float32Array | number[]
    hash?: string
    magnitude?: number
    timestamp?: number
    score?: number
}

export interface Transaction<T extends string> {
    tx: IDBPTransaction<CustomDBSchema, [T], IDBTransactionMode>
    store: IDBPObjectStore<CustomDBSchema, [T], T, IDBTransactionMode>
}

export type Insertable = Vector | string
export enum IndexName {
    Text = 'text',
    Hash = 'hash',
    Magnitude = 'magnitude',
    Vector = 'vector',
    Timestamp = 'timestamp',
}

export interface VectorStoreInterface {
    insert(records: Vector[], skipDuplicates: boolean): Promise<void>
    searchByIndex(indexName: string, vector: Vector): Promise<Vector[]>
    update(id: number, record: Vector): Promise<void>
    delete(id: number): Promise<void>
    clear(): Promise<void>
}
