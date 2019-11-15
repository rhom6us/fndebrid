import {assertNever, isFunction} from '@fndebrid/core';
import {ActionCreator as TsActionsActionCreator, ActionType, TypeConstant} from 'typesafe-actions';
import {FnAction, FnDispatch, FnStore} from './';
import * as actions from './actions';

type ActionCreator = (...args: any[]) => FnAction;
type huh = TsActionsActionCreator<TypeConstant>;
type wow = ActionType<typeof actions>;
// type DispatchedActionCreator<TActionCreator extends AnyActionCreator> = (...args: Parameters<TActionCreator>) => void;
// type DispatchedMap<TMap extends Record<string, ActionCreatorAny>> = {
//   [K in keyof TMap]: Dispatched<TMap[K]>
// };
// type Dispatched<TActionCreatorOrMap> = TActionCreatorOrMap extends ActionCreatorAny ? DispatchedActionCreator<TActionCreatorOrMap> :
//   TActionCreatorOrMap extends Record<string, any> ? DispatchedMap<TActionCreatorOrMap> :
//   TActionCreatorOrMap extends infer R ? never : never;
// type ActionCreatorMap = ActionCreator | Record<string, ActionCreator | Record<string, ActionCreator | Record<string, ActionCreator | Record<string, ActionCreator | Record<string, ActionCreator | Record<string, ActionCreator | Record<string, ActionCreator | Record<string, ActionCreator>>>>>>>>;
type ActionCreatorOrMap =
  | ActionCreator
  | {
      [key: string]: ActionCreatorOrMap;
    };
function isActionCreator(value: ActionCreatorOrMap): value is ActionCreator {
  return isFunction(value);
}
type Dispatched<TActionCreatorOrMap> = TActionCreatorOrMap extends ActionCreator
  ? (...args: Parameters<TActionCreatorOrMap>) => void
  : TActionCreatorOrMap extends Record<string, ActionCreatorOrMap>
  ? {[K in keyof TActionCreatorOrMap]: Dispatched<TActionCreatorOrMap[K]>}
  : never;

function applyDispatch<TMap extends ActionCreatorOrMap>(dispatch: FnDispatch, map: TMap): Dispatched<TMap> {
  if (isFunction(map)) {
    return ((...args: any[]) => dispatch((map as any)(...args))) as any;
  }
  return Object.keys(map).reduce(
    (result, key) => ({
      ...result,
      [key]: applyDispatch(dispatch, (map as any)[key]),
    }),
    {},
  ) as any;
  // return Object.keys(map).reduce((result, key) => ({
  //   ...result,
  //   [key]: isFunction(map[key])
  // }), {} as Dispatched<TMap>);
  // return Object.keys(map).reduce((result, key) => ({
  //     ...result,
  //     [key]: isFunction( map[key])
  //       ? (...args) => dispatch( map[key](...args))
  //       : applyDispatch(dispatch,  map[key])
  //   }), {} as Dispatched<TMap>);
}

export type FnDispatcher = Dispatched<typeof actions>;

const dispatchers = new Map<FnDispatch, FnDispatcher>();
export function getDispatcher(dispatchOrStore: FnStore | FnDispatch): FnDispatcher {
  const dispatch: FnDispatch = isFunction(dispatchOrStore)
    ? dispatchOrStore
    : 'dispatch' in dispatchOrStore
    ? dispatchOrStore.dispatch
    : assertNever(dispatchOrStore);

  if (!dispatchers.has(dispatch)) {
    dispatchers.set(dispatch, applyDispatch(dispatch, actions));
  }
  return dispatchers.get(dispatch)!;
}
