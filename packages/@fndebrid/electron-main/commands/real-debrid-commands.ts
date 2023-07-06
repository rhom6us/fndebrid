import { setTimeoutAsync, Unpack } from '@fndebrid/core';
import { Authorizor, getInfoHashAsync, RealDebrid } from '@fndebrid/real-debrid';
import { events, FnState } from '@fndebrid/store';
import { Commands } from '@fndebrid/store/real-debrid';
import { shell } from 'electron';
import Store from 'electron-store';
import { CommandFn } from 'redux-command-pattern';
import { StandardActionAny, StandardEvent } from 'redux-command-pattern/internal';
import { TorrentPoller } from './TorrentPoller';

type FnCommand<T = undefined> = CommandFn<FnState, T>;
const storage = new Store();

const auth = new Authorizor(async (url: string) => shell.openExternal(url), storage);
const api = new RealDebrid(auth);

const getErrorMsg = (err: any) =>
  err instanceof Error
    ? err
    : typeof err === 'string'
    ? new Error(err)
    : Object.assign(new Error('An unknown error has occured. See the data property for potential details'), {
        data: err,
      });
const torrentPoller = new TorrentPoller(api);
async function* map<TSource, TResult>(
  source: AsyncIterable<TSource>,
  selector: (item: TSource) => TResult,
): AsyncIterable<TResult> {
  for await (const item of source) {
    yield selector(item);
  }
}

export const commands: Commands = {
  // startPollingTorrents2:  (state, interval) => map(torrentPoller.start(interval), actions.realDebrid.activeTorrentsFetched),
  async *startPollingTorrents(state, interval) {
    for await (const torrents of torrentPoller.start(interval)) {
      yield events.realDebrid.activeTorrentsFetched(torrents);
    }
  },
  stopPollingTorrents() {
    torrentPoller.stop();
  },
  async fetchAllTorrents() {
    try {
      return events.realDebrid.allTorrentsFetched(await api.torrents(false));
    } catch (err) {
      return events.realDebrid.fetchFailed(getErrorMsg(err));
    }
  },
  async fetchActiveTorrents() {
    try {
      return events.realDebrid.activeTorrentsFetched(await api.torrents(true));
    } catch (err) {
      return events.realDebrid.fetchFailed(getErrorMsg(err));
    }
  },
  async *addMagnet(state, magnetLink, jobId) {
    try {
      const hash = await getInfoHashAsync(magnetLink);
      yield events.realDebrid.infoHashSet(jobId, hash);

      const { id } = await api.addMagnet(magnetLink);
      yield events.realDebrid.magnetAdded(id, jobId);

      yield* this.fetchTorrent(state, id); // as AsyncIterable<StandardAction>;
    } catch (err) {
      yield events.realDebrid.addMagnetFailed(getErrorMsg(err));
    }
  },
  async *addTorrentFile(state, filePath, jobId) {
    try {
      const hash = await getInfoHashAsync(filePath);
      yield events.realDebrid.infoHashSet(jobId, hash);

      const { id } = await api.addTorrent(filePath);
      yield events.realDebrid.torrentFileAdded(id, jobId);

      yield* this.fetchTorrent(state, id); // as AsyncIterable<StandardAction>;
    } catch (err) {
      yield events.realDebrid.addTorrentFileFailed(getErrorMsg(err));
    }
  },
  async fetchCaches(state, hash, jobId) {
    try {
      const caches = await api.instantAvailability(hash);
      return events.realDebrid.cachesFetched(caches, jobId);
    } catch (err) {
      return events.realDebrid.fetchCachesFailed(getErrorMsg(err));
    }
  },
  async *fetchTorrent(state, torrentId) {
    try {
      let torrent = await api.torrent(torrentId);
      yield events.realDebrid.torrentFetched(torrent);
      while (torrent.status === 'magnet_conversion') {
        torrent = await api.torrent(torrentId);
        yield events.realDebrid.torrentFetched(torrent);
        await setTimeoutAsync(1000);
      }
    } catch (err) {
      yield events.realDebrid.fetchFailed(getErrorMsg(err));
    }
  },
  async *selectFiles(state, torrentId, fileIds) {
    try {
      await api.selectFiles(torrentId, fileIds);
      yield* this.fetchTorrent(state, torrentId); // as AsyncIterable<StandardAction>;
    } catch (err) {
      yield events.realDebrid.selectFilesFailed(getErrorMsg(err));
    }
  },
  deleteTorrent(state, torrentId) {
    return api.delete(torrentId);
  },
  cancelJob(state, jobId) {
    return events.realDebrid.jobEnded(jobId);
  },
  completeJob(state, jobId) {
    return events.realDebrid.jobEnded(jobId);
  },
};
