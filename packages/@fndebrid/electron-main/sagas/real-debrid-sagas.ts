import {Unpack} from '@fndebrid/core';
import {Authorizor, getInfoHash, getInfoHashAsync, RealDebrid, TorrentHash} from '@fndebrid/real-debrid';
import {
  addMagnet,
  addTorrentFile,
  fetchTorrent,
  fetchTorrents,
  selectFiles,
  setInfoHash,
} from '@fndebrid/store/actions';
import {shell} from 'electron';
import Store from 'electron-store';
import {all, call, delay, fork, put, takeEvery, takeLatest} from 'redux-saga/effects';

const storage = new Store();
type Yield<T> = Unpack<T>;

const auth = new Authorizor(async (url: string) => shell.openExternal(url), storage);
const api = new RealDebrid(auth);

const getErrorMsg = (err: any) =>
  err instanceof Error ? err.stack! : typeof err === 'string' ? err : 'An unknown error has occured';

export function* saga() {
  yield all(
    [
      function* fetchTorrents_request() {
        yield takeLatest(fetchTorrents.request, function*() {
          try {
            const torrents: Yield<typeof api.torrents> = yield call([api, api.torrents]);

            yield put(fetchTorrents.success(torrents));
          } catch (err) {
            yield put(fetchTorrents.failure(getErrorMsg(err)));
          }
        });
      },

      function* addMagnet_request() {
        yield takeEvery(addMagnet.request, function*({payload: [magnetLink, jobId]}) {
          try {
            const {id}: Yield<typeof api.addMagnet> = (yield call([api, api.addMagnet], magnetLink)) as any;
            yield put(addMagnet.success([id, jobId]));
          } catch (err) {
            yield put(addMagnet.failure(getErrorMsg(err)));
          }
        });
      },
      function* addTorrentFile_request() {
        yield takeEvery(addTorrentFile.request, function*({payload: [filePath, jobId]}) {
          try {
            const {id}: Yield<typeof api.addMagnet> = yield api.addTorrent(filePath);
            yield put(addTorrentFile.success([id, jobId]));
          } catch (err) {
            yield put(addTorrentFile.failure(getErrorMsg(err)));
          }
        });
      },

      function* addMagnet_addTorrentFile_request() {
        yield takeEvery([addMagnet.request, addTorrentFile.request], function*({payload: [data, jobId]}) {
          const hash: TorrentHash = yield getInfoHashAsync(data);
          yield put(setInfoHash(jobId, hash));
        });
      },

      function* addTorrentMagnet_success() {
        yield takeEvery([addMagnet.success, addTorrentFile.success], function*({payload: [torrentId, jobId]}) {
          yield put(fetchTorrent.request(torrentId));
        });
      },

      function* fetchTorrent_request() {
        yield takeLatest(fetchTorrent.request, function*({payload: torrentId}) {
          try {
            const torrent: Yield<typeof api.torrent> = yield call([api, api.torrent], torrentId);

            yield put(fetchTorrent.success(torrent));
          } catch (err) {
            yield put(fetchTorrent.failure(getErrorMsg(err)));
          }
        });
      },
      function* fetchTorrent_success() {
        yield takeEvery(fetchTorrent.success, function*({payload: {id, status}}) {
          if (status === 'magnet_conversion') {
            yield delay(1500);
            yield put(fetchTorrent.request(id));
          }
        });
      },
      function* selectFiles_request() {
        yield takeEvery(selectFiles.request, function*({payload: [torrentId, fileIds]}) {
          try {
            yield api.selectFiles(torrentId, fileIds);
            yield put(selectFiles.success());
            yield put(fetchTorrent.request(torrentId));
          } catch (error) {
            yield put(selectFiles.failure(error));
          }
        });
      },
    ].map(fork),
  );
}
