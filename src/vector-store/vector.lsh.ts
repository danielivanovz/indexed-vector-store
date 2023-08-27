/**
 * `LSH` (Locality Sensitive Hashing) class for computing vector hashes.
 * 
 * This class uses random projections to compute binary hashes for high-dimensional vectors.
 * It's commonly used in nearest neighbor search algorithms and similarity measurements.
 *
 * @example
 * const lsh = new LSH(128, 50);
 * const hash = lsh.computeHash(someFloat32Array);
 */
class LSH {
    private randomProjections: number[][]

    /**
     * Initializes a new `LSH` instance.
     *
     * @param dimensions - The number of dimensions in the vectors to be hashed.
     * @param k - The number of random projections (hashes) to generate.
     */
    constructor(private dimensions: number, private k: number) {
        this.randomProjections = this.generateRandomProjections()
    }

    /**
     * Generates an array of random projection vectors.
     *
     * This is an internal utility method used during the initialization.
     * 
     * @returns An array of random projection vectors.
     * @private
     */
    private generateRandomProjections(): number[][] {
        const projections: number[][] = []
        for (let i = 0; i < this.k; i++) {
            const randomVec = Array.from({ length: this.dimensions }, () => Math.random() * 2 - 1)
            projections.push(randomVec)
        }
        return projections
    }

    /**
     * Computes a hash for the given vector.
     * 
     * The hash is computed using the generated random projections.
     * Each projection results in a bit ('0' or '1') and the bits are concatenated to form the final hash.
     *
     * @param vecf32 - The vector for which to compute the hash. Should be a Float32Array.
     * 
     * @returns The computed hash as a string of '0's and '1's.
     */
    computeHash(vecf32: Float32Array): string {
        const vector = Array.from(vecf32)
        let hashBits: string = ''
        for (let i = 0; i < this.k; i++) {
            const dotProduct = vector.reduce(
                (sum, value, idx) => sum + value * this.randomProjections[i]![idx]!,
                0
            )
            hashBits += dotProduct >= 0 ? '1' : '0'
        }
        return hashBits
    }
}

export { LSH }
