import React from "react";
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Router } from 'react-router-static';
import { AddTorrent } from './AddTorrent';
import configureStore from './configureStore';
import Main from './main';
import Preferences from './preferences';
import { ThemeProvider } from './ThemeContext';


const store = configureStore();


const Root: React.FC = () => (
  <ThemeProvider>
    <Provider store={store}>
      <Router routes={{ Main, Preferences, AddTorrent }} />
    </Provider>
  </ThemeProvider>
);

export default hot(module)(Root);
