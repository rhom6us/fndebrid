import { promisify } from 'util';
import { shell } from 'electron';
import { all, call, delay, fork, put, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { Unpack } from '../../../common';
import { Authorizor, RealDebrid } from '../../real-debrid';
import { showFileSelect } from '../../windows';
import { addMagnet, addTorrentFile, fetchTorrent, fetchTorrents, openFileSelect } from './actions';

type Yield<T> = Unpack<T>;

const auth = new Authorizor(async (url: string) => shell.openExternal(url));
const api = new RealDebrid(auth);

const getErrorMsg = (err: any) => err instanceof Error ? err.stack! : typeof err === 'string' ? err : 'An unknown error has occured';;
function* fetchTorrents_request() {
  yield takeLatest(fetchTorrents.request, function* () {
    try {

      const torrents: Yield<typeof api.torrents> = yield call([api, api.torrents]);

      yield put(fetchTorrents.success(torrents));

    } catch (err) {
      yield put(fetchTorrents.failure(getErrorMsg(err)));
    }
  });
}

function* addMagnet_request() {
  yield takeEvery(addMagnet.request, function* ({ payload: magnetLink }) {
    try {
      const { id }: Yield<typeof api.addMagnet> = (yield call([api, api.addMagnet], magnetLink)) as any;
      yield put(addMagnet.success(id));

    } catch (err) {
      yield put(addMagnet.failure(getErrorMsg(err)));
    }
  });
}
function* addTorrentFile_request() {
  yield takeEvery(addTorrentFile.request, function* ({ payload: { filePath } }) {
    try {
      const { id }: Yield<typeof api.addMagnet> = yield api.addTorrent(filePath)
      yield put(addTorrentFile.success(id));

    } catch (err) {
      yield put(addTorrentFile.failure(getErrorMsg(err)));
    }
  });
}
function* watchTorrentAdded() {
  yield takeEvery([addMagnet.success, addTorrentFile.success], function* ({ payload: torrentId }) {
    while (true) {
      yield put(fetchTorrent.request(torrentId));
      yield promisify(setImmediate);
      const { payload: torrent }: Yield<typeof fetchTorrent.success> = yield take(fetchTorrent.success);
      switch (torrent.status) {
        case 'magnet_conversion':
          yield delay(1500);
          continue;
        case 'waiting_files_selection':
          yield put(openFileSelect(torrentId));
          return;
        case 'compressing':
        case 'dead':
        case 'downloaded':
        case 'downloading':
        case 'error':
        case 'magnet_error':
        case 'queued':
        case 'uploading':
        case 'virus':
        default:
          return;
      }
    }
  });
}
function* watchTorrentRequest() {
  yield takeLatest(fetchTorrent.request, function* ({ payload: torrentId }) {
    try {
      const torrent: Yield<typeof api.torrent> = yield call([api, api.torrent], torrentId);

      yield put(fetchTorrent.success(torrent));

    } catch (err) {
      yield put(fetchTorrent.failure(getErrorMsg(err)));
    }
  });
}
function* watch_openFileSelect() {
  yield takeEvery(openFileSelect, function* ({ payload: torrentId }) {
    const fileIds: Yield<typeof showFileSelect> = yield showFileSelect(torrentId);
    if (fileIds === null) { //send null to defer selection
      return;
    }
    if (fileIds.length) {
      yield api.selectFiles(torrentId, fileIds);
    } else { //send empty array to cancel
      yield api.delete(torrentId);
    }
  })
}

export default function* () {
  yield all([
    fork(fetchTorrents_request),
    fork(addMagnet_request),
    fork(addTorrentFile_request),
    fork(watchTorrentAdded),
    fork(watchTorrentRequest),
    fork(watch_openFileSelect)
  ])
}