import { setTimeoutAsync } from '@fndebrid/core';
import { RealDebrid, Torrent } from '@fndebrid/real-debrid';

export class TorrentPoller {
  private cancel?: () => void;
  public constructor(private readonly api: RealDebrid) {}
  public start(interval: number): AsyncIterable<Torrent[]> {
    this.stop();

    const [cancel, generator] = this.invoke(interval);
    this.cancel = cancel;
    return generator;
  }
  public stop() {
    if (this.cancel) {
      this.cancel();
      this.cancel = undefined;
    }
  }
  private invoke(interval: number): [() => void, AsyncIterable<Torrent[]>] {
    let started = true;
    return [
      () => {
        started = false;
      },
      async function* (this: TorrentPoller) {
        while (started) {
          yield await this.api.torrents(true);
          await setTimeoutAsync(interval);
        }
      }.call(this),
    ];
  }
}
