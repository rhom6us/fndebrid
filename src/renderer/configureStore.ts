import { createStore, applyMiddleware, compose, Reducer } from 'redux';
import { electronEnhancer } from 'redux-electron-store';

import DevTools from './containers/DevTools';
import { State, RootAction } from '../main/store';

const rootReducer:Reducer<State, RootAction> = (state, action) => state!;

export default function configureStore(initialState?:State) {
  const store = createStore(
    rootReducer, // all reducers are in the main process
    initialState,
    compose(
      // applyMiddleware(d1, d2, d3),
      electronEnhancer({
        dispatchProxy: (a:any) => store.dispatch(a),
      }),
      DevTools.instrument()
    )
  );

  return store;
}