import { File, Torrent, TorrentId, MaybeExtendedTorrent } from "../../real-debrid";
import { isString, parseUrl } from 'common/utils';
import { InvalidArguementError, Uuid, Opaque } from '~common';
import uuid5 from 'uuid/v5';
import uuid4 from 'uuid/v4';
import { isUndefined } from 'util';
import MagnetUri from 'magnet-uri';
export { Torrent, File };
export type JobId = Opaque<string, 'jobId'>;
export type InfoHash = string;
export function jobId(url?: URL | string): JobId {
  if (isUndefined(url)) {
    return uuid4() as JobId;
  }
  if (isString(url)) {
    return jobId(parseUrl(url))
  }
  return uuid5(url.href, uuid5.URL) as JobId;
}
export interface Entities {
  readonly torrents: Record<string, MaybeExtendedTorrent>,
  readonly files: Record<string, readonly File[]>,
}

export default State;
export interface State {
  readonly loading: boolean;
  readonly torrents: readonly TorrentId[]
  readonly entities: Entities;
  readonly selectedTorrent?: TorrentId;
  readonly errors?: Error | string
  readonly jobs: Record<string, TorrentId>,
  readonly hashes: Record<InfoHash,  readonly TorrentId[]>
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
  hashes:{}
}