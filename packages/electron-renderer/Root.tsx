import React from "react";
import { Provider } from 'react-redux';
import { Router } from 'react-router-static';
import AddMagnet from './add-magnet';
import configureStore from './configureStore';
import Main from './main';
import Preferences from './preferences';
import { ThemeProvider } from './ThemeContext';
import { AddTorrent } from './AddTorrent';


const store = configureStore();


const Root: React.FC = () => (
  <ThemeProvider>
    <Provider store={store}>
      <Router routes={{ Main, Preferences, AddTorrent }} />
    </Provider>
  </ThemeProvider>
);


export default Root;