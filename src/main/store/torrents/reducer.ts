
import { createReducer, ActionType } from 'typesafe-actions'
import * as actions from './actions'
import {State, defaultState, Torrent } from './state';


// declare module 'typesafe-actions' {
//   interface Types {
//     RootAction: RootAction;
//   }
// }
function flatten<T, K extends string>(entities:T[], keySelector: (entity: T) => K): Record<K, T> {
  return entities.reduce((map, entity) => { map[keySelector(entity)] = entity; return map; }, {} as Record<K, T>);
}
export default createReducer<State, ActionType<typeof actions>>(defaultState)
  .handleAction(actions.fetchTorrents.request, (state) => ({ ...state, loading: true }))
  .handleAction(actions.fetchTorrents.success, (state, { payload: torrents }) => ({
    ...state,
    loading: false,
    torrents: torrents.map(p => p.id),
    entities: {
      ...state.entities,
      torrents: flatten(torrents.map(t => ({...t, files: state.entities.files[t.id] })), t => t.id)
    }
  }))
  .handleAction(actions.fetchTorrents.failure, (state, { payload: errors }) => ({ ...state, loading: false, errors }))

  .handleAction(actions.addMagnet.failure, (state, { payload: errors }) => ({ ...state, errors }))

  .handleAction(actions.fetchTorrent.success, (state, { payload: torrent }) => ({
    ...state,
    entities: {
      ...state.entities,
      torrents: {
        ...state.entities.torrents,
        [torrent.id]: torrent
      },
      files: {
        ...state.entities.files,
        [torrent.id]: torrent.files
      }
    }
  }))

;
// export { reducer as torrentsReducer }