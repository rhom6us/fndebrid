import { combineReducers, Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { preferencesReducer, preferencesSaga, PreferencesState } from './preferences';
import { torrentsReducer, torrentsSaga, TorrentsState } from './torrents';

export interface State {
  torrents: TorrentsState,
  preferences: PreferencesState
}

export type Action = ActionType<typeof import('./actions')>;
export type TypeConstant = Action['type'];
export type Dispatch = ReduxDispatch<Action>;
export type Store = ReduxStore<State, Action>;
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