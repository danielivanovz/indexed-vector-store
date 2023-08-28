indexed-vector-store

# indexed-vector-store

## Table of contents

### Classes

- [Helpers](classes/Helpers.md)
- [LSH](classes/LSH.md)
- [MaxHeap](classes/MaxHeap.md)
- [VectorCache](classes/VectorCache.md)
- [VectorStore](classes/VectorStore.md)

### Interfaces

- [VectorStoreConfig](interfaces/VectorStoreConfig.md)

### Variables

- [defaultConfig](README.md#defaultconfig)

## Variables

### defaultConfig

• `Const` **defaultConfig**: [`VectorStoreConfig`](interfaces/VectorStoreConfig.md)

Default configuration settings for Vector Store.
- For LSH: Assumes a 1536-dimensional input vector and uses 50 hash functions.
- For magnitude: Sets a default tolerance of 1e-7.
- For cache: Sets a maximum of 1000 candidates and enables caching.

**`Constant`**

defaultConfig

#### Defined in

[vector-store/vector.config.ts:62](https://github.com/danielivanovz/indexed-vector-store/blob/5e87fbd/src/vector-store/vector.config.ts#L62)
