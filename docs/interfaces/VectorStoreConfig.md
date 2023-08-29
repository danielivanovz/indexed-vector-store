[indexed-vector-store](../README.md) / VectorStoreConfig

# Interface: VectorStoreConfig

Configuration interface for Vector Store.
Allows setting parameters for different aspects such as LSH (Locality-Sensitive Hashing),
magnitude comparison, and caching.

**`Example`**

```ts
const config: VectorStoreConfig = {
    lsh: { dimension: 1536, k: 50 },
    magnitude: { tolerance: 1 / 10e6 },
    cache: { maxCandidates: 1000, enabled: true }
};

@interface VectorStoreConfig
```

## Table of contents

### Properties

- [cache](VectorStoreConfig.md#cache)
- [lsh](VectorStoreConfig.md#lsh)
- [magnitude](VectorStoreConfig.md#magnitude)

## Properties

### cache

• **cache**: `Object`

Configuration options for internal caching.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `enabled` | `boolean` | Flag to enable or disable caching. |
| `maxCandidates` | `number` | Maximum number of candidates that can be stored in the cache. |

#### Defined in

[vector-store/vector.config.ts:42](https://github.com/danielivanovz/indexed-vector-store/blob/01a8e5f/src/vector-store/vector.config.ts#L42)

___

### lsh

• **lsh**: `Object`

Configuration options for Locality-Sensitive Hashing (LSH).

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `dimension` | `number` | Dimensionality of the input vectors. |
| `k` | `number` | Number of hash functions to use. |

#### Defined in

[vector-store/vector.config.ts:19](https://github.com/danielivanovz/indexed-vector-store/blob/01a8e5f/src/vector-store/vector.config.ts#L19)

___

### magnitude

• **magnitude**: `Object`

Configuration options for magnitude-based retrieval.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `tolerance` | `number` | Tolerance level for magnitude-based matching. A higher value will consider vectors with larger magnitude differences as similar. |

#### Defined in

[vector-store/vector.config.ts:32](https://github.com/danielivanovz/indexed-vector-store/blob/01a8e5f/src/vector-store/vector.config.ts#L32)
