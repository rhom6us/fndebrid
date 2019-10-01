import {} from 'react';
import {render} from 'react-dom';
import DevTools from './containers/DevTools';
import configureStore from '../main/configureStore';
import { Provider } from 'react-redux';
import React from 'react';
import { Store } from 'redux';

const store = configureStore();

interface MainProps {
  store: Store<any>
}

const Debug: React.FC<MainProps> = ({ store }) => {
  return (
  <Provider store={store}>
    <div>
      <DevTools />
    </div>
  </Provider>
   )
  }
  
export default Debug;