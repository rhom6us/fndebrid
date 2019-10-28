import {Store} from 'redux';
import {createStore} from 'electron-redux-proxy';

// let store: any;//Store<State>;
// store = new StoreProxy();
const store = createStore({logger: console.log.bind(console)});
export default function configureStore(): Store<any> {
  return store;
}
