import { all, fork, takeLatest, put } from "redux-saga/effects";
import dispatcher from '../../dispatcher';
import ProtocolHandler from '../../ProtocolHandler';
import TorrentFileHandler from '../../TorrentFileHandler';
import { app, dialog, BrowserWindow } from 'electron';
import { Yield } from '../../../common';
// import { protocolHandler, torrentFileHandler } from '../../Application';

function* watch_chooseDownloadLocation_request() {
  yield takeLatest(dispatcher.chooseDownloadLocation, function* () {
    const result: Yield<typeof dialog.showOpenDialog> = yield dialog.showOpenDialog(BrowserWindow.getFocusedWindow()!, { properties: ['openDirectory'] });
    if (!result.canceled && result.filePaths && result.filePaths.length) {
      yield put(dispatcher.setPreferences({ downloadLocation: result.filePaths[0] }));
    }
  })
}


function* watchAssociateTorrentsRequest() {
  const torrentFileHandler = new TorrentFileHandler(dispatcher);
  yield takeLatest(dispatcher.associateTorrentFiles.request, function* ({ payload: associateTorrentFiles }) {
    if (associateTorrentFiles && !torrentFileHandler.isAssociated) {
      torrentFileHandler.associate();
    }
    if (!associateTorrentFiles && torrentFileHandler.isAssociated) {
      torrentFileHandler.disassociate();
    }
    yield put(dispatcher.associateTorrentFiles.success(torrentFileHandler.isAssociated));
  });
}
function* watchAssociateMagnetRequest() {
  const protocolHandler = new ProtocolHandler();
  yield takeLatest(dispatcher.associateMagnetLinks.request, function* ({ payload: { associateMagnetLinks } }) {
    if (associateMagnetLinks && !protocolHandler.isAssociated) {
      protocolHandler.associate();
    }
    if (!associateMagnetLinks && protocolHandler.isAssociated) {
      protocolHandler.disassociate();
    }
    yield put(dispatcher.associateMagnetLinks.success({ magnetLinksAssociated: protocolHandler.isAssociated }));
  });
}

export default function* () {
  yield all([
    fork(watch_chooseDownloadLocation_request),
    fork(watchAssociateMagnetRequest),
    fork(watchAssociateTorrentsRequest)
  ])
}