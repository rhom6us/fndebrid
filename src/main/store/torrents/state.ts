import { File, Torrent, TorrentId } from "../../real-debrid";

export { Torrent, File };

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
}

export const defaultState: State = {
  torrents: [],
  errors: undefined,
  entities: {
    torrents: {},
    files: {}
  },
  loading: false,
}