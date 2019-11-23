/**
 * Matches any [primitive value]{@link https://developer.mozilla.org/en-US/docs/Glossary/Primitive}
 * @todo This can just be `export type Primitive = not object` when the `not` keyword is out.
 */
export type Primitive = null | undefined | string | number | boolean | symbol | bigint;
/**
 * Matches a [`class` constructor]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes}.
 */
export type Class<TInstance, TArgs extends any[] = any[]> = new (...args: TArgs) => TInstance;

export type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array;

/**
 * @summary
 * Matches a JSON object.
 * @description
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from.
 * *Don't use this as a direct return type as the user would have to double-cast it (e.g.`jsonObject as unknown as CustomResponse`). Instead, you could extend your CustomResponse type from it to ensure your type only uses JSON-compatible types.*
 * @example
 * interface CustomResponse extends JsonObject {
 *  …
 * }
 */
export type JsonObject = { [key: string]: JsonValue };

/**
 * @summary Matches a JSON array.
 */
export interface JsonArray extends Array<JsonValue> {}
/**
 * @summary Matches any valid JSON value.
 */
export type JsonValue = string | number | boolean | null | JsonObject | JsonArray;

declare global {
  interface SymbolConstructor {
    readonly observable: symbol;
  }
}

/**
 * @summary Matches a value that is like an [Observable]{@link https://github.com/tc39/proposal-observable}.
 */
export interface ObservableLike {
  subscribe(observer: (value: unknown) => void): void;
  [Symbol.observable](): ObservableLike;
}
