import {ExtendedTorrent, FileId, MagnetLink, Torrent, TorrentHash, TorrentId} from '@fndebrid/real-debrid';
import {createAction, createAsyncAction} from 'typesafe-actions';
import {JobId} from './state';

export const completeJob = createAction('real-debrid/completeJob', action => (jobId: JobId) => action({jobId}));
export const cancelJob = createAction('real-debrid/cancelJob', action => (jobId: JobId) => action({jobId}));
export const deleteTorrent = createAsyncAction(
  'real-debrid/deleteTorrent/request',
  'real-debrid/deleteTorrent/success',
  'real-debrid/deleteTorrent/error',
)<TorrentId, TorrentId, string>();
export const selectFiles = createAsyncAction(
  'real-debrid/selectFiles/request',
  'real-debrid/selectFiles/success',
  'real-debrid/selectFiles/error',
)<[TorrentId, FileId[]], undefined, Error>();

export const fetchTorrent = createAsyncAction(
  'real-debrid/fetch/request',
  'real-debrid/fetch/success',
  'real-debrid/fetch/error',
)<TorrentId, ExtendedTorrent, string>();

export const fetchTorrents = createAsyncAction(
  'real-debrid/fetch-all/request',
  'real-debrid/fetch-all/success',
  'real-debrid/fetch-all/error',
)<undefined, Torrent[], string>();

export const addMagnet = createAsyncAction(
  'real-debrid/add-magnet/request',
  'real-debrid/add-magnet/success',
  'real-debrid/add-magnet/error',
)<[MagnetLink, JobId], [TorrentId, JobId], string>();

export const addTorrentFile = createAsyncAction(
  'real-debrid/add-torrent-file/request',
  'real-debrid/add-torrent-file/success',
  'real-debrid/add-torrent-file/error',
)<[string, JobId], [TorrentId, JobId], string>();
export const getCaches = createAsyncAction(
  'real-debrid/get-caches/request',
  'real-debrid/get-caches/success',
  'real-debrid/get-caches/error',
)<[TorrentHash, JobId], [FileId[][], JobId], Error>();

export const pollTorrents = createAsyncAction(
  'real-debrid/pollTorrents/request',
  'real-debrid/pollTorrents/success',
  'real-debrid/pollTorrents/error',
)<{interval: number}, undefined, Error>();
export const setInfoHash = createAction('real-debrid/set-info-hash', action => (jobId: JobId, infoHash: TorrentHash) =>
  action({jobId, infoHash}),
);
