
import { Torrent, File, TorrentId } from "../../real-debrid";
export { Torrent, File };



export default interface RootState {
  readonly loading: boolean
  readonly torrents: Array<Omit<Torrent, 'files'> & { files?: File[] }>
  readonly selectedTorrent?: TorrentId;
  readonly errors?: Error | string
}
