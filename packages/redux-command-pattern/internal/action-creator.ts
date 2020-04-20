import { InferPayload, ReducerFn } from './reducer-fn';
import { StandardAction } from './standard-action';
import { DeepDictionary, DeepDictionaryItem, Restify } from './utils';

type ReducerFnAny = ReducerFn<any, any>;
export type ActionCreator<TReducerFn extends ReducerFnAny> = (...payload: Restify<InferPayload<TReducerFn>>) => StandardAction<InferPayload<TReducerFn>>;
export type ActionCreatorMap<TReducerFnMap extends DeepDictionary<ReducerFnAny>> = {
  [K in keyof TReducerFnMap]: ActionCreatorOrMap<TReducerFnMap[K]>;
};


export type ActionCreatorOrMap<TReducerFnOrMap extends DeepDictionaryItem<ReducerFnAny>> =
  TReducerFnOrMap extends ReducerFnAny ? ActionCreator<TReducerFnOrMap> :
  TReducerFnOrMap extends DeepDictionary<ReducerFnAny> ? ActionCreatorMap<TReducerFnOrMap> :
  never;



  // tslint:disable-next-line: no-empty
function defaultFn() {}
export function getEventCreator<T extends DeepDictionaryItem<ReducerFnAny>>(type?: string): ActionCreatorOrMap<T> {
  return new Proxy(defaultFn, {
    get(target, prop, receiver) {
      const ns = [type, prop].filter(Boolean).join('.');
      return getEventCreator<T>(ns);
    },
    apply(target, thisArg, payload) {
      return {
        type,
        payload,
      };
    },
  }) as ActionCreatorOrMap<T>;
}
