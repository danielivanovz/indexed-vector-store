/* tslint:disable */
/* eslint-disable */
/**
* @param {Float32Array} a
* @param {Float32Array} b
* @returns {number | undefined}
*/
export function dot_product(a: Float32Array, b: Float32Array): number | undefined;
/**
* @param {Float32Array} a
* @param {Float32Array} b_batch
* @param {number} vec_length
* @returns {Float32Array}
*/
export function batch_cosine_similarity(a: Float32Array, b_batch: Float32Array, vec_length: number): Float32Array;
/**
* @param {Float32Array} a
* @param {Float32Array} b
* @returns {number | undefined}
*/
export function cosine_similarity(a: Float32Array, b: Float32Array): number | undefined;
/**
* @param {Float32Array} a
* @returns {number}
*/
export function magnitude(a: Float32Array): number;
/**
* @param {Float32Array} arrays
* @param {Uint32Array} lengths
* @returns {Float32Array}
*/
export function flatten_arrays(arrays: Float32Array, lengths: Uint32Array): Float32Array;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly dot_product: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly batch_cosine_similarity: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly cosine_similarity: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly magnitude: (a: number, b: number) => number;
  readonly flatten_arrays: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
