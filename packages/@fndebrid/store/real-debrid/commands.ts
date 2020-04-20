import { FileId, MagnetLink, TorrentHash, TorrentId } from '@fndebrid/real-debrid';
import { CommandFn } from 'redux-command-pattern';
import { FnState } from '../';
import { JobId } from './';

type FnCommand<T = undefined> = CommandFn<FnState, T>;
export type Commands = {
  startPollingTorrents: FnCommand<number>
  stopPollingTorrents: FnCommand
  fetchAllTorrents: FnCommand
  fetchActiveTorrents: FnCommand
  addMagnet: FnCommand<[MagnetLink, JobId]>
  addTorrentFile: FnCommand<[string, JobId]>
  fetchCaches: FnCommand<[TorrentHash, JobId]>
  fetchTorrent: FnCommand<TorrentId>
  selectFiles: FnCommand<[TorrentId, FileId[] | 'all']>
  deleteTorrent: FnCommand<TorrentId>,
  cancelJob: FnCommand<JobId>,
  completeJob: FnCommand<JobId>,
}
