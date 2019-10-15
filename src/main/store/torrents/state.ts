import { Torrent, File, TorrentId } from "../../real-debrid";

export { Torrent, File };

export interface Entities {
  torrents: Record<string, Omit<Torrent, 'files'>>,
  files: Record<string, File[]>
}
export default State;
export interface State {
  readonly loading: boolean
  readonly torrents: Array<string>
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