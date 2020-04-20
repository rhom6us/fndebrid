import { InvalidArgumentError, OperationFailedError } from '@fndebrid/core';
import { PathLike } from 'fs';
import parseTorrent from 'parse-torrent';
import { URL, URLSearchParams } from 'url';
import { promisify } from 'util';
import { MagnetLink, Torrent, TorrentHash } from './types';

export function makeUrl(base: URL, path: string, params: Record<string, any> = {}) {
  const url = new URL(path, base);

  url.search = new URLSearchParams(params as any).toString();
  return url.toString();
}
const parseTorrentAsync = promisify(parseTorrent.remote);

export async function getInfoHashAsync(torrent: MagnetLink | PathLike) {
  try {
    const result = await parseTorrentAsync(torrent);
    if (!result) {
      throw new OperationFailedError('Could not parse the specified torrent file path.');
    }
    return result.infoHash as TorrentHash;
  } catch (e) {
    if (e instanceof Error) {
      if (e.message === 'Invalid torrent identifier') {
        throw new InvalidArgumentError('link', e.message);
      }
    }
    throw e;
  }
}
export function getInfoHash(torrent: MagnetLink | Buffer) {
  try {
    return parseTorrent(torrent).infoHash! as TorrentHash;
  } catch (e) {
    if (e instanceof Error) {
      if (e.message === 'Invalid torrent identifier') {
        throw new InvalidArgumentError('link', e.message);
      }
    }
    throw e;
  }
}
