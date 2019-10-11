
import { shell } from 'electron';
import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { ActionType, getType } from 'typesafe-actions';
import { Memoize, Yield } from '../../../common';
import { Authorizor, RealDebrid } from '../../real-debrid';
import { addMagnet, fetchTorrents } from './actions';


class TokenContainer {
  @Memoize()
  static async getToken() {
    const result = await Authorizor.getToken((url: string) => shell.openExternal(url));
    return result;
  }
}
const getToken = () => TokenContainer.getToken();

function* watchFetchRequest() {
  yield takeLatest(getType(fetchTorrents.request), function* () {
    try {
      const token = yield call(getToken);

      const api = new RealDebrid(token);
      const torrents: Yield<typeof api.torrents> = yield call([api, api.torrents]);

      yield put(fetchTorrents.success(torrents));

    } catch (err) {
      if (err instanceof Error) {
        yield put(fetchTorrents.failure(err));
      } else if (typeof err === 'string') {
        yield put(fetchTorrents.failure(err));
      } else {
        yield put(fetchTorrents.failure('An unknown error occured.'));
      }
    }
  });
}

function* watchAddMagnet() {
  yield takeEvery(getType(addMagnet.request), function* ({ payload: { magnetLink } }: ActionType<typeof addMagnet.request>) {
    try {
      const token: string = (yield call(getToken)) as any;
      const api = new RealDebrid(token);
      const { torrentId }: Yield<typeof api.addMagnet> = (yield call([api, api.addMagnet], magnetLink)) as any;
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