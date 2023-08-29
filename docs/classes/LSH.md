[indexed-vector-store](../README.md) / LSH

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
- [storeProjections](LSH.md#storeprojections)

## Constructors

### constructor

• **new LSH**(`dimensions`, `k`, `projection?`)

Initializes a new `LSH` instance.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `dimensions` | `number` | `undefined` | The number of dimensions in the vectors to be hashed. |
| `k` | `number` | `undefined` | The number of random projections (hashes) to generate. |
| `projection` | `number`[][] | `[]` | - |

#### Defined in

[vector-store/vector.lsh.ts:23](https://github.com/danielivanovz/indexed-vector-store/blob/01a8e5f/src/vector-store/vector.lsh.ts#L23)

## Methods

### computeHash

▸ **computeHash**(`vector`): `string`

Computes a hash for the given vector.

The hash is computed using the generated random projections.
Each projection results in a bit ('0' or '1') and the bits are concatenated to form the final hash.

#### Parameters

| Name | Type |
| :------ | :------ |
| `vector` | `number`[] |

#### Returns

`string`

The computed hash as a string of '0's and '1's.

#### Defined in

[vector-store/vector.lsh.ts:74](https://github.com/danielivanovz/indexed-vector-store/blob/01a8e5f/src/vector-store/vector.lsh.ts#L74)

___

### storeProjections

▸ **storeProjections**(`db`): `Promise`<`void`\>

Stores the projections in the database for later use.

This is an internal utility method used during the initialization.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `db` | `IDBPDatabase`<`CustomDBSchema`\> | The database to store the projections in. |

#### Returns

`Promise`<`void`\>

#### Defined in

[vector-store/vector.lsh.ts:39](https://github.com/danielivanovz/indexed-vector-store/blob/01a8e5f/src/vector-store/vector.lsh.ts#L39)
