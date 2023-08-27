/**
 * A MaxHeap data structure class that keeps track of elements based on their `score`.
 * This MaxHeap is particularly tailored to contain objects that have a `score` property.
 *
 * @example
 * const maxHeap = new MaxHeap<{ score: number }>();
 * maxHeap.insert({ score: 1 });
 * maxHeap.insert({ score: 5 });
 * maxHeap.insert({ score: 3 });
 *
 * console.log(maxHeap.extractMax()); // Outputs: { score: 5 }
 */
class MaxHeap<T extends { score: number }> {
    private heap: T[] = []

    private parent(index: number): number {
        return Math.floor((index - 1) / 2)
    }

    private leftChild(index: number): number {
        return 2 * index + 1
    }

    private rightChild(index: number): number {
        return 2 * index + 2
    }

    private swap(index1: number, index2: number) {
        const temp = this.heap[index1]
        this.heap[index1] = this.heap[index2]
        this.heap[index2] = temp
    }

    private siftUp() {
        let index = this.heap.length - 1

        while (index > 0 && this.heap[this.parent(index)].score < this.heap[index].score) {
            this.swap(index, this.parent(index))
            index = this.parent(index)
        }
    }

    private siftDown() {
        let index = 0
        const length = this.heap.length
        const elementPriority = this.heap[index].score

        while (this.leftChild(index) < length) {
            let largerChildIndex = this.leftChild(index)
            const rightChildIdx = this.rightChild(index)

            if (
                rightChildIdx < length &&
                this.heap[rightChildIdx].score > this.heap[largerChildIndex].score
            ) {
                largerChildIndex = rightChildIdx
            }

            if (elementPriority > this.heap[largerChildIndex].score) break

            this.swap(index, largerChildIndex)
            index = largerChildIndex
        }
    }

    /**
     * Inserts a new element into the heap while maintaining the max-heap property.
     *
     * @param data - The element to insert.
     */
    insert(data: T) {
        this.heap.push(data)
        this.siftUp()
    }

    /**
     * Removes and returns the element with the highest score in the heap.
     * Returns `null` if the heap is empty.
     *
     * @returns The element with the highest score or `null`.
     */
    extractMax(): T | null {
        if (this.heap.length === 0) return null

        const root = this.heap[0]
        const lastElement = this.heap.pop()

        if (this.heap.length > 0) {
            this.heap[0] = lastElement!
            this.siftDown()
        }

        return root
    }

    /**
     * Retrieves but does not remove the element with the highest score in the heap.
     * Returns `null` if the heap is empty.
     *
     * @returns The element with the highest score or `null`.
     */
    peek(): T | null {
        if (this.heap.length === 0) return null
        return this.heap[0]
    }

    /**
     * Retrieves but does not remove all elements in the heap as an array.
     *
     * @returns An array of all elements in the heap.
     */
    peekAll(): T[] {
        return this.heap
    }

    /**
     * Returns the current size of the heap.
     *
     * @returns The number of elements in the heap.
     */
    size(): number {
        return this.heap.length
    }
}

export { MaxHeap }
