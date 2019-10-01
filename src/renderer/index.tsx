import * as React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-static';
import Main from './Main';
import configureStore from './configureStore';
import DevTools from './containers/DevTools';


const store = configureStore();


ReactDOM.render(<Main store={store} />, document.getElementById('app'))