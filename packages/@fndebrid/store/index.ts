import {combineReducers, Dispatch as ReduxDispatch, Store as ReduxStore} from 'redux';
import {ActionType} from 'typesafe-actions';
import {Dispatcher, getDispatcher} from './dispatcher';
import * as preferences from './preferences';
import * as realDebrid from './real-debrid';

export {getDispatcher, Dispatcher};
export interface State {
  realDebrid: realDebrid.State;
  preferences: preferences.State;
}

export type Action = ActionType<typeof import('./actions')>;
export type TypeConstant = Action['type'];
export type Dispatch = ReduxDispatch<Action>;
export type Store = ReduxStore<State, Action>;
export const reducer = combineReducers<State>({
  realDebrid: realDebrid.reducer,
  preferences: preferences.reducer,
});
