import { Torrent, File, TorrentId } from "../../real-debrid";

export { Torrent, File };


export default State;
export interface State {
  readonly loading: boolean
  readonly torrents: Array<Omit<Torrent, 'files'> & { files?: File[] }>
  readonly selectedTorrent?: TorrentId;
  readonly errors?: Error | string
}

export const defaultState: State = {
  torrents: [],
  errors: undefined,
  loading: false,
}