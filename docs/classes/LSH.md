[indexed-vector-db](../README.md) / LSH

# Class: LSH

`LSH` (Locality Sensitive Hashing) class for computing vector hashes.

This class uses random projections to compute binary hashes for high-dimensional vectors.
It's commonly used in nearest neighbor search algorithms and similarity measurements.

**`Example`**

```ts
const lsh = new LSH(128, 50);
const hash = lsh.computeHash(someFloat32Array);
```

## Table of contents

### Constructors

- [constructor](LSH.md#constructor)

### Methods

- [computeHash](LSH.md#computehash)

## Constructors

### constructor

• **new LSH**(`dimensions`, `k`)

Initializes a new `LSH` instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dimensions` | `number` | The number of dimensions in the vectors to be hashed. |
| `k` | `number` | The number of random projections (hashes) to generate. |

#### Defined in

vector-store/vector.lsh.ts:20

## Methods

### computeHash

▸ **computeHash**(`vecf32`): `string`

Computes a hash for the given vector.

The hash is computed using the generated random projections.
Each projection results in a bit ('0' or '1') and the bits are concatenated to form the final hash.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vecf32` | `Float32Array` | The vector for which to compute the hash. Should be a Float32Array. |

#### Returns

`string`

The computed hash as a string of '0's and '1's.

#### Defined in

vector-store/vector.lsh.ts:51
