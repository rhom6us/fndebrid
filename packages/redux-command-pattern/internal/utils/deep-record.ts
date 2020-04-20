export type DeepRecord<TKey extends keyof any, TValue> = {
  [P in TKey]: DeepRecordItem<TKey, TValue>;
};
export type DeepRecordItem<TKey extends keyof any, TValue> =
  | TValue
  | DeepRecord<TKey, TValue>;

export type Dictionary<T> = Record<string, T>;
export type DeepDictionary<T> = DeepRecord<string, T>;
export type DeepDictionaryItem<T> = DeepRecordItem<string, T>;
