
import { createAsyncAction, AsyncActionCreator } from 'typesafe-actions'
import { TorrentsActionTypes, Torrent } from './types'

// // Here we use the `action` helper function provided by `typesafe-actions`.
// // This library provides really useful helpers for writing Redux actions in a type-safe manner.
// // For more info: https://github.com/piotrwitek/typesafe-actions
// export const fetchRequest = () => action(TorrentsActionTypes.FETCH_REQUEST)

// // Remember, you can also pass parameters into an action creator. Make sure to
// // type them properly as well.
// export const fetchSuccess = (data: Torrent[]) => action(TorrentsActionTypes.FETCH_SUCCESS, data)
// export const fetchError = (message: string) => action(TorrentsActionTypes.FETCH_ERROR, message)


export const fetchTorrents = createAsyncAction(
    TorrentsActionTypes.FETCH_REQUEST,
    TorrentsActionTypes.FETCH_SUCCESS,
    TorrentsActionTypes.FETCH_ERROR,
)<undefined, Torrent[], string>();

