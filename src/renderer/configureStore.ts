import { createStore, applyMiddleware, compose, Reducer, Store, combineReducers, StoreEnhancer, StoreEnhancerStoreCreator } from 'redux';
import { electronEnhancer } from 'redux-electron-store';
import DevTools from './debug/DevTools';
import StoreProxy from './StoreProxy';


// const enhance: StoreEnhancer = (next:StoreEnhancerStoreCreator) => (reducer, initialstate) => {
//   const str = next(reducer, initialstate)
//   str.dispatch
// };

namespace preferences {
  const dlReducer = function (state: any = {}, { payload }: any) {
    return { ...state, ...payload };
  }

  export const torrentsReducer = function (state = { files: [] }, action: any) {
    return dlReducer(state, action);
  }
  export const preferencesReducer = function (state = { downloadLocation: 'default' }, action: any) {

    switch (action.type) {
      case 'INCREMENT':
      case 'DECREMENT':
      default:
        return dlReducer(state, action);
    }
  }
}

// const rootReducer: Reducer<State, RootAction> = (state, action) => state!;
let store: any;//Store<State>;
store = new StoreProxy();
export default function configureStore(initialState?: any): Store<any> {
  return store || (store = createStore(
    combineReducers({
      preferences: preferences.preferencesReducer,
      torrents: preferences.torrentsReducer
    }), // all reducers are in the main process
    initialState,
    compose(
      // applyMiddleware(d1, d2, d3),
      electronEnhancer({
        dispatchProxy: (a: any) => store.dispatch(a),
      }),
      DevTools.instrument()
    )
  ));
}