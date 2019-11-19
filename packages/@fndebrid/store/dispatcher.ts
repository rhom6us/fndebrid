import { assertNever, isFunction } from '@fndebrid/core';
import { isNullOrUndefined } from 'util';
import { FnAction, FnDispatch, FnStore } from './';

type ActionCreator = (...args: any[]) => FnAction;
// type DispatchedActionCreator<TActionCreator extends AnyActionCreator> = (...args: Parameters<TActionCreator>) => void;
// type DispatchedMap<TMap extends Record<string, ActionCreatorAny>> = {
//   [K in keyof TMap]: Dispatched<TMap[K]>
// };
// type Dispatched<TActionCreatorOrMap> = TActionCreatorOrMap extends ActionCreatorAny ? DispatchedActionCreator<TActionCreatorOrMap> :
//   TActionCreatorOrMap extends Record<string, any> ? DispatchedMap<TActionCreatorOrMap> :
//   TActionCreatorOrMap extends infer R ? never : never;
// type ActionCreatorMap = ActionCreator | Record<string, ActionCreator | Record<string, ActionCreator | Record<string, ActionCreator | Record<string, ActionCreator | Record<string, ActionCreator | Record<string, ActionCreator | Record<string, ActionCreator | Record<string, ActionCreator>>>>>>>>;
export type ActionCreatorOrMap =
  | ActionCreator
  | Record<
      string,
      | ActionCreator
      | Record<
          string,
          | ActionCreator
          | Record<
              string,
              | ActionCreator
              | Record<
                  string,
                  | ActionCreator
                  | Record<
                      string,
                      | ActionCreator
                      | Record<
                          string,
                          | ActionCreator
                          | Record<string, ActionCreator | Record<string, ActionCreator | Record<string, ActionCreator>>>
                        >
                    >
                >
            >
        >
    >;

type Dispatcher<TActionCreator extends ActionCreator> = (...args: Parameters<TActionCreator>) => void;
export type Dispatched<TActionCreatorOrMap extends ActionCreatorOrMap> = TActionCreatorOrMap extends ActionCreator
  ? (...args: Parameters<TActionCreatorOrMap>) => void
  : TActionCreatorOrMap extends Record<string, ActionCreatorOrMap>
  ? { [K in keyof TActionCreatorOrMap]: Dispatched<TActionCreatorOrMap[K]> }
  : never;

function applyDispatch<TMap extends ActionCreatorOrMap>(dispatch: FnDispatch, map: TMap): Dispatched<TMap> {
  if (isFunction(map)) {
    const ac = map as ActionCreator;
    return ((...args: Parameters<typeof ac>) => dispatch(ac(...args))) as any;
  }
  const acmap = map as Record<string, ActionCreatorOrMap>;
  return Object.keys(map)
    .filter(key => acmap[key])
    .reduce((result, key) => {
      const current = acmap[key];
      return {
        ...result,
        [key]: applyDispatch(dispatch, current),
      };
    }, {} as any);
}

const dispatchers = new Map<FnDispatch, Dispatched<any>>();
export function getDispatcher<TActions extends ActionCreatorOrMap>(
  actions: TActions,
  dispatchOrStore: FnStore | FnDispatch,
): Dispatched<TActions> {
  const dispatch: FnDispatch = isFunction(dispatchOrStore)
    ? dispatchOrStore
    : 'dispatch' in dispatchOrStore
    ? dispatchOrStore.dispatch
    : assertNever(dispatchOrStore);

  if (!dispatchers.has(dispatch)) {
    dispatchers.set(dispatch, applyDispatch(dispatch, actions));
  }
  return dispatchers.get(dispatch)! as Dispatched<TActions>;
}
