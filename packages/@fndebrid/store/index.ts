import { Dispatch, Store } from 'redux';
import { createCommandHandler as _createCommandHandler, createReducer, getCommandCreator as _getCommandCreator, getEventCreator, StandardAction } from 'redux-command-pattern';
import * as preferences from './preferences';
import * as realDebrid from './real-debrid';

// export const actions = {
//   realDebrid: realDebrid.actions,
//   preferences: preferences.actions,
// };
export interface FnState {
  readonly realDebrid: realDebrid.State;
  readonly preferences: preferences.State;
}
// tslint:disable-next-line: interface-over-type-literal
export type Commands = {
  realDebrid: realDebrid.Commands,
  preferences: preferences.Commands,
}
export const getCommandCreator = (invoker: Parameters<typeof _getCommandCreator>[0] ) => _getCommandCreator<Commands>(invoker);;

export type FnStore = Store<FnState, StandardAction>;
const reducerFns = {
  realDebrid: realDebrid.reducers,
  preferences: preferences.reducers,
}
export const reducer = createReducer(reducerFns);
export const events = getEventCreator<typeof reducerFns>();
export function createCommandHandler(store: FnStore, implementation: Parameters<typeof _createCommandHandler>[1]) {
  return _createCommandHandler(store, implementation);
}
