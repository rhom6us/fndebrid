import ProtocolHandler from './ProtocolHandler';
import configureStore from './configureStore';
import StoreHandler from './StoreHandler';
import TorrentFileHandler from './TorrentFileHandler';


export const store = configureStore();
const storeHandler = new StoreHandler(store);
export const protocolHandler = new ProtocolHandler(p => store.dispatch(p));
export const torrentFileHandler = new TorrentFileHandler(p => store.dispatch(p));