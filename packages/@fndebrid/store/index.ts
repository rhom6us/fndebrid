import { combineReducers, Dispatch, Store } from 'redux';
import { ActionType } from 'typesafe-actions';
import { ActionCreatorOrMap, Dispatched, getDispatcher as getDispatcherInternal } from './dispatcher';
import * as preferences from './preferences';
import * as realDebrid from './real-debrid';

export const actions = {
  realDebrid: realDebrid.actions,
  preferences: preferences.actions,
};
export interface FnState {
  realDebrid: realDebrid.State;
  preferences: preferences.State;
}
export type FnAction = ActionType<typeof actions>;
export type FnDispatcher = Dispatched<typeof actions>;
export function getDispatcher(dispatchOrStore: FnDispatch | FnStore): FnDispatcher {
  return getDispatcherInternal(actions, dispatchOrStore);
}
export type TypeConstant = FnAction['type'];
export type FnDispatch = Dispatch<FnAction>;
export type FnStore = Store<FnState, FnAction>;
export const reducer = combineReducers<FnState>({
  realDebrid: realDebrid.reducer,
  preferences: preferences.reducer,
});
