import { File, Torrent, TorrentId } from "../../real-debrid";
import { Opaque } from 'type-fest';

export { Torrent, File };
export type JobId = Opaque<string>;
export interface Entities {
  readonly torrents: Record<TorrentId, Torrent>,
  readonly files: Record<TorrentId, readonly File[]>
}
export default State;
export interface State {
  readonly loading: boolean;
  readonly torrents: readonly TorrentId[]
  readonly entities: Entities;
  readonly selectedTorrent?: TorrentId;
  readonly errors?: Error | string
  readonly jobs: Record<JobId, TorrentId>
}

export const defaultState: State = {
  torrents: [],
  errors: undefined,
  entities: {
    torrents: {},
    files: {}
  },
  loading: false,
  jobs: {}
}