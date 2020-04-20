// import { assertNever, DeepDictionary, DeepDictionaryItem, isFunction } from '@fndebrid/core';
// import { CommandCreator, CommandFn } from 'redux-command-pattern';
// import { isNullOrUndefined } from 'util';
// import { FnAction, FnDispatch, FnState, FnStore } from './';

// type ActionCreator = (...args: any[]) => FnAction;
// // type DispatchedActionCreator<TActionCreator extends AnyActionCreator> = (...args: Parameters<TActionCreator>) => void;
// // type DispatchedMap<TMap extends Record<string, ActionCreatorAny>> = {
// //   [K in keyof TMap]: Dispatched<TMap[K]>
// // };
// // type Dispatched<TActionCreatorOrMap> = TActionCreatorOrMap extends ActionCreatorAny ? DispatchedActionCreator<TActionCreatorOrMap> :
// //   TActionCreatorOrMap extends Record<string, any> ? DispatchedMap<TActionCreatorOrMap> :
// //   TActionCreatorOrMap extends infer R ? never : never;
// // type ActionCreatorMap = ActionCreator | Record<string, ActionCreator | Record<string, ActionCreator | Record<string, ActionCreator | Record<string, ActionCreator | Record<string, ActionCreator | Record<string, ActionCreator | Record<string, ActionCreator | Record<string, ActionCreator>>>>>>>>;
// // export type ActionCreatorOrMap = DeepDictionaryItem<ActionCreator>;

// type FnCommandCreator = CommandCreator<CommandFn<FnState, any>>;
// type Dispatcher<TCommandCreator extends FnCommandCreator> = (...args: Parameters<TCommandCreator>) => void;
// export type Dispatched<TCommandCreatorOrMap extends DeepDictionaryItem<FnCommandCreator>> =
//   TCommandCreatorOrMap extends FnCommandCreator ? (...args: Parameters<TCommandCreatorOrMap>) => void :
//   TCommandCreatorOrMap extends DeepDictionary<FnCommandCreator> ? { [K in keyof TCommandCreatorOrMap]: Dispatched<TCommandCreatorOrMap[K]> }:
//   never;

// function applyDispatch<TMap extends DeepDictionaryItem<FnCommandCreator>>(dispatch: FnDispatch, map: TMap): Dispatched<TMap> {
//   if (isFunction(map)) {
//     const ac = map as FnCommandCreator;
//     return ((...args: Parameters<typeof ac>) => dispatch(ac(...args))) as any;
//   }
//   const acmap = map as DeepDictionary<FnCommandCreator>;
//   return Object.keys(map)
//     .filter(key => acmap[key])
//     .reduce((result, key) => {
//       const current = acmap[key];
//       return {
//         ...result,
//         [key]: applyDispatch(dispatch, current),
//       };
//     }, {} as any);
// }

// const dispatchers = new Map<FnDispatch, Dispatched<any>>();
// export function getDispatcher<TActions extends ActionCreatorOrMap>(
//   actions: TActions,
//   dispatchOrStore: FnStore | FnDispatch,
// ): Dispatched<TActions> {
//   const dispatch: FnDispatch = isFunction(dispatchOrStore)
//     ? dispatchOrStore
//     : 'dispatch' in dispatchOrStore
//     ? dispatchOrStore.dispatch
//     : assertNever(dispatchOrStore);

//   if (!dispatchers.has(dispatch)) {
//     dispatchers.set(dispatch, applyDispatch(dispatch, actions));
//   }
//   return dispatchers.get(dispatch)! as Dispatched<TActions>;
// }
