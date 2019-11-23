export type Opaque<Type, Scope extends string | symbol> = Type & { readonly __name__: Scope };
