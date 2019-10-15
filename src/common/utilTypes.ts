
export type Await<T> = T extends Promise<infer U> ? U : T;

//#region Key selectors

type NonUndefined<A> = A extends undefined ? never : A;
export type FunctionKeys<T extends object> = {
  [K in keyof T]-?: NonUndefined<T[K]> extends Function ? K : never
}[keyof T];


export type NonFunctionKeys<T extends object> = {
  [K in keyof T]-?: NonUndefined<T[K]> extends Function ? never : K
}[keyof T];

type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X
  ? 1
  : 2) extends (<T>() => T extends Y ? 1 : 2)
  ? A
  : B;
  
export type WritableKeys<T extends object> = {
  [P in keyof T]-?: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    P
  >
}[keyof T];


export type ReadonlyKeys<T extends object> = {
  [P in keyof T]-?: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    never,
    P
  >
}[keyof T];




export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T];


export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never
}[keyof T];
export type KeysByValue<T, ValueType> = {
  [Key in keyof T]: T[Key] extends ValueType ? Key : never
}[keyof T];

export type KeysByValueExact<T, ValueType> = {
  [Key in keyof T]: [ValueType] extends [T[Key]]
  ? [T[Key]] extends [ValueType]
  ? Key
  : never
  : never
}[keyof T];

//#endregion

export type OmitByValue<T, ValueType> = Omit<T, KeysByValue<T, ValueType>>;

export type PickByValue<T, ValueType> = Pick<T, KeysByValue<T, ValueType>>;


export type PickByValueExact<T, ValueType> = Pick<T, KeysByValueExact<T, ValueType>>;
export type OmitByValueExact<T, ValueType> = Omit<T, KeysByValueExact<T, ValueType>>;


type Fn<TArgs extends Array<any>, TReturn> = (...args: TArgs) => TReturn;


type Unpackable<T> = Array<T> | Fn<any, PromiseLike<T> | T> | PromiseLike<T>;
export type Unpack<T> = T extends Unpackable<infer R> ? R : T;
type UnpackableMap = Unpackable<any> |
  Record<any, Unpackable<any> |
    Record<any, Unpackable<any> |
      Record<any, Unpackable<any> |
        Record<any, Unpackable<any> |
          Record<any, Unpackable<any> |
            Record<any, Unpackable<any>>>>>>>;
export type UnpackMap<T extends UnpackableMap> =
  T extends Unpackable<infer R> ? R :
  T extends Record<string, UnpackableMap> ? {
    [K in keyof T]: UnpackMap<T[K]>
  } :
  T;


export type Brand<T, U> = T & { __brand: U };