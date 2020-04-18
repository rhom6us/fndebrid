type NeverUndefined<T> = T extends undefined ? never : T;
type NeverNull<T> = T extends null ? never : T;
type NeverNullOrUndefined<T> = NeverNull<NeverUndefined<T>>;
export type FunctionKeys<T extends object> = {
  [K in keyof T]-?: NeverNullOrUndefined<T[K]> extends Function ? K : never;
}[keyof T];

export type NonFunctionKeys<T extends object> = {
  [K in keyof T]-?: NeverNullOrUndefined<T[K]> extends Function ? never : K;
}[keyof T];

type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B;

export type WritableKeys<T extends object> = {
  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P>;
}[keyof T];

export type ReadonlyKeys<T extends object> = {
  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, never, P>;
}[keyof T];

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];
export type KeysByValue<T, ValueType> = {
  [Key in keyof T]: T[Key] extends ValueType ? Key : never;
}[keyof T];

export type KeysByValueExact<T, ValueType> = {
  [Key in keyof T]: [ValueType] extends [T[Key]] ? ([T[Key]] extends [ValueType] ? Key : never) : never;
}[keyof T];
