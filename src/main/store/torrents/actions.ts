
import { createAsyncAction, ActionType, createAction } from 'typesafe-actions'
import {  Torrent} from './types'




export const fetchTorrents = createAsyncAction(
    '@@torrents/fetch/request',
    '@@torrents/fetch/success',
    '@@torrents/fetch/error',
)<undefined, Array<Omit<Torrent, 'files'>>, Error | string>();

export const addMagnet = createAsyncAction(
    '@@torrents/addMagnet/request',
    '@@torrents/addMagnet/success',
    '@@torrents/addMagnet/error',
)<{magnetLink:string}, {torrentId: string}, Error | string>();

export const addTorrentFile = createAsyncAction(
    '@@torrents/addTorrentFile/request',
    '@@torrents/addTorrentFile/success',
    '@@torrents/addTorrentFile/error',
)<{filePath: string}, {id: string}, Error | string>();

type RootAction = ActionType<typeof import('./actions')>;
export default RootAction;