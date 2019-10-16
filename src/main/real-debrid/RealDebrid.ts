import { createReadStream, ReadStream, statSync } from 'fs';
import fetch from 'node-fetch';
import { Torrent } from '../store/torrents/state';
import { FileId, Link, LinkInfo, MagnetLink, ExtendedTorrent, TorrentId } from './types';
import { makeUrl } from "./util";
import { Authorizor } from './Authorizor';

type fu = ReturnType<typeof fetch>;

export class RealDebrid {
  constructor(private readonly authorizor: Authorizor, private readonly base = new URL('https://api.real-debrid.com/rest/1.0/')) {
  }

  async _get<T = any>(path: string): Promise<T>;
  async _get<T = any>(path: string, params: Record<string, any>, includeMeta: false): Promise<T>;
  async _get<T = any>(path: string, params: Record<string, any>, includeMeta: true): Promise<[T, Record<string, string[]>]>;
  async _get<T = any>(path: string, params: Record<string, any> = {}, includeMeta: boolean = false): Promise<T | [T, Record<string, string[]>]> {
    let response = await fetch(makeUrl(this.base, path, params), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await this.authorizor.getToken()}`
      }
    });
    if (!includeMeta)
      return await response.json();
    return [await response.json(), response.headers.raw()];
  }
  async _delete<T = void>(path: string, params: Record<string, string> = {}): Promise<T> {
    let response = await fetch(makeUrl(this.base, path, params), {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${await this.authorizor.getToken()}`
      }
    });
    return await response.json();
  }
  async _post<T = void>(path: string, body: Record<string, string> = {}): Promise<T> {
    let response = await fetch(makeUrl(this.base, path), {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${await this.authorizor.getToken()}`
      },
      body: new URLSearchParams(body)
    });
    return await response.json();
  }

  async _put<T = void>(path: string, body: ReadStream, extraHeaders: Record<string, string> = {}): Promise<T> {
    let response = await fetch(makeUrl(this.base, path), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-bittorrent',
        Authorization: `Bearer ${await this.authorizor.getToken()}`,
        ...extraHeaders
      },
      body
    });
    return await response.json();
  }
  async torrents(page = 1): Promise<Torrent[]> {
    const pageSize = 50;

    let [data, headers] = await this._get<Torrent[]>('torrents', { page, limit: pageSize.toString() }, true);
    if (((headers['x-total-count'] && headers['x-total-count'][0]) || 0) > (page * pageSize)) {
      return [...data, ...(await this.torrents(page + 1))];
    }
    return data;
  }
  torrent(id: TorrentId) {
    return this._get<ExtendedTorrent>(`torrents/${id}`);
  }
  delete(id: TorrentId) {
    return this._delete(`torrents/delete/${id}`);
  }
  addMagnet(magnet: MagnetLink) {
    return this._post<{ torrentId: TorrentId }>('torrents/addMagnet', { magnet });
  }
  addTorrent(filePath: string) {

    const stats = statSync(filePath);
    const fileSizeInBytes = stats.size;

    let readStream = createReadStream(filePath);
    //var stringContent = fs.readFileSync('foo.txt', 'utf8');
    //var bufferContent = fs.readFileSync(filePath)
    return this._put<{ id: TorrentId }>('torrents/addTorrent', readStream as any, { "Content-length": fileSizeInBytes.toString() });
  }
  selectFiles(torrentId: TorrentId, files: FileId[] | 'all' = 'all') {
    if (!files.length) {
      return Promise.resolve();
    }
    return this._post(`torrents/selectFiles/${torrentId}`, { files: (files instanceof Array) ? files.join(',') : files })
  }
  unrestrictLink(link: Link) {
    return this._post<LinkInfo & { crc: number }>('unrestrict/link', { link });
  }
  downloads() {
    //TODO: pagination params
    //TODO: X-Total-Count response header
    return this._get<Array<LinkInfo & { generated: Date }>>('downloads');
  }
}