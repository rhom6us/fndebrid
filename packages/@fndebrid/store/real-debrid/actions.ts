import {ExtendedTorrent, FileId, MagnetLink, Torrent, TorrentHash, TorrentId} from '@fndebrid/real-debrid';
import {createAction, createAsyncAction} from 'typesafe-actions';
import {JobId} from './state';

export const completeJob = createAction('torrents/completeJob', action => (jobId: JobId) => action({jobId}));
export const cancelJob = createAction('torrents/cancelJob', action => (jobId: JobId) => action({jobId}));
export const deleteTorrent = createAsyncAction(
  'torrents/deleteTorrent/request',
  'torrents/deleteTorrent/success',
  'torrents/deleteTorrent/error',
)<TorrentId, TorrentId, string>();
export const selectFiles = createAsyncAction(
  'torrents/selectFiles/request',
  'torrents/selectFiles/success',
  'torrents/selectFiles/error',
)<[TorrentId, FileId[]], undefined, Error>();

export const fetchTorrent = createAsyncAction(
  'torrents/fetch/request',
  'torrents/fetch/success',
  'torrents/fetch/error',
)<TorrentId, ExtendedTorrent, string>();

export const fetchTorrents = createAsyncAction(
  'torrents/fetch-all/request',
  'torrents/fetch-all/success',
  'torrents/fetch-all/error',
)<undefined, Torrent[], string>();

export const addMagnet = createAsyncAction(
  'torrents/add-magnet/request',
  'torrents/add-magnet/success',
  'torrents/add-magnet/error',
)<[MagnetLink, JobId], [TorrentId, JobId], string>();

export const addTorrentFile = createAsyncAction(
  'torrents/add-torrent-file/request',
  'torrents/add-torrent-file/success',
  'torrents/add-torrent-file/error',
)<[string, JobId], [TorrentId, JobId], string>();
export const getCaches = createAsyncAction(
  'torrents/get-caches/request',
  'torrents/get-caches/success',
  'torrents/get-caches/error',
)<[TorrentHash, JobId], [FileId[][], JobId], Error>();

export const setInfoHash = createAction('torrents/set-info-hash', action => (jobId: JobId, infoHash: TorrentHash) =>
  action({jobId, infoHash}),
);
