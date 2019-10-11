import { Store } from 'redux';
import StoreProxy from './StoreProxy';



let store: any;//Store<State>;
store = new StoreProxy();
export default function configureStore(): Store<any> {
  return store;
}