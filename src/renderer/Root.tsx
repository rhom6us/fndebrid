import { Store } from 'redux'
import React from "react"
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { useTheme, ThemeProvider } from './ThemeContext';

const store = configureStore();


const Themed: React.FC = ({ children }) => {
  const themeState = useTheme();
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

const Fu: React.FC = ({ children }) => {
  return (
    <ThemeProvider>
      <Themed>
        {children}
      </Themed>
    </ThemeProvider>
  )
}

export default Fu;