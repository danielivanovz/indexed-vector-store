[indexed-vector-db](../README.md) / MaxHeap

# Class: MaxHeap<T\>

A MaxHeap data structure class that keeps track of elements based on their `score`.
This MaxHeap is particularly tailored to contain objects that have a `score` property.

**`Example`**

```ts
const maxHeap = new MaxHeap<{ score: number }>();
maxHeap.insert({ score: 1 });
maxHeap.insert({ score: 5 });
maxHeap.insert({ score: 3 });

console.log(maxHeap.extractMax()); // Outputs: { score: 5 }
```

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

## Table of contents

### Methods

- [extractMax](MaxHeap.md#extractmax)
- [insert](MaxHeap.md#insert)
- [peek](MaxHeap.md#peek)
- [peekAll](MaxHeap.md#peekall)
- [size](MaxHeap.md#size)

## Methods

### extractMax

▸ **extractMax**(): `T`

Removes and returns the element with the highest score in the heap.
Returns `null` if the heap is empty.

#### Returns

`T`

The element with the highest score or `null`.

#### Defined in

vector-store/vector.heap.ts:82

___

### insert

▸ **insert**(`data`): `void`

Inserts a new element into the heap while maintaining the max-heap property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `T` | The element to insert. |

#### Returns

`void`

#### Defined in

vector-store/vector.heap.ts:71

___

### peek

▸ **peek**(): `T`

Retrieves but does not remove the element with the highest score in the heap.
Returns `null` if the heap is empty.

#### Returns

`T`

The element with the highest score or `null`.

#### Defined in

vector-store/vector.heap.ts:102

___

### peekAll

▸ **peekAll**(): `T`[]

Retrieves but does not remove all elements in the heap as an array.

#### Returns

`T`[]

An array of all elements in the heap.

#### Defined in

vector-store/vector.heap.ts:112

___

### size

▸ **size**(): `number`

Returns the current size of the heap.

#### Returns

`number`

The number of elements in the heap.

#### Defined in

vector-store/vector.heap.ts:121
