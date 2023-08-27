[indexed-vector-db](../README.md) / VectorCache

# Class: VectorCache<K, V\>

A simple Least Recently Used (LRU) cache for vectors or other data types.
This class allows you to store a limited amount of key-value pairs, automatically removing
the least recently used items when the cache limit is exceeded.

**`Example`**

```ts
const cache = new VectorCache<number, Float32Array>(5);
cache.set(1, new Float32Array([1, 2, 3]));
cache.set(2, new Float32Array([4, 5, 6]));

const vec = cache.get(1); // Retrieves the Float32Array associated with the key "1".
```

## Type parameters

| Name | Description |
| :------ | :------ |
| `K` | Type of keys that will be used to index the cache. |
| `V` | Type of values that will be stored in the cache. |

## Table of contents

### Constructors

- [constructor](VectorCache.md#constructor)

### Methods

- [clear](VectorCache.md#clear)
- [get](VectorCache.md#get)
- [set](VectorCache.md#set)

## Constructors

### constructor

• **new VectorCache**<`K`, `V`\>(`maxSize`)

Initializes a new VectorCache object with the specified maximum size.

#### Type parameters

| Name |
| :------ |
| `K` |
| `V` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `maxSize` | `number` | The maximum number of items that can be stored in the cache. |

#### Defined in

vector-store/vector.cache.ts:25

## Methods

### clear

▸ **clear**(): `void`

Clears all items from the cache.

#### Returns

`void`

#### Defined in

vector-store/vector.cache.ts:65

___

### get

▸ **get**(`key`): `V`

Retrieves the value associated with a given key.
Updates the "recently used" status of the retrieved item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `K` | The key associated with the value to retrieve. |

#### Returns

`V`

The value associated with the key or `undefined` if the key does not exist.

#### Defined in

vector-store/vector.cache.ts:36

___

### set

▸ **set**(`key`, `value`): `void`

Stores a new key-value pair in the cache.
If the cache is full, removes the least recently used item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `K` | The key under which to store the value. |
| `value` | `V` | The value to store in the cache. |

#### Returns

`void`

#### Defined in

vector-store/vector.cache.ts:54
