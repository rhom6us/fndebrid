
import { createReducer } from 'typesafe-actions'
import RootAction, { fetchTorrents } from './actions'
import  RootState from './types';

const initialState: RootState = {
  torrents: [],
  errors: undefined,
  loading: false,
  
}
// declare module 'typesafe-actions' {
//   interface Types {
//     RootAction: RootAction;
//   }
// }
export default createReducer<RootState, RootAction>(initialState)
  .handleAction(fetchTorrents.request, (state,{}) => ({...state, loading: true}))
  .handleAction(fetchTorrents.success, (state,{payload:data}) => ({...state, loading: false, data}))
  .handleAction(fetchTorrents.failure, (state,{payload:errors}) => ({...state, loading: false, errors}))
  
// export { reducer as torrentsReducer }