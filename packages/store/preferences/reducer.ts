
import { createReducer, ActionType } from 'typesafe-actions'
import { State, defaultState } from './state';
import * as actions from './actions';



export default createReducer<State, ActionType<typeof actions>>(defaultState)
  .handleAction(actions.setPreferences, (state, { payload }) => ({ ...state, ...payload }))
  .handleAction(actions.setAutoSelectFilesPattern, (state, { payload: { autoSelectFilesPattern } }) => ({ ...state, autoSelectFiles: 'pattern', autoSelectFilesPattern }))
  .handleAction(actions.setAutoSelectFiles, (state, { payload: { autoSelectFiles } }) => {
    let { autoSelectFilesPattern, ...restProps } = ({ ...state, autoSelectFiles });
    return restProps;
  })
    ;