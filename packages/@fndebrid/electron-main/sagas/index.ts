import {all, fork} from 'redux-saga/effects';
import {saga as preferencesSaga} from './preferences-sagas';
import {saga as torrentsSaga} from './real-debrid-sagas';

export function* saga() {
  yield all([fork(torrentsSaga), fork(preferencesSaga)]);
}
