import { combineReducers, Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { preferencesReducer, preferencesSaga } from './preferences';
import { torrentsReducer } from './torrents';
import {State as PreferencesState} from './preferences/state'
import {State as TorrentsState} from './torrents/state'

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