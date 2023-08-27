[indexed-vector-db](../README.md) / Helpers

# Class: Helpers

A utility class that provides various helper methods for vector operations.
These operations are performed using WebAssembly (Wasm) for better performance.

The `Helpers` class provides utility methods for computing magnitudes, dot products,
and cosine similarity between vectors. It also provides methods to generate search
ranges for magnitude and hash indices.

**`Example`**

```ts
const mag = Helpers.computeMagnitude(someFloat32Array);
```

## Table of contents

### Methods

- [computeMagnitude](Helpers.md#computemagnitude)
- [cosine](Helpers.md#cosine)
- [cosineSimilarity](Helpers.md#cosinesimilarity)
- [dotProduct](Helpers.md#dotproduct)
- [hashIndex](Helpers.md#hashindex)

## Methods

### computeMagnitude

▸ `Static` **computeMagnitude**(`vec`): `number`

Computes the magnitude of a given vector.

This method utilizes a Wasm method for high performance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec` | `Float32Array` | The vector for which to compute the magnitude. |

#### Returns

`number`

The magnitude of the vector.

#### Defined in

vector-store/vector.helpers.ts:23

___

### cosine

▸ `Static` **cosine**(`vec1`, `vec2`): `number`

Computes the cosine similarity between two vectors.

This method scales the cosine similarity to be within [0, 1].

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec1` | `Float32Array` | The first vector. |
| `vec2` | `Float32Array` | The second vector. |

#### Returns

`number`

The scaled cosine similarity of the vectors.

#### Defined in

vector-store/vector.helpers.ts:91

___

### cosineSimilarity

▸ `Static` **cosineSimilarity**(`vec1`, `vec2`): `Float32Array`

Computes the cosine similarities of two vectors in batch.

This method utilizes a Wasm method for high performance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec1` | `Float32Array` | The first vector. |
| `vec2` | `Float32Array` | The second vector. |

#### Returns

`Float32Array`

The cosine similarity of the vectors.

#### Defined in

vector-store/vector.helpers.ts:77

___

### dotProduct

▸ `Static` **dotProduct**(`vec1`, `vec2`): `number`

Computes the dot product of two vectors.

This method utilizes a Wasm method for high performance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec1` | `Float32Array` | The first vector. |
| `vec2` | `Float32Array` | The second vector. |

#### Returns

`number`

The dot product of the vectors.

#### Defined in

vector-store/vector.helpers.ts:37

___

### hashIndex

▸ `Static` **hashIndex**(`hash`): `Object`

Computes an `IDBKeyRange` for hash-based querying.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hash` | `string` | The hash to be used for querying. |

#### Returns

`Object`

An object containing the `IDBKeyRange` to be used for querying.

| Name | Type |
| :------ | :------ |
| `range` | `IDBKeyRange` |

#### Defined in

vector-store/vector.helpers.ts:64
