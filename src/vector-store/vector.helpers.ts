import { magnitude, dot_product, batch_cosine_similarity, cosine_similarity } from "../wasm-helpers/vector_store_helpers"

/**
 * A utility class that provides various helper methods for vector operations.
 * These operations are performed using WebAssembly (Wasm) for better performance.
 *
 * The `Helpers` class provides utility methods for computing magnitudes, dot products,
 * and cosine similarity between vectors. It also provides methods to generate search
 * ranges for magnitude and hash indices.
 *
 * @example
 * const mag = Helpers.computeMagnitude(someFloat32Array);
 */
export class Helpers {
    /**
     * Computes the magnitude of a given vector.
     *
     * This method utilizes a Wasm method for high performance.
     *
     * @param vec - The vector for which to compute the magnitude.
     * @returns The magnitude of the vector.
     */
    static computeMagnitude(vec: Float32Array) {
        /** @ignore */
        return magnitude(vec)
    }

    /**
     * Computes the dot product of two vectors.
     *
     * This method utilizes a Wasm method for high performance.
     *
     * @param vec1 - The first vector.
     * @param vec2 - The second vector.
     * @returns The dot product of the vectors.
     */
    static dotProduct(vec1: Float32Array, vec2: Float32Array) {
        /** @ignore */
        return dot_product(vec1, vec2)
    }

    /**
     * Computes a range for magnitude-based querying, given a tolerance level.
     *
     * @param vector - The vector for which to compute the magnitude index.
     * @param tolerance - The acceptable tolerance level for the magnitude.
     * @returns An object containing the `IDBKeyRange` to be used for querying.
     */
    /** @ignore */
    static magnitudeIndex = (vector: Float32Array, tolerance: number) => {
        const queryMagnitude = this.computeMagnitude(vector)
        const lowerBound = queryMagnitude - tolerance * queryMagnitude
        const upperBound = queryMagnitude + tolerance * queryMagnitude

        return { range: IDBKeyRange.bound(lowerBound, upperBound) }
    }

    /**
     * Computes an `IDBKeyRange` for hash-based querying.
     *
     * @param hash - The hash to be used for querying.
     * @returns An object containing the `IDBKeyRange` to be used for querying.
     */
    static hashIndex = (hash: string) => {
        return { range: IDBKeyRange.bound(hash, hash) }
    }

    /**
     * Computes the cosine similarities of two vectors in batch.
     *
     * This method utilizes a Wasm method for high performance.
     *
     * @param vec1 - The first vector.
     * @param vec2 - The second vector.
     * @returns The cosine similarity of the vectors.
     */
    static cosineSimilarity = (vec1: Float32Array, vec2: Float32Array) => {
        /** @ignore */
        return batch_cosine_similarity(vec1, vec2, vec2.length)
    }

    /**
     * Computes the cosine similarity between two vectors.
     *
     * This method scales the cosine similarity to be within [0, 1].
     *
     * @param vec1 - The first vector.
     * @param vec2 - The second vector.
     * @returns The scaled cosine similarity of the vectors.
     */
    static cosine = (vec1: Float32Array, vec2: Float32Array): number => {
        /** @ignore */
        const similarities = cosine_similarity(vec1, vec2)
        const normalize = (x: number) => (x + 1) / 2

        return similarities ? normalize(similarities) : 0
    }
}

export const helpers = Helpers
