import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Router } from 'react-router-static';
import configureStore from './configureStore';
import { ThemeProvider } from './ThemeContext';
import { AddTorrent, Main, Preferences, Torrents } from './windows';

const store = configureStore();

const Root: React.FC = () => (
  <ThemeProvider>
    <Provider store={store}>
      <Router routes={{ Main, Preferences, AddTorrent, Torrents }} />
    </Provider>
  </ThemeProvider>
);

export default hot(module)(Root);
