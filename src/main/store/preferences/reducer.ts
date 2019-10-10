
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
  .handleAction(actions.associateMagnetLinks.success, (state, { payload: { magnetLinksAssociated } }) => ({ ...state, magnetLinksAssociated }))
  .handleAction(actions.associateTorrentFiles.success, (state, { payload: torrentFilesAssociated }) => ({ ...state, torrentFilesAssociated }))
  .handleAction(actions.whiteListFile, (state, {payload:{file}}) => ({...state, fileWhiteList: [...state.fileWhiteList.filter(p => p != file), file]}))
  .handleAction(actions.blackListFile, (state, {payload:{file}}) => ({...state, fileBlackList: [...state.fileBlackList.filter(p => p != file), file]}))
  .handleAction(actions.unWhiteListFile, (state, {payload:{file}}) => ({...state, fileWhiteList: state.fileWhiteList.filter(p => p != file)}))
  .handleAction(actions.unBlackListFile, (state, {payload:{file}}) => ({...state, fileBlackList: state.fileBlackList.filter(p => p != file)}))
  ;