[indexed-vector-store](../README.md) / VectorStore

# Class: VectorStore<T\>

`VectorStore` class for managing vector embeddings.

**`Example`**

```ts
const db = // IDBPDatabase instance
const store = new VectorStore(db, { lsh: { dimension: 128, k: 50 }, magnitude: { tolerance: 0.5 }});
```

## Type parameters

| Name |
| :------ |
| `T` |

## Implements

- `VectorStoreInterface`

## Table of contents

### Constructors

- [constructor](VectorStore.md#constructor)

### Methods

- [clear](VectorStore.md#clear)
- [delete](VectorStore.md#delete)
- [exportToFile](VectorStore.md#exporttofile)
- [importFromFile](VectorStore.md#importfromfile)
- [insert](VectorStore.md#insert)
- [searchByIndex](VectorStore.md#searchbyindex)
- [setEmbeddingStrategy](VectorStore.md#setembeddingstrategy)
- [update](VectorStore.md#update)

## Constructors

### constructor

• **new VectorStore**<`T`\>(`db`, `config`)

Creates an instance of the `VectorStore` class.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `db` | `IDBPDatabase`<`CustomDBSchema`\> | The indexedDB database to be used. |
| `config` | [`VectorStoreConfig`](../interfaces/VectorStoreConfig.md) | Configuration object. Uses default configuration if not provided. |

**`Throws`**

Throws an error if the provided configuration is invalid.

#### Defined in

[store.ts:45](https://github.com/danielivanovz/indexed-vector-store/blob/01a8e5f/src/store.ts#L45)

## Methods

### clear

▸ **clear**(): `Promise`<`void`\>

Clears all records from the store.

#### Returns

`Promise`<`void`\>

#### Implementation of

VectorStoreInterface.clear

#### Defined in

[store.ts:264](https://github.com/danielivanovz/indexed-vector-store/blob/01a8e5f/src/store.ts#L264)

___

### delete

▸ **delete**(`id`): `Promise`<`void`\>

Deletes a record from the store by its ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `number` | The ID of the record to delete. |

#### Returns

`Promise`<`void`\>

**`Throws`**

Throws an error if the record is not found.

#### Implementation of

VectorStoreInterface.delete

#### Defined in

[store.ts:253](https://github.com/danielivanovz/indexed-vector-store/blob/01a8e5f/src/store.ts#L253)

___

### exportToFile

▸ **exportToFile**(`filename?`): `Promise`<`void`\>

Exports all records from the store to a JSON file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filename?` | `string` | The name of the file to export to. |

#### Returns

`Promise`<`void`\>

#### Defined in

[store.ts:278](https://github.com/danielivanovz/indexed-vector-store/blob/01a8e5f/src/store.ts#L278)

___

### importFromFile

▸ **importFromFile**(`file`): `Promise`<`void`\>

Imports records from a JSON file into the store.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `File` | The JSON file to import. |

#### Returns

`Promise`<`void`\>

#### Defined in

[store.ts:312](https://github.com/danielivanovz/indexed-vector-store/blob/01a8e5f/src/store.ts#L312)

___

### insert

▸ **insert**(`records`, `skipDuplicates?`): `Promise`<`void`\>

Inserts an array of vectors into the store.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `records` | `Insertable`[] | `undefined` | An array of insertable records. |
| `skipDuplicates` | `boolean` | `false` | Whether to skip duplicate records. |

#### Returns

`Promise`<`void`\>

**`Throws`**

Throws an error if no embedding strategy is set when needed.

#### Implementation of

VectorStoreInterface.insert

#### Defined in

[store.ts:139](https://github.com/danielivanovz/indexed-vector-store/blob/01a8e5f/src/store.ts#L139)

___

### searchByIndex

▸ **searchByIndex**(`indexName`, `vector`, `limit?`): `Promise`<`Vector`[]\>

Searches vectors by a given index.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `indexName` | `IndexName` | `undefined` | The index by which to search. |
| `vector` | `Vector` | `undefined` | The vector for which to search. |
| `limit` | `number` | `10` | The maximum number of results to return. |

#### Returns

`Promise`<`Vector`[]\>

An array of vectors that match the search criteria.

**`Throws`**

Throws an error for an invalid index name.

#### Implementation of

VectorStoreInterface.searchByIndex

#### Defined in

[store.ts:180](https://github.com/danielivanovz/indexed-vector-store/blob/01a8e5f/src/store.ts#L180)

___

### setEmbeddingStrategy

▸ **setEmbeddingStrategy**(`strategy`): `void`

Sets the embedding strategy for this `VectorStore` instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `strategy` | `EmbeddingStrategy`<`T`\> | The embedding strategy to be used. |

#### Returns

`void`

#### Defined in

[store.ts:100](https://github.com/danielivanovz/indexed-vector-store/blob/01a8e5f/src/store.ts#L100)

___

### update

▸ **update**(`id`, `record`): `Promise`<`void`\>

Updates a record in the store by its ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `number` | The ID of the record to update. |
| `record` | `Vector` | The new vector data. |

#### Returns

`Promise`<`void`\>

**`Throws`**

Throws an error if the record is not found.

#### Implementation of

VectorStoreInterface.update

#### Defined in

[store.ts:237](https://github.com/danielivanovz/indexed-vector-store/blob/01a8e5f/src/store.ts#L237)
