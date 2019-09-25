
import { combineReducers, Dispatch, Reducer, Action, AnyAction } from 'redux'
// import { routerReducer, RouterState } from 'react-router-redux'
import { TorrentsState, torrentsReducer, torrentsSaga } from './torrents'

import { all, fork } from 'redux-saga/effects'

// We `fork()` these tasks so they execute in the background.
export function* rootSaga() {
  yield all([
    fork(torrentsSaga),
    // fork(teamsSaga),
    // `fork()` any other store sagas down here...
  ])
}
// The top-level state object.
//
// `connected-react-router` already injects the router state typings for us,
// so we can ignore them here.
export interface ApplicationState {
  torrents: TorrentsState
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const rootReducer = combineReducers<ApplicationState>({
  torrents: torrentsReducer,
})