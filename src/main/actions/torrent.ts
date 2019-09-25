import { Action } from "redux";


export interface AddMagnet extends Action<'ADD_MAGNET'> {
    payload: {magnet: string};
}
export interface AddTorrent extends Action<'ADD_TORRENT'> {
    payload: {file_path: string};
}
export type TorrentActions = AddMagnet | AddTorrent

export function addMagnet(magnet:string):TorrentActions{
    return {
        type: 'ADD_MAGNET',
        payload: {magnet}
    };
}