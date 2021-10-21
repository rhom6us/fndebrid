import { FileId, MagnetLink, TorrentHash, TorrentId } from '@fndebrid/real-debrid';
import { CommandFn, StandardEventAny } from 'redux-command-pattern';
import type { FnState } from '../index';
import type { JobId } from './state';

type FnCommand<T = undefined> = CommandFn<FnState, T, StandardEventAny>;
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
