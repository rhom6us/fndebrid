
import { createReducer, ActionType } from 'typesafe-actions'
import * as actions from './actions'
import { State, defaultState, Torrent } from './state';
import { TorrentId, ExtendedTorrent, MaybeExtendedTorrent } from '../../real-debrid';

declare global {
  interface Array<T> {
    toKeyed<K extends string | number | symbol>(keySelector: (item: T) => K): Record<K, T>;
  }
}
Array.prototype.toKeyed = function toKeyed<T, K extends string | number | symbol>(this: T[], keySelector: (entity: T) => K): Record<K, T> {
  return this.reduce((result, item) => { result[keySelector(item)] = item; return result; }, {} as Record<K, T>);
}

function mergeTorrents(stateTorrent: MaybeExtendedTorrent, fetchedTorrent: Torrent): MaybeExtendedTorrent {
  return {
    ...stateTorrent,
    ...fetchedTorrent,
    status: fetchedTorrent.status == 'magnet_conversion' && stateTorrent.status == 'waiting_files_selection' ? stateTorrent.status : fetchedTorrent.status
  }
}

export default createReducer<State, ActionType<typeof actions>>(defaultState)

  .handleAction([actions.cancelJob, actions.completeJob], (state, { payload: { jobId } }) => {
    const { [jobId]: _, ...jobs } = state.jobs;
    return f({
      ...state,
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
      torrents: f(torrents.map(t => f(mergeTorrents(state.entities.torrents[t.id], t))).toKeyed(t => t.id))
    })
  }))
  .handleAction(actions.fetchTorrents.failure, (state, { payload: errors }) => f({ ...state, loading: false, errors }))

  .handleAction([actions.addMagnet.success, actions.addTorrentFile.success], (state, { payload: [torrentId, jobId] }) => f({
    ...state,
    jobs: f({
      ...state.jobs,
      [jobId]: torrentId
    })
  }))
  .handleAction([actions.addMagnet.failure, actions.addTorrentFile.failure], (state, { payload: errors }) => f({ ...state, errors }))

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
  .handleAction(actions.deleteTorrent.success, (state, { payload: torrentId }) => {
    const { [torrentId]: deletedTorrent, ...torrents } = state.entities.torrents;
    return f({
      ...state,
      torrents: f(state.torrents.filter(p => p != torrentId)),
      entities: f({
        ...state.entities,
        torrents: f(torrents)
      })
    })
  })


  ;
// export { reducer as torrentsReducer }

function f<T>(obj: T) {
  return Object.freeze(obj);
}