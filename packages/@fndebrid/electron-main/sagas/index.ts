import { all, fork } from 'redux-saga/effects';
import { saga as torrentsSaga } from './torrents-sagas';
import { saga as preferencesSaga } from './preferences-sagas';

export function* saga () {
  yield all([
    fork(torrentsSaga),
    fork(preferencesSaga),
  ]);
}