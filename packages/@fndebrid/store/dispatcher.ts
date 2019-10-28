import { ActionCreator as TsActionsActionCreator, TypeConstant } from 'typesafe-actions';
import { Dispatch, Store } from '.';
import * as actions  from './actions';




type ActionCreator = TsActionsActionCreator<TypeConstant>;

// type DispatchedActionCreator<TActionCreator extends AnyActionCreator> = (...args: Parameters<TActionCreator>) => void;
// type DispatchedMap<TMap extends Record<string, ActionCreatorAny>> = {
//   [K in keyof TMap]: Dispatched<TMap[K]>
// };
// type Dispatched<TActionCreatorOrMap> = TActionCreatorOrMap extends ActionCreatorAny ? DispatchedActionCreator<TActionCreatorOrMap> :
//   TActionCreatorOrMap extends Record<string, any> ? DispatchedMap<TActionCreatorOrMap> :
//   TActionCreatorOrMap extends infer R ? never : never;
type Dispatched<TActionCreatorOrMap> =
  TActionCreatorOrMap extends ActionCreator ? (...args: Parameters<TActionCreatorOrMap>) => void :
  TActionCreatorOrMap extends Record<string, any> ? { [K in keyof TActionCreatorOrMap]: Dispatched<TActionCreatorOrMap[K]> } :
  never;

function applyDispatch<TMap extends Record<string, any>>(dispatch: Dispatch, map: TMap): Dispatched<TMap> {
  const result: any = {};
  for (const key in map) {
    const creatorOrMap = map[key]
    if (typeof creatorOrMap == 'function') {
      result[key] = (...args: Parameters<typeof creatorOrMap>) => dispatch(creatorOrMap(...args))
    } else {
      result[key] = applyDispatch(dispatch, creatorOrMap);
    }
  }
  return result;
}

export type Dispatcher = Dispatched<typeof actions>;

const dispatchers = new Map<Dispatch, Dispatcher>();
export function getDispatcher(dispatchOrStore: Store | Dispatch): Dispatcher {
  const dispatch: Dispatch = typeof dispatchOrStore == 'function' ? dispatchOrStore : dispatchOrStore.dispatch;

  if (!dispatchers.has(dispatch)) {
    dispatchers.set(dispatch, applyDispatch(dispatch, actions));
  }
  return dispatchers.get(dispatch)!;
}

