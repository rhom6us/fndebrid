
import { createReducer, ActionType } from 'typesafe-actions'
import * as actions from './actions'
import { State, defaultState, Torrent } from './state';
import { TorrentId } from '../../real-debrid';

declare global {
  interface Array<T> {
    toKeyed<K extends string | number | symbol>(keySelector: (item: T) => K): Record<K, T>;
  }
}
Array.prototype.toKeyed = function toKeyed<T, K extends string | number | symbol>(this: T[], keySelector: (entity: T) => K): Record<K, T> {
  return this.reduce((result, item) => { result[keySelector(item)] = item; return result; }, {} as Record<K, T>);
}


export default createReducer<State, ActionType<typeof actions>>(defaultState)
  .handleAction(actions.updateJob, (state, { payload: { jobId, torrentId } }) => f({
    ...state,
    jobs: f({
      ...state.jobs,
      [jobId]: torrentId
    })
  }))
  .handleAction(actions.cancelJob, (state, { payload: { jobId } }) => {
    const { [jobId]: canceledTorrentId, ...jobs } = state.jobs as Record<string, TorrentId>;
    const { [canceledTorrentId]: canceledTorrent, ...torrents } = state.entities.torrents as Record<string, Torrent>;
    return f({
      ...state,
      entities: f({
        ...state.entities,
        torrents: f(torrents)
      }),
      jobs: f(jobs)
    });
  })
  .handleAction(actions.fetchTorrents.request, (state) => f({ ...state, loading: true }))
  .handleAction(actions.fetchTorrents.success, (state, { payload: torrents }) => f({
    ...state,
    loading: false,
    torrents: f(torrents.map(p => p.id)),
    entities: f({
      ...state.entities,
      torrents: torrents.map(t => f({ ...t, files: (state.entities.files as any)[t.id] })).toKeyed(t => t.id)
    })
  }))
  .handleAction(actions.fetchTorrents.failure, (state, { payload: errors }) => f({ ...state, loading: false, errors }))

  .handleAction(actions.addMagnet.failure, (state, { payload: errors }) => f({ ...state, errors }))

  .handleAction(actions.fetchTorrent.success, (state, { payload: torrent }) => f({
    ...state,
    entities: f({
      ...state.entities,
      torrents: f({
        ...state.entities.torrents,
        [torrent.id]: f(torrent)
      }),
      files: f({
        ...state.entities.files,
        [torrent.id]: f(torrent.files.map(f))
      })
    })
  }))

  ;
// export { reducer as torrentsReducer }

function f<T>(obj: T) {
  return Object.freeze(obj);
}