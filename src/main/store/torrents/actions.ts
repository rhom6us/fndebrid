
import { createAsyncAction, ActionType, createAction } from 'typesafe-actions'
import { Torrent, JobId } from './state'
import { create } from 'domain';
import { TorrentId, MagnetLink, ExtendedTorrent } from '../../real-debrid';


export const updateJob = createAction('torrents/updateJob', action => 
  (jobId: JobId, torrentId: TorrentId) => action({jobId, torrentId})
);
export const cancelJob = createAction('torrents/updateJob', action => 
  (jobId: JobId) => action({jobId})
);
export const openFileSelect = createAction('#torrents/showFileSelect', action => 
  (torrentId: TorrentId) => action(torrentId)
);

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
)<{ filePath: string, jobId:JobId }, [TorrentId, JobId], string>();

