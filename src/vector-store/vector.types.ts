export interface Vector {
    id?: number
    text: string
    vector: Float32Array
    hash?: string
    magnitude?: number
    timestamp?: number
    score?: number
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
