import {isString, Opaque, parseUrl} from '@fndebrid/core';
import {File, FileId, MaybeExtendedTorrent, TorrentHash, TorrentId} from '@fndebrid/real-debrid';
import {URL} from 'url';
import {isUndefined} from 'util';
import uuid4 from 'uuid/v4';
import uuid5 from 'uuid/v5';

export type JobId = Opaque<string, 'jobId'>;
export function jobId(url?: URL | string): JobId {
  if (isUndefined(url)) {
    return uuid4() as JobId;
  }
  if (isString(url)) {
    return jobId(parseUrl(url));
  }
  return uuid5(url.href, uuid5.URL) as JobId;
}
export interface Entities {
  readonly torrents: Record<string, MaybeExtendedTorrent>;
  readonly files: Record<string, readonly File[]>;
}
export interface Job {
  torrentHash?: TorrentHash;
  torrentId?: TorrentId;
  caches?: FileId[][];
}
export default State;
export interface State {
  readonly loading: boolean;
  readonly torrents: readonly TorrentId[];
  readonly entities: Entities;
  readonly selectedTorrent?: TorrentId;
  readonly errors?: Error | string;
  readonly jobs: Record<string, Job>;
  readonly hashes: Record<TorrentHash, readonly TorrentId[]>;
}

export const defaultState: State = {
  torrents: [],
  errors: undefined,
  entities: {
    torrents: {},
    files: {},
  },
  loading: false,
  jobs: {},
  hashes: {},
};
