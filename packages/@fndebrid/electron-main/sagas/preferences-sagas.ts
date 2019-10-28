import {all, fork, takeLatest, put, call, select} from 'redux-saga/effects';
import ProtocolHandler from '../ProtocolHandler';
import torrentFileHandler from '../torrent-file-associator';
import {app, dialog, BrowserWindow} from 'electron';
import * as actions from '@fndebrid/store/preferences/actions';
import {Unpack} from '@fndebrid/core';
// import { protocolHandler, torrentFileHandler } from '../../Application';

type Yield<T> = Unpack<T>;

function* watch_chooseDownloadLocation_request() {
  yield takeLatest(actions.chooseDownloadLocation, function*() {
    const dlLocation = yield select(state => state.preferences.downloadLocation);
    const result: Yield<typeof dialog.showOpenDialog> = yield dialog.showOpenDialog(BrowserWindow.getFocusedWindow()!, {
      defaultPath: dlLocation,
      properties: ['openDirectory'],
    });
    if (!result.canceled && result.filePaths && result.filePaths.length) {
      yield put(actions.setPreferences({downloadLocation: result.filePaths[0]}));
    }
  });
}

function* watchAssociateTorrentsRequest() {
  yield takeLatest(actions.associateTorrentFiles, function*({payload: associateTorrentFiles}) {
    if (associateTorrentFiles) {
      yield call([torrentFileHandler, torrentFileHandler.associate]);
    }
    if (!associateTorrentFiles) {
      yield call([torrentFileHandler, torrentFileHandler.disassociate]);
    }
    const torrentFilesAssociated: Yield<
      typeof torrentFileHandler.isAssociated
    > = yield torrentFileHandler.isAssociated();
    yield put(actions.setPreferences({torrentFilesAssociated}));
  });
}
function* watchAssociateMagnetRequest() {
  const protocolHandler = new ProtocolHandler();
  yield takeLatest(actions.associateMagnetLinks, function*({payload: associateMagnetLinks}) {
    if (associateMagnetLinks && !protocolHandler.isAssociated) {
      protocolHandler.associate();
    }
    if (!associateMagnetLinks && protocolHandler.isAssociated) {
      protocolHandler.disassociate();
    }
    yield put(actions.setPreferences({magnetLinksAssociated: protocolHandler.isAssociated}));
  });
}

export function* saga() {
  yield all([
    fork(watch_chooseDownloadLocation_request),
    fork(watchAssociateMagnetRequest),
    fork(watchAssociateTorrentsRequest),
  ]);
}
