import { FileId, TorrentHash, TorrentId } from '@fndebrid/real-debrid';

export interface Job {
  torrentHash?: TorrentHash;
  torrentId?: TorrentId;
  caches?: FileId[][];
}
