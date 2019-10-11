import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import ProtocolHandler from '../../ProtocolHandler';
import torrentFileHandler from '../../torrent-file-associator';
import { app, dialog, BrowserWindow } from 'electron';
import { Yield } from '../../../common';
import * as actions from './actions';
// import { protocolHandler, torrentFileHandler } from '../../Application';

function* watch_chooseDownloadLocation_request() {
  yield takeLatest(actions.chooseDownloadLocation, function* () {
    const result: Yield<typeof dialog.showOpenDialog> = yield dialog.showOpenDialog(BrowserWindow.getFocusedWindow()!, { properties: ['openDirectory'] });
    if (!result.canceled && result.filePaths && result.filePaths.length) {
      yield put(actions.setPreferences({ downloadLocation: result.filePaths[0] }));
    }
  })
}


function* watchAssociateTorrentsRequest() {
  yield takeLatest(actions.associateTorrentFiles.request, function* ({ payload: associateTorrentFiles }) {
    if (associateTorrentFiles) {
      yield call([torrentFileHandler, torrentFileHandler.associate]);
    }
    if (!associateTorrentFiles) {
      yield call([torrentFileHandler, torrentFileHandler.disassociate]);
    }
    const worked: Yield<typeof torrentFileHandler.isAssociated> = yield call([torrentFileHandler, torrentFileHandler.isAssociated]);
    yield put(actions.associateTorrentFiles.success(worked));
  });
}
function* watchAssociateMagnetRequest() {
  const protocolHandler = new ProtocolHandler();
  yield takeLatest(actions.associateMagnetLinks.request, function* ({ payload: { associateMagnetLinks } }) {
    if (associateMagnetLinks && !protocolHandler.isAssociated) {
      protocolHandler.associate();
    }
    if (!associateMagnetLinks && protocolHandler.isAssociated) {
      protocolHandler.disassociate();
    }
    yield put(actions.associateMagnetLinks.success({ magnetLinksAssociated: protocolHandler.isAssociated }));
  });
}

export default function* () {
  yield all([
    fork(watch_chooseDownloadLocation_request),
    fork(watchAssociateMagnetRequest),
    fork(watchAssociateTorrentsRequest)
  ])
}