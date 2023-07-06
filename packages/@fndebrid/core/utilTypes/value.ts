/** @deprecated use Extract<TValue, TType> */
export type Always<TValue, TType> = Extract<TValue, TType>;

/** @deprecated use Exclude<TValue, TType> */
export type Never<TValue, TType> = Exclude<TValue, TType>;

/** @deprecated use Extract<TValue, null> */
export type AlwaysNull<TValue extends null> = Always<TValue, null>;

/** @deprecated use Extract<TValue, undefined> */
export type AlwaysUndefined<TValue extends undefined> = Always<TValue, undefined>;

/** @deprecated use NonNullable<T> */
export type AlwaysNullOrUndefined<T> = Extract<T, null | undefined>;

/** @deprecated use Exclude<TValue, null> */
export type NeverNull<T> = Never<T, null>;

/** @deprecated use Exclude<TValue, undefined> */
export type NeverUndefined<T> = Never<T, undefined>;

/** @deprecated use NonNullable<T> */
export type NeverNullOrUndefined<T> = NonNullable<T>;
