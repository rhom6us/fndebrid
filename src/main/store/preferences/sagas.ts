import { all, fork, takeLatest, put } from "redux-saga/effects";
import { associateMagnetLinks_request, associateMagnetLinks_complete, associateTorrentFiles_request } from "./actions";
import { getType, ActionType } from "typesafe-actions";
import {protocolHandler, torrentFileHandler} from '../../Application';

function* watchAssociateTorrentsRequest() {
    yield takeLatest(getType(associateTorrentFiles_request), function* ({payload}:ActionType<typeof associateTorrentFiles_request>) {
        if(payload.associateTorrentFiles && !torrentFileHandler.isAssociated){
            torrentFileHandler.associate();
        }
        if(!payload.associateTorrentFiles && torrentFileHandler.isAssociated){
            torrentFileHandler.disassociate();
        }
        yield put(associateMagnetLinks_complete(torrentFileHandler.isAssociated));
    });
}
function* watchAssociateMagnetRequest() {
    yield takeLatest(getType(associateMagnetLinks_request), function* ({payload}:ActionType<typeof associateMagnetLinks_request>) {
        if(payload.associateMagnetLinks && !protocolHandler.isAssociated){
            protocolHandler.associate();
        }
        if(!payload.associateMagnetLinks && protocolHandler.isAssociated){
            protocolHandler.disassociate();
        }
        yield put(associateMagnetLinks_complete(protocolHandler.isAssociated));
    });
}

export default function* () {
    yield all([
        fork(watchAssociateMagnetRequest),
        fork(watchAssociateTorrentsRequest)
    ])
  }