
import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools as compose } from 'remote-redux-devtools';

import createSagaMiddleware from 'redux-saga';
// Import the state interface and our combined reducers/sagas.
import { Action, rootReducer, rootSaga, State as ApplicationState } from './store';
import { proxyEnhancer } from 'electron-redux-proxy';






export default function configureStore(/*history: History,*/ initialState?: ApplicationState): Store<ApplicationState, Action> {

  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    rootReducer,//connectRouter(history)(rootReducer),
    initialState as any,
    compose(
      proxyEnhancer,
      applyMiddleware(
        /*routerMiddleware(history),*/
        sagaMiddleware
      )
      
    )
  );

  // Don't forget to run the root saga, and return the store object.
  sagaMiddleware.run(rootSaga)
  return store
}