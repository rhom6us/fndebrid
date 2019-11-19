import { ExtendedTorrent, MaybeExtendedTorrent, Torrent, TorrentId, TorrentStatus } from '@fndebrid/real-debrid';
import { groupBy, union } from 'lodash';
import { ActionType, createReducer } from 'typesafe-actions';
import * as actions from './actions';
import { defaultState, State } from './state';

declare global {
  interface Array<T> {
    toKeyed<K extends string | number | symbol>(keySelector: (item: T) => K): Record<K, Readonly<T>>;
    toLookup<K extends string | number | symbol, V>(
      keySelector: (item: T) => K,
      valueSelector: (item: T) => V,
    ): Record<K, readonly V[]>;
  }
}

Array.prototype.toKeyed = function toKeyed<T, K extends string | number | symbol, V = T>(
  this: T[],
  keySelector: (item: T) => K,
): any {
  return this.reduce((result, item) => {
    result[keySelector(item)] = f(item);
    return result;
  }, {} as any);
};
Array.prototype.toLookup = function toLookup<T, K extends string | number | symbol, V>(
  keySelector: (item: T) => K,
  valueSelector: (item: T) => V,
): Record<K, V[]> {
  const map = groupBy(this, keySelector);
  const result: any = {};
  for (const key in map) {
    result[key] = f(map[key].map(valueSelector).map(f));
  }
  return result;
};

function mergeTorrents(stateTorrent: MaybeExtendedTorrent, fetchedTorrent: Torrent): MaybeExtendedTorrent {
  if (!stateTorrent) {
    return fetchedTorrent;
  }
  return {
    ...stateTorrent,
    ...fetchedTorrent,
    status:
      fetchedTorrent.status === 'magnet_conversion' && stateTorrent.status === 'waiting_files_selection'
        ? stateTorrent.status
        : fetchedTorrent.status,
  };
}

export const reducer = createReducer<State, ActionType<typeof actions>>(defaultState)
  .handleAction([actions.cancelJob, actions.completeJob], (state, { payload: jobId }) => {
    const { [jobId]: _, ...jobs } = state.jobs;
    return f({
      ...state,
      jobs: f(jobs),
    });
  })
  .handleAction([actions.fetchAllTorrents.request, actions.fetchActiveTorrents.request], state =>
    f({ ...state, loading: true }),
  )
  .handleAction([actions.fetchAllTorrents.failure, actions.fetchActiveTorrents.failure], (state, { payload: errors }) =>
    f({ ...state, loading: false, errors }),
  )

  .handleAction(actions.fetchAllTorrents.success, (state, { payload: torrents }) => {
    return f({
      ...state,
      loading: false,
      torrents: f(torrents.map(t => t.id)),
      entities: f({
        ...state.entities,
        torrents: f(
          torrents
            .map(torrent => f(mergeTorrents(state.entities.torrents[torrent.id], torrent)))
            .reduce((map, torrent) => f({ ...map, [torrent.id]: torrent }), {}),
        ),
      }),
    });
  })
  .handleAction(actions.fetchActiveTorrents.success, (state, { payload: torrents }) => {
    const newTorrents = torrents.reduce(
      (map, torrent) =>
        f({
          ...map,
          [torrent.id]: f(mergeTorrents(map[torrent.id], torrent)),
        }),
      state.entities.torrents,
    );

    return f({
      ...state,
      loading: false,
      torrents: f(Object.keys(newTorrents).map(TorrentId)),
      entities: f({
        ...state.entities,
        torrents: newTorrents,
      }),
    });
  })
  .handleAction(actions.setInfoHash, (state, { payload: { jobId, infoHash } }) =>
    f({
      ...state,
      jobs: f({
        ...state.jobs,
        [jobId]: f({
          ...state.jobs[jobId],
          infoHash,
        }),
      }),
    }),
  )
  .handleAction(actions.getCaches.success, (state, { payload: [caches, jobId] }) =>
    f({
      ...state,
      jobs: f({
        ...state.jobs,
        [jobId]: f({
          ...state.jobs[jobId],
          caches,
        }),
      }),
    }),
  )
  .handleAction([actions.addMagnet.success, actions.addTorrentFile.success], (state, { payload: [torrentId, jobId] }) =>
    f({
      ...state,
      jobs: f({
        ...state.jobs,
        [jobId]: f({
          ...state.jobs[jobId],
          torrentId,
        }),
      }),
    }),
  )
  .handleAction([actions.addMagnet.failure, actions.addTorrentFile.failure], (state, { payload: errors }) =>
    f({
      ...state,
      errors,
    }),
  )

  .handleAction(actions.fetchTorrent.success, (state, { payload: torrent }) =>
    f({
      ...state,
      entities: f({
        ...state.entities,
        torrents: f({
          ...state.entities.torrents,
          [torrent.id]: f(torrent),
        }),
        files: f({
          ...state.entities.files,
          [torrent.id]: f(torrent.files.map(f)),
        }),
      }),
    }),
  )
  .handleAction(actions.deleteTorrent.success, (state, { payload: torrentId }) => {
    const { [torrentId]: deletedTorrent, ...torrents } = state.entities.torrents;
    const { [torrentId]: deletedFiles, ...files } = state.entities.files;
    return f({
      ...state,
      torrents: f(state.torrents.filter(p => p !== torrentId)),
      entities: f({
        ...state.entities,
        torrents: f(torrents),
        files: f(files),
      }),
    });
  });
// export { reducer as torrentsReducer }

function f<T>(obj: T) {
  return Object.freeze(obj);
}
