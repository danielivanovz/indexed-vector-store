import { EmbeddingStrategy } from './embeddings.strategies'

export interface OpenAIEmbedding {
    object: string
    data: OpenAIResponseData[]
    model: string
    usage: OpenAIUsage
}

export interface OpenAIResponseData {
    object: string
    index: number
    embedding: number[]
}

export interface OpenAIUsage {
    prompt_tokens: number
    total_tokens: number
}

export class OpenAIEmbeddingStrategy implements EmbeddingStrategy<OpenAIResponseData> {
    private apiKey: string
    private baseUrl: string

    constructor(apiKey: string, baseUrl: string = 'https://api.openai.com/v1') {
        this.apiKey = apiKey
        this.baseUrl = baseUrl
    }

    async embed(text: string | string[]): Promise<OpenAIResponseData[]> {
        const response = await fetch(`${this.baseUrl}/embeddings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify({
                input: text,
                model: 'text-embedding-ada-002',
            }),
        })

        const json: OpenAIEmbedding = await response.json()

        return json.data
    }

    parseEmbeddings(embeddings: OpenAIResponseData[]): number[][] {
        return embeddings.map((embedding) => embedding.embedding)
    }
}
