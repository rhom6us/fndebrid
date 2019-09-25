
import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { TorrentsActionTypes, Torrent } from './types'
import { fetchTorrents} from './actions'
import RealDebrid from '../../real-debrid/RealDebrid'
import { Authorizor } from "../../real-debrid/Authorizor"
import { shell } from 'electron'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || ''

async function getApi(){
    if(!getApi.token)
        getApi.token = Authorizor.getToken(url => shell.openExternal(url));
    return new RealDebrid(await getApi.token);
}
module getApi{
    export let token: Promise<string>;
}



function* watchFetchRequest() {
    let token: string;
    yield takeLatest(TorrentsActionTypes.FETCH_REQUEST, function* () {
        try {

            if(!token){
                token = yield call(Authorizor.getToken, (url:string) => shell.openExternal(url));
            }
            const api = new RealDebrid(token);
            const torrents:Torrent[] = yield call([api, api.torrents]);
            yield put(fetchTorrents.success(torrents));
    
        } catch (err) {
            if (err instanceof Error) {
                yield put(fetchTorrents.failure(err.stack!));
            } else {
                yield put(fetchTorrents.failure('An unknown error occured.'));
            }
        }
    });
}

// Export our root saga.
// We can also use `fork()` here to split our saga into multiple watchers.
export function* torrentsSaga() {
  yield all([fork(watchFetchRequest)])
}