
import { shell } from 'electron';
import { all, call, fork, put, takeEvery, takeLatest, select, take, delay } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { Memoize, Unpack } from '../../../common';
import { Authorizor, RealDebrid } from '../../real-debrid';
import { addMagnet, fetchTorrents, addTorrentFile, fetchTorrent, openFileSelect } from './actions';
import { State } from '..';
import { showFileSelect } from '../../windows';

type Yield<T> = Unpack<T>;

class TokenContainer {
  @Memoize()
  static async getToken() {
    const result = await Authorizor.getToken((url: string) => shell.openExternal(url));
    return result;
  }
}
const getApi = async () => new RealDebrid(await TokenContainer.getToken());
const getErrorMsg = (err: any) => err instanceof Error ? err.stack! : typeof err === 'string' ? err : 'An unknown error has occured';;
function* watchFetchRequest() {
  yield takeLatest(fetchTorrents.request, function* () {
    try {

      const api: RealDebrid = yield getApi();
      const torrents: Yield<typeof api.torrents> = yield call([api, api.torrents]);

      yield put(fetchTorrents.success(torrents));

    } catch (err) {
        yield put(fetchTorrents.failure(getErrorMsg(err)));
    }
  });
}

function* watchAddMagnet() {
  yield takeEvery(addMagnet.request, function* ({ payload: { magnetLink } }) {
    try {
      const api: RealDebrid = yield getApi();;
      const { torrentId }: Yield<typeof api.addMagnet> = (yield call([api, api.addMagnet], magnetLink)) as any;
      yield put(addMagnet.success({ torrentId }));

    } catch (err) {
      yield put(addMagnet.failure(getErrorMsg(err)));
    }
  });
}
function* watchAddTorrentFile() {
  yield takeEvery(addTorrentFile.request, function* ({ payload: { filePath } }) {
    try {
      const api: RealDebrid = yield getApi(); 
      const { torrentId }: Yield<typeof api.addMagnet> = yield api.addTorrent(filePath)
      yield put(addTorrentFile.success({ torrentId }));

    } catch (err) {
      yield put(addTorrentFile.failure(getErrorMsg(err)));
    }
  });
}
function* watchTorrentAdded() {
  yield takeEvery([addMagnet.success, addTorrentFile.success], function* ({ payload: { torrentId } }) {
    while (true) {
      yield put(fetchTorrent.request({ torrentId }));
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
  yield takeLatest(fetchTorrent.request, function* ({ payload:{ torrentId }  }) {
    try {
      const api: RealDebrid = yield getApi();
      const torrent: Yield<typeof api.torrent> = yield call([api, api.torrent], torrentId);

      yield put(fetchTorrent.success(torrent));

    } catch (err) {
        yield put(fetchTorrent.failure(getErrorMsg(err)));
    }
  });
}
function* watch_openFileSelect() { 
  yield takeEvery(openFileSelect, function* ({ payload: {torrentId} }) { 
    const fileIds: Yield<typeof showFileSelect> = yield showFileSelect(torrentId);
    const api: RealDebrid = yield getApi();
    if(fileIds.length){
      yield api.selectFiles(torrentId, fileIds);
    } else {
      yield api.delete(torrentId);
    }
  })
}

export default function* () {
  yield all([
    fork(watchFetchRequest),
    fork(watchAddMagnet),
    fork(watchAddTorrentFile),
    fork(watchTorrentAdded),
    fork(watchTorrentRequest),
    fork(watch_openFileSelect)
  ])
}