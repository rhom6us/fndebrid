import fs from 'fs';

// Public: Progress callback function signature indicating the bytesDone and
// optional percentage when length is known.
export interface ByteProgressCallback { (bytesDone: number, percent?: number): void; }
// Stream from a {ReadableStreamReader} to a {WriteStream} with progress callback.
//
// * `length`           File length in bytes.
// * `reader`           {ReadableStreamReader} to read from.
// * `targwriteretFile` {WriteStream} to write to.
// * `progressCallback` Callback function that will be given a {ByteProgressCallback} object containing
//                      both bytesDone and percent.
//
// Returns a {Promise} that will accept when complete.
export async function streamWithProgress(length: number, reader: ReadableStreamReader, writer: fs.WriteStream, progressCallback?: ByteProgressCallback): Promise<void> {
  let bytesDone = 0;
  while (true) {
    const result = await reader.read();
    if (result.done) {
      if (progressCallback) {
        progressCallback(length, 100);
      }
      return;
    }
    const chunk = result.value;
    if (chunk == null) {
      throw Error('Empty chunk received during download');
    }
    else {
      writer.write(Buffer.from(chunk));
      if (progressCallback) {
        bytesDone += chunk.byteLength;
        const percent = length === 0 ? undefined : Math.floor(bytesDone / length * 100);
        progressCallback(bytesDone, percent);
      }
    }
  }
}
