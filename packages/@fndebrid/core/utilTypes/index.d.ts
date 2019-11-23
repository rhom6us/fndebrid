export * from './Ctor';

export * from './PartialDeep';
export * from './primitive';

export type InstanceType<T extends Ctor> = T extends Ctor<infer TInstance> ? TInstance : never;

export type OmitByValue<T, ValueType> = Omit<T, KeysByValue<T, ValueType>>;

export type PickByValue<T, ValueType> = Pick<T, KeysByValue<T, ValueType>>;

export type PickByValueExact<T, ValueType> = Pick<T, KeysByValueExact<T, ValueType>>;
export type OmitByValueExact<T, ValueType> = Omit<T, KeysByValueExact<T, ValueType>>;
