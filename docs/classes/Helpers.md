[indexed-vector-store](../README.md) / Helpers

# Class: Helpers

A utility class that provides various helper methods for vector operations.

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
- [dotProduct](Helpers.md#dotproduct)
- [hashIndex](Helpers.md#hashindex)
- [magnitudeIndex](Helpers.md#magnitudeindex)

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

[vector-store/vector.helpers.ts:20](https://github.com/danielivanovz/indexed-vector-store/blob/01a8e5f/src/vector-store/vector.helpers.ts#L20)

___

### cosine

▸ `Static` **cosine**(`vecA`, `vecB`): `number`

Computes the cosine similarity between two vectors.

This method scales the cosine similarity to be within [0, 1].

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vecA` | `Float32Array` | The first vector. |
| `vecB` | `Float32Array` | The second vector. |

#### Returns

`number`

The scaled cosine similarity of the vectors.

#### Defined in

[vector-store/vector.helpers.ts:73](https://github.com/danielivanovz/indexed-vector-store/blob/01a8e5f/src/vector-store/vector.helpers.ts#L73)

___

### dotProduct

▸ `Static` **dotProduct**(`vecA`, `vecB`): `number`

Computes the dot product of two vectors.

This method utilizes a Wasm method for high performance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vecA` | `Float32Array` | The first vector. |
| `vecB` | `Float32Array` | The second vector. |

#### Returns

`number`

The dot product of the vectors.

#### Defined in

[vector-store/vector.helpers.ts:33](https://github.com/danielivanovz/indexed-vector-store/blob/01a8e5f/src/vector-store/vector.helpers.ts#L33)

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

[vector-store/vector.helpers.ts:60](https://github.com/danielivanovz/indexed-vector-store/blob/01a8e5f/src/vector-store/vector.helpers.ts#L60)

___

### magnitudeIndex

▸ `Static` **magnitudeIndex**(`vec`, `tolerance`): `Object`

Computes a range for magnitude-based querying, given a tolerance level.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec` | `Float32Array` | The vector for which to compute the magnitude index. |
| `tolerance` | `number` | The acceptable tolerance level for the magnitude. |

#### Returns

`Object`

An object containing the `IDBKeyRange` to be used for querying.

| Name | Type |
| :------ | :------ |
| `range` | `IDBKeyRange` |

#### Defined in

[vector-store/vector.helpers.ts:46](https://github.com/danielivanovz/indexed-vector-store/blob/01a8e5f/src/vector-store/vector.helpers.ts#L46)
