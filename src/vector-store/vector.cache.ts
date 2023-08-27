/**
 * A simple Least Recently Used (LRU) cache for vectors or other data types.
 * This class allows you to store a limited amount of key-value pairs, automatically removing
 * the least recently used items when the cache limit is exceeded.
 *
 * @example
 * const cache = new VectorCache<number, Float32Array>(5);
 * cache.set(1, new Float32Array([1, 2, 3]));
 * cache.set(2, new Float32Array([4, 5, 6]));
 *
 * const vec = cache.get(1); // Retrieves the Float32Array associated with the key "1".
 *
 * @typeParam K - Type of keys that will be used to index the cache.
 * @typeParam V - Type of values that will be stored in the cache.
 */
class VectorCache<K, V> {
    private data = new Map<K, V>()
    private maxSize: number

    /**
     * Initializes a new VectorCache object with the specified maximum size.
     *
     * @param maxSize - The maximum number of items that can be stored in the cache.
     */
    constructor(maxSize: number) {
        this.maxSize = maxSize
    }

    /**
     * Retrieves the value associated with a given key.
     * Updates the "recently used" status of the retrieved item.
     *
     * @param key - The key associated with the value to retrieve.
     * @returns The value associated with the key or `undefined` if the key does not exist.
     */
    get(key: K): V | undefined {
        const item = this.data.get(key)

        if (item) {
            this.data.delete(key)
            this.data.set(key, item)
        }

        return item
    }

     /**
     * Stores a new key-value pair in the cache.
     * If the cache is full, removes the least recently used item.
     *
     * @param key - The key under which to store the value.
     * @param value - The value to store in the cache.
     */
    set(key: K, value: V): void {
        if (this.data.size >= this.maxSize) {
            this.data.delete(this.data.keys().next().value)
        }

        this.data.set(key, value)
    }

    /**
     * Clears all items from the cache.
     */
    clear(): void {
        this.data.clear()
    }
}

export { VectorCache }
