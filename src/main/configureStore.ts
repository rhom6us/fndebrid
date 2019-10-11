
import { applyMiddleware, compose, createStore, Store } from 'redux';
import { electronEnhancer } from 'redux-electron-store';
import createSagaMiddleware from 'redux-saga';
// Import the state interface and our combined reducers/sagas.
import { Action, rootReducer, rootSaga, State as ApplicationState } from './store';
import { proxyEnhancer } from './StoreHandler';






export default function configureStore(/*history: History,*/ initialState?: ApplicationState): Store<ApplicationState, Action> {

  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    rootReducer,//connectRouter(history)(rootReducer),
    initialState,
    compose(
      applyMiddleware(
        /*routerMiddleware(history),*/
        sagaMiddleware
      ),
      electronEnhancer({
        // Necessary for synched actions to pass through all enhancers
        dispatchProxy: (p: any) => store.dispatch(p),
      }),
      proxyEnhancer
    )
  );

  // Don't forget to run the root saga, and return the store object.
  sagaMiddleware.run(rootSaga)
  return store
}