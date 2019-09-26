
import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { fetchTorrents, addMagnet } from './actions'
import { shell } from 'electron'
import { RealDebrid, Authorizor } from '../../real-debrid'
import { getType, ActionType } from 'typesafe-actions'
import { Yield, Memoize } from '../../../common/utils';


@Memoize
function getToken() {
  return Authorizor.getToken((url: string) => shell.openExternal(url));
}
function* watchFetchRequest() {
  yield takeLatest(getType(fetchTorrents.request), function* () {
    try {
      const api = new RealDebrid(yield call(getToken));
      const torrents: Yield<typeof api.torrents> = yield call([api, api.torrents]);
      yield put(fetchTorrents.success(torrents));

    } catch (err) {
      if (err instanceof Error) {
        yield put(fetchTorrents.failure(err));
      } else if (typeof err === 'string') {
        yield put(fetchTorrents.failure(err));
      } else { }
      yield put(fetchTorrents.failure('An unknown error occured.'));
    }
  }
    });
}

function* watchAddMagnet() {
  yield takeEvery(getType(addMagnet.request), function* ({ payload: { magnetLink } }: ActionType<typeof addMagnet.request>) {
    try {
      const token: Yield<typeof getToken> = yield call(getToken);
      const api = new RealDebrid(token);
      const { torrentId }: Yield<typeof api.addMagnet> = yield call([api, api.addMagnet], magnetLink);
      yield put(addMagnet.success({ torrentId }));

    } catch (err) {
      if (err instanceof Error) {
        yield put(addMagnet.failure(err));
      } else if (typeof err === 'string') {
        yield put(addMagnet.failure(err));
      } else {
        yield put(addMagnet.failure('An unknown error occured.'));
      }
    }
  });
}

export default function* () {
  yield all([
    fork(watchFetchRequest),
    fork(watchAddMagnet),
  ])
}