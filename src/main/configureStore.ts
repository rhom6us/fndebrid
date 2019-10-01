
import { Store, createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { electronEnhancer } from 'redux-electron-store';


// Import the state interface and our combined reducers/sagas.
import { State as ApplicationState, rootReducer, rootSaga, RootAction } from './store'

export default function configureStore(/*history: History,*/ initialState?: ApplicationState): Store<ApplicationState, RootAction> {

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
        dispatchProxy: (p:any) => store.dispatch(p),
      })
    )
  );

  // Don't forget to run the root saga, and return the store object.
  sagaMiddleware.run(rootSaga)
  return store
}