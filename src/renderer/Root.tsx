import styled from '@emotion/styled';
import React from "react";
import { Provider } from 'react-redux';
import { Router } from 'react-router-static';
import configureStore from './configureStore';
import Main from './main';
import { Preferences } from './preferences';
 import FileSelect from './select-files';
import { ThemeProvider } from './ThemeContext';

const store = configureStore();


const Root: React.FC = () => (
  <ThemeProvider>
    <Provider store={store}>
      <Router routes={{ Main, Preferences, FileSelect }} />
    </Provider>
  </ThemeProvider>
);


export default Root;