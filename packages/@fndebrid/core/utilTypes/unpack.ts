type Fn<TArgs extends any[], TReturn> = (...args: TArgs) => TReturn;

type Unpackable<T> = T[] | Fn<any, PromiseLike<T> | T> | PromiseLike<T>;
export type Unpack<T> = T extends Unpackable<infer R> ? R : T;
type UnpackableMap =
  | Unpackable<any>
  | {
      [key: string]: UnpackableMap;
    };

export type UnpackMap<T extends UnpackableMap> = T extends Unpackable<infer R>
  ? R
  : T extends Record<string, UnpackableMap>
  ? { [K in keyof T]: UnpackMap<T[K]> }
  : T;
