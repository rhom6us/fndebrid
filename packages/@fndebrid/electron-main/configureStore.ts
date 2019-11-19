import {FnState, FnStore, reducer} from '@fndebrid/store';
import {proxyEnhancer} from 'electron-redux-proxy';
import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools as compose, RemoteReduxDevToolsOptions} from 'remote-redux-devtools';
import {saga} from './sagas';

export default function configureStore(/*history: History,*/ initialState?: FnState): FnStore {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducer, // connectRouter(history)(rootReducer),
    initialState as any,
    compose(
      proxyEnhancer,
      applyMiddleware(
        /*routerMiddleware(history),*/
        sagaMiddleware,
      ),
    ),
  );

  // Don't forget to run the root saga, and return the store object.
  sagaMiddleware.run(saga);
  return store;
}
