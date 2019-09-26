
import { combineReducers, Dispatch, Reducer, Action, AnyAction } from 'redux'
// import { routerReducer, RouterState } from 'react-router-redux'

import { all, fork } from 'redux-saga/effects';
import { TorrentsAction, TorrentsState, torrentsSaga, torrentsReducer } from './torrents';
import { PreferencesAction, PreferencesState, preferencesSaga, preferencesReducer } from './preferences';


export type RootAction = TorrentsAction | PreferencesAction;

// We `fork()` these tasks so they execute in the background.
export function* rootSaga() {
  yield all([
    fork(torrentsSaga),
    fork(preferencesSaga),
  ])
}

// `connected-react-router` already injects the router state typings for us, so we can ignore them here.
export interface ApplicationState {
  torrents: TorrentsState,
  preferences: PreferencesState
}


export const rootReducer = combineReducers<ApplicationState>({
  torrents: torrentsReducer,
  preferences: preferencesReducer,
});