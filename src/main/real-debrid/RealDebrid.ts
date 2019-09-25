import * as fs from 'fs';
import { makeUrl } from "./util";
export type TorrentId = string;
export interface Torrent {
    id: TorrentId;
    filename: string;
    hash: string;
    bytes: number;
    host: string;
    split: number;
    progress: number;
    status: Status;
    added: Date;
    files: File[];
    links: string[];
    ended?: Date;
    speed?: number;
    seeders?: number;
}

export interface File {
    id:       number;
    path:     string;
    bytes:    number;
    selected: number;
}


export enum Status {
    magnet_error = "magnet_error",
    magnet_conversion = "magnet_conversion",
    waiting_files_selection = "waiting_files_selection",
    queued = "queued",
    downloading = "downloading",
    downloaded = "downloaded",
    error = "error",
    virus = "virus",
    compressing = "compressing",
    uploading = "uploading",
    dead = "dead",
}
export interface LinkInfo {
    id:         string;
    filename:   string;
    mimeType:   string;
    filesize:   number;
    link:       string;
    host:       string;
    host_icon:  string;
    chunks:     number;

    download:   string;
    streamable: number;
}

export default class RealDebrid {
    constructor(private access_token: string, private base = new URL('https://api.real-debrid.com/rest/1.0/')) {
    }

    async _get<T = any>(path: string, params: Record<string, string> = {}): Promise<T> {
        let response = await fetch(makeUrl(this.base, path, params), {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.access_token}`
            }
        });
        return await response.json();
    }
    async _delete<T = void>(path: string, params: Record<string, string> = {}): Promise<T> {
        let response = await fetch(makeUrl(this.base, path, params), {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.access_token}`
            }
        });
        return await response.json();
    }
    async _post<T=void>(path: string, body: Record<string, string> = {}): Promise<T> {
        let response = await fetch(makeUrl(this.base, path), {
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded',
                Authorization: `Bearer ${this.access_token}`
            },
            body: new URLSearchParams(body)
        });
        return await response.json();
    }
    async _put<T=void>(path: string, body: ReadableStream, extraHeaders: Record<string,string> = {}): Promise<T> {
        let response = await fetch(makeUrl(this.base, path), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-bittorrent',
                Authorization: `Bearer ${this.access_token}`,
                ...extraHeaders
            },
            body
        });
        return await response.json();
    }
    torrents() {
        return this._get<Omit<Torrent, 'files'>[]>('torrents');
    }
    torrent(id: TorrentId){
        return this._get<Torrent>(`torrents/${id}`);
    }
    delete(id: TorrentId){
        return this._delete(`torrents/delete/${id}`);
    }
    addMagnet(magnet: string){
        return this._post<{torrentId:string}>('torrents/addMagnet', {magnet});
    }
    addTorrent(filePath: string){
        
        const stats = fs.statSync(filePath);
        const fileSizeInBytes = stats.size;
        
        let readStream = fs.createReadStream(filePath);
        //var stringContent = fs.readFileSync('foo.txt', 'utf8');
        //var bufferContent = fs.readFileSync(filePath)
        return this._put<{id:string}>('torrents/addTorrent', readStream as any, {"Content-length": fileSizeInBytes.toString()});
    }
    selectFiles(id: TorrentId, files: number[] | 'all' = 'all'){
        return this._post(`torrents/selectFiles/${id}`, {files: (files instanceof Array) ? files.join(',') : files})
    }
    unrestrictLink(link: string){
        return this._post<LinkInfo & {crc:number}>('unrestrict/link', {link});
    }
    downloads(){
        //TODO: pagination params
        //TODO: X-Total-Count response header
        return this._get<Array<LinkInfo & {generated:Date}>>('downloads');
    }
}