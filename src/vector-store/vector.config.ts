/**
 * Configuration interface for Vector Store.
 * Allows setting parameters for different aspects such as LSH (Locality-Sensitive Hashing),
 * magnitude comparison, and caching.
 *
 * @example
 * const config: VectorStoreConfig = {
 *     lsh: { dimension: 1536, k: 50 },
 *     magnitude: { tolerance: 1 / 10e6 },
 *     cache: { maxCandidates: 1000, enabled: true }
 * };
 *
 * @interface VectorStoreConfig
 */
export interface VectorStoreConfig {
    /**
     * Configuration options for Locality-Sensitive Hashing (LSH).
     */
    lsh: {
        /**
         * Dimensionality of the input vectors.
         */
        dimension: number
        /**
         * Number of hash functions to use.
         */
        k: number
    }
    /**
     * Configuration options for magnitude-based retrieval.
     */
    magnitude: {
        /**
         * Tolerance level for magnitude-based matching.
         * A higher value will consider vectors with larger magnitude differences as similar.
         */
        tolerance: number
    }
    /**
     * Configuration options for internal caching.
     */
    cache: {
        /**
         * Maximum number of candidates that can be stored in the cache.
         */
        maxCandidates: number
        /**
         * Flag to enable or disable caching.
         */
        enabled: boolean
    }
}

/**
 * Default configuration settings for Vector Store.
 * - For LSH: Assumes a 1536-dimensional input vector and uses 50 hash functions.
 * - For magnitude: Sets a default tolerance of 1e-7.
 * - For cache: Sets a maximum of 1000 candidates and enables caching.
 *
 * @constant defaultConfig
 */
export const defaultConfig: VectorStoreConfig = {
    lsh: { dimension: 1536, k: 50 },
    magnitude: { tolerance: 1e-7 },
    cache: { maxCandidates: 1000, enabled: true },
}

