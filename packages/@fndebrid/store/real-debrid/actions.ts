import {ExtendedTorrent, FileId, MagnetLink, Torrent, TorrentHash, TorrentId} from '@fndebrid/real-debrid';
import {createAction, createAsyncAction} from 'typesafe-actions';
import {JobId} from './state';

export const completeJob = createAction('real-debrid/completeJob')<JobId>();
export const cancelJob = createAction('real-debrid/cancelJob')<JobId>();
type Payload<T> = [T, undefined];
export const deleteTorrent = createAsyncAction('real-debrid/deleteTorrent/request', 'real-debrid/deleteTorrent/success', 'real-debrid/deleteTorrent/error')<
  TorrentId,
  TorrentId,
  Error
>();
export const selectFiles = createAsyncAction('real-debrid/selectFiles/request', 'real-debrid/selectFiles/success', 'real-debrid/selectFiles/error')<
  Payload<[TorrentId, FileId[]]>,
  undefined,
  Error
>();

export const fetchTorrent = createAsyncAction('real-debrid/fetch/request', 'real-debrid/fetch/success', 'real-debrid/fetch/error')<TorrentId, ExtendedTorrent, Error>();

export const fetchTorrents = createAsyncAction('real-debrid/fetch-all/request', 'real-debrid/fetch-all/success', 'real-debrid/fetch-all/error')<
  {activeOnly: boolean},
  Torrent[],
  Error
>();

export const addMagnet = createAsyncAction('real-debrid/add-magnet/request', 'real-debrid/add-magnet/success', 'real-debrid/add-magnet/error')<
  Payload<[MagnetLink, JobId]>,
  Payload<[TorrentId, JobId]>,
  Error
>();

export const addTorrentFile = createAsyncAction('real-debrid/add-torrent-file/request', 'real-debrid/add-torrent-file/success', 'real-debrid/add-torrent-file/error')<
  Payload<[string, JobId]>,
  Payload<[TorrentId, JobId]>,
  Error
>();
export const getCaches = createAsyncAction('real-debrid/get-caches/request', 'real-debrid/get-caches/success', 'real-debrid/get-caches/error')<
  Payload<[TorrentHash, JobId]>,
  Payload<[FileId[][], JobId]>,
  Error
>();

export const pollTorrents = createAsyncAction(
  'real-debrid/pollTorrents/request',
  'real-debrid/pollTorrents/success [NEVER]',
  'real-debrid/pollTorrents/error [NEVER]',
  'real-debrid/pollTorrents/cancel',
)<{interval: number}, never, Error, undefined>();
export const setInfoHash = createAction('real-debrid/set-info-hash', (jobId: JobId, infoHash: TorrentHash) => ({jobId, infoHash}))();
