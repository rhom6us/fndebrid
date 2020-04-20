import fs, { createReadStream, ReadStream, statSync, WriteStream } from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import { URL, URLSearchParams } from 'url';
import { Authorizor } from './Authorizor';
import { getApiError } from './RealDebridError';
import { ExtendedTorrent, FileId, HashAvailability, Link, LinkInfo, MagnetLink, Torrent, TorrentHash, TorrentId } from './types';
import { makeUrl } from './util';

// tslint:disable-next-line: max-classes-per-file
export class RealDebrid {
         constructor(
           private readonly authorizor: Authorizor,
           private readonly base = new URL('https://api.real-debrid.com/rest/1.0/'),
         ) {}

         private async _get<T = any>(path: string): Promise<T>;
         private async _get<T = any>(path: string, params: Record<string, any>, includeMeta: false): Promise<T>;
         private async _get<T = any>(
           path: string,
           params: Record<string, any>,
           includeMeta: true,
         ): Promise<[T, Record<string, string[]>]>;
         private async _get<T = any>(
           path: string,
           params: Record<string, any> = {},
           includeMeta: boolean = false,
         ): Promise<T | [T, Record<string, string[]>]> {
           const url = makeUrl(this.base, path, params);
           const response = await fetch(url, {
             method: 'GET',
             headers: {
               Authorization: `Bearer ${await this.authorizor.getToken()}`,
             },
           });
           const json = await response.json();
           if (json.error_code) {
             const ApiError = getApiError(json.error_code);
             throw new ApiError(json.error, url);
           }
           if (!includeMeta) {
             return json;
           }
           return [json, response.headers.raw()];
         }
         private async _delete<T = void>(path: string, params: Record<string, string> = {}): Promise<T> {
           const url = makeUrl(this.base, path, params);
           const response = await fetch(url, {
             method: 'DELETE',
             headers: {
               Authorization: `Bearer ${await this.authorizor.getToken()}`,
             },
           });
           const json = await response.json();
           if (json.error_code) {
             const ApiError = getApiError(json.error_code);
             throw new ApiError(json.error, url);
           }
           return json;
         }
         private async _post<T = void>(path: string, body: Record<string, string> = {}): Promise<T | undefined> {
           const url = makeUrl(this.base, path);
           const response = await fetch(url, {
             method: 'POST',
             headers: {
               // 'Content-Type': 'application/json',
               Authorization: `Bearer ${await this.authorizor.getToken()}`,
             },
             body: new URLSearchParams(body),
           });
           if (response.status === 204) {
             return;
           }
           const json = await response.json();
           if (json.error_code) {
             const ApiError = getApiError(json.error_code);
             throw new ApiError(json.error, url, body);
           }
           return json;
         }

         private async _put<T = void>(path: string, body: ReadStream, extraHeaders: Record<string, string> = {}): Promise<T> {
           const url = makeUrl(this.base, path);
           const response = await fetch(url, {
             method: 'PUT',
             headers: {
               'Content-Type': 'application/x-bittorrent',
               Authorization: `Bearer ${await this.authorizor.getToken()}`,
               ...extraHeaders,
             },
             body,
           });

           const json = await response.json();
           if (json.error_code) {
             const ApiError = getApiError(json.error_code);
             throw new ApiError(json.error, url, '<stream>');
           }
           return json;
         }
         public async torrents(activeOnly: boolean = false, page = 1): Promise<Torrent[]> {
           const pageSize = 50;

           const [data, headers] = await this._get<Torrent[]>(
             'torrents',
             { page, limit: pageSize.toString(), ...(() => (activeOnly ? { filter: 'active' } : {}))() },
             true,
           );
           if (((headers['x-total-count'] && headers['x-total-count'][0]) || 0) > page * pageSize) {
             return [...data, ...(await this.torrents(activeOnly, page + 1))];
           }

           return (data as ExtendedTorrent[]).map(torrent => {
             const { files, ...result } = torrent;
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
           const result = await this._post<{ id: TorrentId }>('torrents/addMagnet', { magnet });
           return result!;
         }
         public addTorrent(filePath: string) {
           const stats = statSync(filePath);
           const fileSizeInBytes = stats.size;

           const readStream = createReadStream(filePath);
           // var stringContent = fs.readFileSync('foo.txt', 'utf8');
           // var bufferContent = fs.readFileSync(filePath)
           return this._put<{ id: TorrentId }>('torrents/addTorrent', readStream, {
             'Content-length': fileSizeInBytes.toString(),
           })!;
         }
         public selectFiles(torrentId: TorrentId, files: FileId[] | 'all' = 'all') {
           if (!files.length) {
             return Promise.resolve();
           }
           return this._post(`torrents/selectFiles/${torrentId}`, { files: files instanceof Array ? files.join(',') : files });
         }
         public unrestrictLink(link: Link) {
           return this._post<LinkInfo & { crc: number }>('unrestrict/link', { link });
         }
         public downloads() {
           // TODO: pagination params
           // TODO: X-Total-Count response header
           return this._get<Array<LinkInfo & { generated: Date }>>('downloads');
         }

         public async instantAvailability(hash: TorrentHash) {
           const result = await this._get<HashAvailability>(`torrents/instantAvailability/${hash}`);
           const hashResult = result[hash];
           if (!hashResult) {
             return [];
           }
           return Object.keys(hashResult)
             .flatMap(key => hashResult[key])
             .map(p => Object.keys(p).map(p => +p) as FileId[]);
         }

         public async downloadFile(linkInfo: LinkInfo, dir: string) {
           const fileName = path.basename(linkInfo.download);
           const destination = path.join(dir, fileName);
           const [writeStream, position] = await getWriteStream(destination);

           const result = await fetch(linkInfo.download, {});
           result.body.pipe(writeStream);
         }
       }

async function getWriteStream(path: string): Promise<[WriteStream, number]> {
  try {
    const handle = await fs.promises.open(path, 'a+');
    const stat = await fs.promises.fstat(handle);
    const stream = fs.createWriteStream(undefined as any, {
      fd: handle.fd,
      start: stat.size,
      flags: 'a',
    });
    return [stream, stat.size];
  } catch (error) {
    return [fs.createWriteStream(path), 0];
  }
}
