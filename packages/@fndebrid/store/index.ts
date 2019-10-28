import {combineReducers, Dispatch as ReduxDispatch, Store as ReduxStore} from 'redux';
import {ActionType} from 'typesafe-actions';
import * as preferences from './preferences';
import * as torrents from './torrents';

import {getDispatcher, Dispatcher} from './dispatcher';
export {getDispatcher, Dispatcher};
export interface State {
  torrents: torrents.State;
  preferences: preferences.State;
}

export type Action = ActionType<typeof import('./actions')>;
export type TypeConstant = Action['type'];
export type Dispatch = ReduxDispatch<Action>;
export type Store = ReduxStore<State, Action>;
export const reducer = combineReducers<State>({
  torrents: torrents.reducer,
  preferences: preferences.reducer,
});
