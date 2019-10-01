import { all, fork, takeLatest, put } from "redux-saga/effects";
import * as actions from "./actions";
// import { protocolHandler, torrentFileHandler } from '../../Application';

function* watchAssociateTorrentsRequest() {
  yield takeLatest(actions.associateTorrentFiles.request, function* ({ payload: associateTorrentFiles }) {
    // if (associateTorrentFiles && !torrentFileHandler.isAssociated) {
    //   torrentFileHandler.associate();
    // }
    // if (!associateTorrentFiles && torrentFileHandler.isAssociated) {
    //   torrentFileHandler.disassociate();
    // }
    // yield put(actions.associateTorrentFiles.success(torrentFileHandler.isAssociated));
  });
}
function* watchAssociateMagnetRequest() {
  yield takeLatest(actions.associateMagnetLinks.request, function* ({ payload: { associateMagnetLinks } })  {
    // if (associateMagnetLinks && !protocolHandler.isAssociated) {
    //   protocolHandler.associate();
    // }
    // if (!associateMagnetLinks && protocolHandler.isAssociated) {
    //   protocolHandler.disassociate();
    // }
    // yield put(actions.associateMagnetLinks.success({magnetLinksAssociated: protocolHandler.isAssociated}));
  });
}

export default function* () {
  yield all([
    fork(watchAssociateMagnetRequest),
    fork(watchAssociateTorrentsRequest)
  ])
}