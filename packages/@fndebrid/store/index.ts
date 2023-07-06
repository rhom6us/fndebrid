import { Dispatch, Store } from 'redux';
import {
  createCommandHandler as _createCommandHandler,
  createReducer,
  getCommandCreator as _getCommandCreator,
  getEventCreator,
  StandardEvent,
} from 'redux-command-pattern';
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
  realDebrid: realDebrid.Commands;
  preferences: preferences.Commands;
};

export const getCommandCreator = (...args: Parameters<typeof _getCommandCreator>) =>
  _getCommandCreator<Commands>(...args);

export type FnStore = Store<FnState, StandardEvent>;
const reducerFns = {
  realDebrid: realDebrid.reducers,
  preferences: preferences.reducers,
};
export const reducer = createReducer(reducerFns);

/**
 * Events are returned by command implementation and then dispatched to the store(i.e. store.reducers(events) => state)
 */
export const events = getEventCreator<typeof reducerFns>();

/**
 * @param store
 * @param implementation CommandFn map that returns events
 * @returns standard-command => store.reducers(implementation(standard-command))
 */
export function createCommandHandler(
  store: FnStore,
  implementation: Parameters<typeof _createCommandHandler>[1],
) {
  return _createCommandHandler(store, implementation);
}
