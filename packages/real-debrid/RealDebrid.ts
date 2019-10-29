import {createReadStream, statSync, ReadStream} from 'fs';
import fetch from 'node-fetch';

import {FnError} from '@fndebrid/core';

import {Authorizor} from './Authorizor';
import {ExtendedTorrent, FileId, Link, LinkInfo, MagnetLink, Torrent, TorrentId} from './types';
import {makeUrl} from './util';

export class RealDebridError extends FnError {
  constructor(public readonly url: string, error: {error: string; error_code: number}) {
    super(url, error);
    Object.freeze(error);
  }
}
// tslint:disable-next-line: max-classes-per-file
export class RealDebrid {
  constructor(
    private readonly authorizor: Authorizor,
    private readonly base = new URL('https://api.real-debrid.com/rest/1.0/'),
  ) {}

  public async _get<T = any>(path: string): Promise<T>;
  public async _get<T = any>(path: string, params: Record<string, any>, includeMeta: false): Promise<T>;
  public async _get<T = any>(
    path: string,
    params: Record<string, any>,
    includeMeta: true,
  ): Promise<[T, Record<string, string[]>]>;
  public async _get<T = any>(
    path: string,
    params: Record<string, any> = {},
    includeMeta: boolean = false,
  ): Promise<T | [T, Record<string, string[]>]> {
    const response = await fetch(makeUrl(this.base, path, params), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await this.authorizor.getToken()}`,
      },
    });
    const json = await response.json();
    if (json.error) {
      throw new RealDebridError(path, json);
    }
    if (!includeMeta) {
      return json;
    }
    return [json, response.headers.raw()];
  }
  public async _delete<T = void>(path: string, params: Record<string, string> = {}): Promise<T> {
    const response = await fetch(makeUrl(this.base, path, params), {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${await this.authorizor.getToken()}`,
      },
    });
    const json = await response.json();
    if (json.error) {
      throw new RealDebridError(path, json);
    }
    return json;
  }
  public async _post<T = void>(path: string, body: Record<string, string> = {}): Promise<T | undefined> {
    const response = await fetch(makeUrl(this.base, path), {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${await this.authorizor.getToken()}`,
      },
      body: new URLSearchParams(body),
    });
    if (response.status == 204) {
      return;
    }
    const json = await response.json();
    if (json.error) {
      throw new RealDebridError(path, json);
    }
    return json;
  }

  public async _put<T = void>(path: string, body: ReadStream, extraHeaders: Record<string, string> = {}): Promise<T> {
    const response = await fetch(makeUrl(this.base, path), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-bittorrent',
        Authorization: `Bearer ${await this.authorizor.getToken()}`,
        ...extraHeaders,
      },
      body,
    });

    const json = await response.json();
    if (json.error) {
      throw new RealDebridError(path, json);
    }
    return json;
  }
  public async torrents(activeOnly: boolean = false, page = 1): Promise<Torrent[]> {
    const pageSize = 50;

    const [data, headers] = await this._get<Torrent[]>(
      'torrents',
      {page, limit: pageSize.toString(), ...(() => (activeOnly ? {filter: 'active'} : {}))()},
      true,
    );
    if (((headers['x-total-count'] && headers['x-total-count'][0]) || 0) > page * pageSize) {
      return [...data, ...(await this.torrents(activeOnly, page + 1))];
    }

    return (data as ExtendedTorrent[]).map(torrent => {
      const {files, ...result} = torrent;
      return result;
    }) as Torrent[];
  }
  public torrent(id: TorrentId) {
    return this._get<ExtendedTorrent>(`torrents/info/${id}`);
  }
  public delete(id: TorrentId) {
    return this._delete(`torrents/delete/${id}`);
  }
  public async addMagnet(magnet: MagnetLink) {
    const result = await this._post<{id: TorrentId}>('torrents/addMagnet', {magnet});
    return result!;
  }
  public addTorrent(filePath: string) {
    const stats = statSync(filePath);
    const fileSizeInBytes = stats.size;

    const readStream = createReadStream(filePath);
    // var stringContent = fs.readFileSync('foo.txt', 'utf8');
    // var bufferContent = fs.readFileSync(filePath)
    return this._put<{id: TorrentId}>('torrents/addTorrent', readStream as any, {
      'Content-length': fileSizeInBytes.toString(),
    })!;
  }
  public selectFiles(torrentId: TorrentId, files: FileId[] | 'all' = 'all') {
    if (!files.length) {
      return Promise.resolve();
    }
    return this._post(`torrents/selectFiles/${torrentId}`, {files: files instanceof Array ? files.join(',') : files});
  }
  public unrestrictLink(link: Link) {
    return this._post<LinkInfo & {crc: number}>('unrestrict/link', {link});
  }
  public downloads() {
    // TODO: pagination params
    // TODO: X-Total-Count response header
    return this._get<Array<LinkInfo & {generated: Date}>>('downloads');
  }
}
