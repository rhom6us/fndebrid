
import { Dictionary, toPairs } from 'lodash';
import { Reducer as ReduxReducer } from 'redux';
import { StandardAction } from './';
import { isFunction, restify, Restify, tuple } from './utils';
import { DeepDictionary, DeepDictionaryItem } from './utils/deep-record';

export type ReducerFn<TState = any, TPayload = undefined> = (
  state: TState,
  ...payload: Restify<TPayload>
) => TState;

export type InferState<TReducerFnOrMap extends DeepDictionaryItem<ReducerFn<any,any>>> = TReducerFnOrMap extends DeepDictionaryItem<ReducerFn<infer TState, any>>
  ? TState
  : never;
export type InferPayload<TReducerFn extends ReducerFn> = TReducerFn extends ReducerFn<any, infer TPayload> ? TPayload : never;
function join(...args: string[]): string {
  return args.filter(Boolean).join(".");
}


export function createReducer<T extends DeepDictionaryItem<ReducerFn<any,any>>>(reducers: T): ReduxReducer<InferState<T>, StandardAction> {
  type State = InferState<T>;
  const finalMap: Record<string, ReducerFn<State, any>> = {};
  const stack = toPairs(reducers);
  while (stack.length) {
    const [prefix, mapOrFun] = stack.pop()!;
    if (isFunction(mapOrFun)) {
      finalMap[prefix] = mapOrFun;
      continue;
    }

    toPairs(mapOrFun as Dictionary<DeepDictionary<T>>).map(([key, p]) => tuple(join(prefix, key), p)).forEach(p => stack.push(p))
  }

  return function rootReducerfn(state: State | undefined, { type, payload }: StandardAction): State {
    if (state === undefined) {
      throw new TypeError('redux-command-pattern does not support undefined state. Please preload with an initial state');
    }
    if (!(type in finalMap)) {
      console.warn(`reducer not found for action: ${type}`);
      return state;
    }
    return finalMap[type](state, ...restify(payload));
  };
}
