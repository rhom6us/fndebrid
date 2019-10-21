// @flow

import fs from 'fs';
import { streamWithProgress } from './streamWithProgress';

// Public: Download a file and store it on a file system using streaming with appropriate progress callback.
//
// * `sourceUrl`        Url to download from.
// * `targetFile`       File path to save to.
// * `progressCallback` Callback function that will be given a {ByteProgressCallback} object containing
//                      both bytesDone and percent.
// * `length`           Optional file length in bytes for cases where the server will not supply the
//                      Content-Length header but the value is known in advance. Without either the
//                      percentage on the callback can not be determined.
//
// Returns a {Promise} that will accept when complete.
export default async function downloadFile(sourceUrl: string, targetFile: string, progressCallback?: ByteProgressCallback): Promise<void> {
  const request = new Request(sourceUrl, {
    headers: new Headers({ 'Content-Type': 'application/octet-stream' })
  });

  const response = await fetch(request);
  if (!response.ok) {
    throw Error(`Unable to download, server returned ${response.status} ${response.statusText}`);
  }

  const body = response.body;
  if (body == null) {
    throw Error('No response body');
  }

  const finalLength = parseInt(response.headers.get('Content-Length') || '0', 10);
  const reader = body.getReader();
  const writer = fs.createWriteStream(targetFile);

  await streamWithProgress(finalLength, reader, writer, progressCallback);
  writer.end();
}

// Public: Progress callback function signature indicating the bytesDone and
// optional percentage when length is known.
export interface ByteProgressCallback { (bytesDone: number, percent?: number): void; }