
import { createAsyncAction, ActionType, createAction } from 'typesafe-actions'
import { Torrent } from './state'




export const fetchTorrents = createAsyncAction(
  '@@torrents/fetch/request',
  '@@torrents/fetch/success',
  '@@torrents/fetch/error',
)<undefined, Array<Omit<Torrent, 'files'>>, Error | string>();

export const addMagnet = createAsyncAction(
  '@@torrents/add-magnet/request',
  '@@torrents/add-magnet/success',
  '@@torrents/add-magnet/error',
)<{ magnetLink: string }, { torrentId: string }, Error | string>();

export const addTorrentFile = createAsyncAction(
  '@@torrents/add-torrent-file/request',
  '@@torrents/add-torrent-file/success',
  '@@torrents/add-torrent-file/error',
)<{ filePath: string }, { id: string }, Error | string>();

type RootAction = ActionType<typeof import('./actions')>;
export default RootAction;