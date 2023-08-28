/**
 * A utility class that provides various helper methods for vector operations.
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
        return Math.sqrt(Array.from(vec).reduce((acc, val) => acc + Math.pow(val, 2), 0))
    }

    /**
     * Computes the dot product of two vectors.
     *
     * This method utilizes a Wasm method for high performance.
     *
     * @param vecA - The first vector.
     * @param vecB - The second vector.
     * @returns The dot product of the vectors.
     */
    static dotProduct(vecA: Float32Array, vecB: Float32Array) {
        return vecA.length !== vecB.length
            ? null
            : Array.from(vecA).reduce((acc, val, i) => acc + val * vecB[i]!, 0)
    }

    /**
     * Computes a range for magnitude-based querying, given a tolerance level.
     *
     * @param vec - The vector for which to compute the magnitude index.
     * @param tolerance - The acceptable tolerance level for the magnitude.
     * @returns An object containing the `IDBKeyRange` to be used for querying.
     */
    static magnitudeIndex = (vec: Float32Array, tolerance: number) => {
        const magnitude = this.computeMagnitude(vec)
        const lowerBound = magnitude - tolerance * magnitude
        const upperBound = magnitude + tolerance * magnitude

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
     * Computes the cosine similarity between two vectors.
     *
     * This method scales the cosine similarity to be within [0, 1].
     *
     * @param vecA - The first vector.
     * @param vecB - The second vector.
     * @returns The scaled cosine similarity of the vectors.
     */
    static cosine = (vecA: Float32Array, vecB: Float32Array): number => {
        const dot = this.dotProduct(vecA, vecB)
        if (dot === null) return 0

        const magA = this.computeMagnitude(vecA)
        const magB = this.computeMagnitude(vecB)

        const normalize = (val: number) => (val + 1) / 2

        return magA === 0 || magB === 0
            ? 0
            : normalize(dot / (magA * magB))
    }
}

export const helpers = Helpers
