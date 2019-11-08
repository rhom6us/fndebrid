import {createStore} from 'electron-redux-proxy';
import {Store} from 'redux';

// let store: any;//Store<State>;
// store = new StoreProxy();
const store = createStore({logger: console.log.bind(console)});
export default function configureStore(): Store<any> {
  return store;
}
