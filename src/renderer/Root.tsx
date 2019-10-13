import React from "react";
import { Provider } from 'react-redux';
import { Router } from 'react-router-static';
import configureStore from './configureStore';
import Debug from './debug';
import Main from './main';
import { Preferences } from './preferences';
import FileSelect from './select-files';
import { ThemeProvider, useTheme } from './ThemeContext';

const store = configureStore();


const Themed: React.FC = ({ children }) => {
  const themeState = useTheme();
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

const Root: React.FC = () => {
  return (
    <ThemeProvider>
      <Themed>
        <Router routes={{ Main, Preferences, Debug, FileSelect }} />
      </Themed>
    </ThemeProvider>
  )
}

export default Root;