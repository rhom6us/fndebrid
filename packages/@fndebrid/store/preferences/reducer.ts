import {ActionType, createReducer} from 'typesafe-actions';
import * as actions from './actions';
import {defaultState, State} from './state';

export const reducer = createReducer<State, ActionType<typeof actions>>(defaultState)
  .handleAction(actions.setPreferences, (state, {payload}) => ({...state, ...payload}))
  .handleAction(actions.setAutoSelectFilesPattern, (state, {payload: {autoSelectFilesPattern}}) => ({
    ...state,
    autoSelectFiles: 'pattern',
    autoSelectFilesPattern,
  }))
  .handleAction(actions.setAutoSelectFiles, (state, {payload: {autoSelectFiles}}) => {
    let {autoSelectFilesPattern, ...restProps} = {...state, autoSelectFiles};
    return restProps;
  });
