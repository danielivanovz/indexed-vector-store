export interface EmbeddingStrategy<T> {
    embed(text: string | string[]): Promise<T[]>
    parseEmbeddings(embeddings: T[]): number[][]
}
