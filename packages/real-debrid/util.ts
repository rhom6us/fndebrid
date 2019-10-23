
import parseTorrent from 'parse-torrent';
import { promisify } from 'util';
import { OperationFailedError, InvalidArguementError } from '@fndebrid/core';
import { MagnetLink } from './types';
export function makeUrl(base: URL, path: string, params: Record<string, any> = {}) {
  const url = new URL(path, base);

  url.search = new URLSearchParams(params as any).toString();
  return url.toString();
}
const parseTorrentAsync = promisify(parseTorrent.remote);

export async function getInfoHashAsync(filePath: string) {
    try {
      const result = await parseTorrentAsync(filePath);
      if (!result) {
        throw new OperationFailedError('Could not parse the specified torrent file path.');
      }
      return result.infoHash;
    } catch (e) {
      if (e instanceof Error) {
        if (e.message == 'Invalid torrent identifier') {
          throw new InvalidArguementError('link', e.message);
        }
      }
      throw e;
    }
}
export function getInfoHash(torrent: MagnetLink | Buffer) {
  try {
    return parseTorrent(torrent).infoHash!;
  } catch (e) {
    if (e instanceof Error) {
      if (e.message == 'Invalid torrent identifier') {
        throw new InvalidArguementError('link', e.message);
      }
    }
    throw e;
  }
}