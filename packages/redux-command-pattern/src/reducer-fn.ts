
import { Func } from "@rhombus-toolkit/func";
import { DeepDictionaryItem, DeepRecord, DeepRecordItem, restify } from "@rhombus-toolkit/type-helpers";

export type ReducerFn<TState = any, TPayload = undefined> = (
  state: TState,
  ...payload: restify<TPayload>
) => TState;
export type ReducerFnAny = ReducerFn<any, any>;

export type InferState<T extends DeepDictionaryItem<ReducerFn<any, any>>> =
  T extends DeepDictionaryItem<ReducerFn<infer TState, any>> ? TState
  : { ERROR: { T: T; }; };


export type InferPayload<TMap extends DeepRecordItem<string, ReducerFnAny>> =
  TMap extends Func<[any, ...infer TPayload], any> ? TPayload :
  TMap extends DeepRecord<string, ReducerFnAny> ? {
    [K in keyof TMap]: InferPayload<TMap[K]>
  }[keyof TMap] :
  never;
