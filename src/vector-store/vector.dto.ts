import { LSH, Vector, helpers } from '..'

export class VectorDTO implements Vector {
    id: number
    text: string
    vector: Float32Array

    hash?: string
    magnitude?: number
    timestamp?: number
    score?: number

    constructor(vector: Vector) {
        this.id = vector.id
        this.vector = Array.isArray(vector.vector) ? new Float32Array(vector.vector) : vector.vector
    }

    hydrateVec(lsh: LSH): this {
        this.hash = lsh.computeHash(this.vector)
        this.magnitude = helpers.computeMagnitude(this.vector)
        return this
    }

    asArray(): number[] {
        return Array.from(this.vector)
    }

    asFloat32Array(): Float32Array {
        return this.vector
    }
}