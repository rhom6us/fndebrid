import { all, fork } from 'redux-saga/effects';

import { combineReducers } from 'redux';
import { torrentsReducer, TorrentsAction, TorrentsState, torrentsSaga } from './torrents';
import { preferencesReducer, PreferencesAction, PreferencesState, preferencesSaga } from './preferences';

export interface State {
  torrents: TorrentsState,
  preferences: PreferencesState
}

export type RootAction = TorrentsAction | PreferencesAction;

export const rootReducer = combineReducers<State>({
  torrents: torrentsReducer,
  preferences: preferencesReducer,
});


export function* rootSaga () {
  yield all([
    fork(torrentsSaga),
    fork(preferencesSaga),
  ]);
}