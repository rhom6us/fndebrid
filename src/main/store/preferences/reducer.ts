
import { createReducer } from 'typesafe-actions'
import RootAction, { setDownloadLocation, setPreferences } from './actions'
import  RootState, { AutoDeleteCondition, AutoSelectFileCondition } from './types';

const initialState: RootState = {
    downloadLocation: '',
    associateTorrentFiles: false,
    associateMagnetLinks: false,
    autoDownloadTorrents: true,
    autoDeleteServer: true,
    autoDeleteTorrentFile: AutoDeleteCondition.TorrentAdded,
    autoSelectFiles: AutoSelectFileCondition.AllFiles,
    fileWhiteList: [],
    fileBlackList: [],
}
// declare module 'typesafe-actions' {
//   interface Types {
//     RootAction: RootAction;
//   }
// }
export default createReducer<RootState, RootAction>(initialState)
    .handleAction(setDownloadLocation, (state, {payload}) => ({...state, ...payload}))
    .handleAction(setPreferences, (state, {payload}) => ({...state, ...payload}))
    ;