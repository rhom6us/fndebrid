import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-static';
import Main from './main';
import Debug from './debug';
// import configureStore from './configureStore';
// import DevTools from './containers/DevTools';
// import 'reset-css';

const routes = {
  default: Main, 
  debug: Debug,
};


ReactDOM.render(<Router routes={routes} />, document.getElementById('app'))