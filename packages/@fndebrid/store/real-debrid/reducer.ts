import { ExtendedTorrent, FileId, MaybeExtendedTorrent, Torrent, TorrentHash, TorrentId } from '@fndebrid/real-debrid';
import { fromPairs, groupBy, toPairs } from 'lodash';
import { ReducerFn } from 'redux-command-pattern';
import { URL } from 'url';
import { FnState } from '../';
import { State } from '../preferences';
import { JobId } from './state';

declare global {
  interface Array<T> {
    toKeyed<K extends string | number | symbol>(keySelector: (item: T) => K): Record<K, T>;
    toLookup<K extends string | number | symbol, V>(
      keySelector: (item: T) => K,
      valueSelector: (item: T) => V,
    ): Record<K, readonly V[]>;
  }
}

Array.prototype.toKeyed = function toKeyed<T, K extends string | number | symbol, V = T>(
  this: T[],
  keySelector: (item: T) => K,
): Record<K, T> {
  return fromPairs(this.map(item => [keySelector(item), item])) as any;
};
Array.prototype.toLookup = function toLookup<T, K extends string | number | symbol, V>(
  keySelector: (item: T) => K,
  valueSelector: (item: T) => V,
): Record<K, V[]> {
  return fromPairs(toPairs(groupBy(this, keySelector)).map(([key, value]) => [key, value.map(valueSelector)])) as Record<
    K,
    V[]
  >;
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

export const jobEnded: ReducerFn<FnState, [JobId]> = (state, jobId) => {
  const { [jobId]: _, ...jobs } = state.realDebrid.jobs;
  return {
    ...state,
    realDebrid: {
      ...state.realDebrid,
      jobs,
    },
  };
};

export const allTorrentsFetched: ReducerFn<FnState, [Torrent[]]> = (state, torrents) => ({
  ...state,
  realDebrid: {
    ...state.realDebrid,
    loading: false,
    torrents: torrents.map(t => t.id),
    entities: {
      ...state.realDebrid.entities,
      torrents: torrents
        .map(torrent => mergeTorrents(state.realDebrid.entities.torrents[torrent.id], torrent))
        .toKeyed(p => p.id),
    },
  },
});

export const fetchFailed: ReducerFn<FnState, [Error]> = (state, error) => ({
  ...state,
  realDebrid: {
    ...state.realDebrid,
    errors: error,
  },
});

export const activeTorrentsFetched: ReducerFn<FnState, Torrent[]> = (state, torrents) => {
  const newTorrents = torrents.reduce(
    (map, torrent) => ({
      ...map,
      [torrent.id]: mergeTorrents(map[torrent.id], torrent),
    }),
    state.realDebrid.entities.torrents,
  );
  return {
    ...state,
    realDebrid: {
      ...state.realDebrid,
      loading: false,
      torrents: Object.keys(newTorrents).map(TorrentId),
      entities: {
        ...state.realDebrid.entities,
        torrents: newTorrents,
      },
    },
  };
};

export const infoHashSet: ReducerFn<FnState, [JobId, TorrentHash]> = (state, jobId, infoHash) => ({
  ...state,
  realDebrid: {
    ...state.realDebrid,
    jobs: {
      ...state.realDebrid.jobs,
      [jobId]: {
        ...state.realDebrid.jobs[jobId],
        torrentHash: infoHash,
      },
    },
  },
});

export const cachesFetched: ReducerFn<FnState, [FileId[][], JobId]> = (state, caches, jobId) => ({
  ...state,
  realDebrid: {
    ...state.realDebrid,
    jobs: {
      ...state.realDebrid.jobs,
      [jobId]: {
        ...state.realDebrid.jobs[jobId],
        caches,
      },
    },
  },
});
export const fetchCachesFailed: ReducerFn<FnState, [Error]> = (state, errors) => state;

export const magnetAdded: ReducerFn<FnState, [TorrentId, JobId]> = (state, torrentId, jobId) => ({
  ...state,
  realDebrid: {
    ...state.realDebrid,
    jobs: {
      ...state.realDebrid.jobs,
      [jobId]: {
        ...state.realDebrid.jobs[jobId],
        torrentId,
      },
    },
  },
});
export const addMagnetFailed: ReducerFn<FnState, [Error]> = (state, errors) => ({
  ...state,
  realDebrid: {
    ...state.realDebrid,
    errors,
  },
});
export const torrentFileAdded: ReducerFn<FnState, [TorrentId, JobId]> = (state, torrentId, jobId) => ({
  ...state,
  realDebrid: {
    ...state.realDebrid,
    jobs: {
      ...state.realDebrid.jobs,
      [jobId]: {
        ...state.realDebrid.jobs[jobId],
        torrentId,
      },
    },
  },
});
export const addTorrentFileFailed: ReducerFn<FnState, [Error]> = (state, errors) => ({
  ...state,
  realDebrid: {
    ...state.realDebrid,
    errors,
  },
});
export const torrentFetched: ReducerFn<FnState, [ExtendedTorrent]> = (state, torrent) => ({
  ...state,
  realDebrid: {
    ...state.realDebrid,
    entities: {
      ...state.realDebrid.entities,
      torrents: {
        ...state.realDebrid.entities.torrents,
        [torrent.id]: torrent,
      },
      files: {
        ...state.realDebrid.entities.files,
        [torrent.id]: torrent.files,
      },
    },
  },
});

export const torrentDeleted: ReducerFn<FnState, [TorrentId]> = (state, torrentId) => {
  const { [torrentId]: deletedTorrent, ...torrents } = state.realDebrid.entities.torrents;
  const { [torrentId]: deletedFiles, ...files } = state.realDebrid.entities.files;
  return {
    ...state,
    realDebrid: {
      ...state.realDebrid,
      entities: {
        ...state.realDebrid.entities,
        torrents,
        files,
      },
    },
  };
};
export const selectFilesFailed: ReducerFn<FnState, [Error]> = (state, errors) => state;
