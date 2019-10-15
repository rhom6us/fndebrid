
import { createAsyncAction, ActionType, createAction } from 'typesafe-actions'
import { Torrent } from './state'
import { create } from 'domain';


export const openFileSelect = createAction('#torrents/showFileSelect', action => 
  (torrentId: string) => action({torrentId})
);

export const fetchTorrent = createAsyncAction(
  'torrents/fetch/request',
  'torrents/fetch/success',
  'torrents/fetch/error',
)<{ torrentId: string }, Torrent, string>();

export const fetchTorrents = createAsyncAction(
  'torrents/fetch-all/request',
  'torrents/fetch-all/success',
  'torrents/fetch-all/error',
)<undefined, Array<Omit<Torrent, 'files'>>, string>();

export const addMagnet = createAsyncAction(
  'torrents/add-magnet/request',
  'torrents/add-magnet/success',
  'torrents/add-magnet/error',
)<{ magnetLink: string }, { torrentId: string }, string>();

export const addTorrentFile = createAsyncAction(
  'torrents/add-torrent-file/request',
  'torrents/add-torrent-file/success',
  'torrents/add-torrent-file/error',
)<{ filePath: string }, { torrentId: string }, string>();

