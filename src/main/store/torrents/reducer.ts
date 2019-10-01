
import { createReducer, ActionType } from 'typesafe-actions'
import * as actions from './actions'
import {State, defaultState } from './state';


// declare module 'typesafe-actions' {
//   interface Types {
//     RootAction: RootAction;
//   }
// }
export default createReducer<State, ActionType<typeof actions>>(defaultState)
  .handleAction(actions.fetchTorrents.request, (state) => ({ ...state, loading: true }))
  .handleAction(actions.fetchTorrents.success, (state, { payload: data }) => ({ ...state, loading: false, data }))
  .handleAction(actions.fetchTorrents.failure, (state, { payload: errors }) => ({ ...state, loading: false, errors }))
  // .handleAction(actions.fetchTorrents.cancel, () => { throw 'not supported'; })
  //.handleAction(actions.addMagnet.request, (state, { payload }) => ({ ...state }))
  //.handleAction(actions.addMagnet.success, (state, { payload }) => ({ ...state }))
  .handleAction(actions.addMagnet.failure, (state, { payload: errors }) => ({ ...state, errors }))
  // .handleAction(actions.addMagnet.cancel, () => { throw 'not supported'; })
;
// export { reducer as torrentsReducer }