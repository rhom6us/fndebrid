import React from "react";
import { ThemeProvider as EmotionThemeProvider } from "emotion-theming";
import styledInternal, { CreateStyled } from "@emotion/styled";
import theme, { Theme } from "./theme";
import { Classes } from '@blueprintjs/core';
import classNames from 'classnames';
import styles from './bpjs/core';
import styled from '@emotion/styled';

export const ThemeContext = React.createContext({ dark: true, toggle: () => { } });
export const useTheme = () => React.useContext(ThemeContext);


function useThemeState() {
  const [themeState, setThemeState] = React.useState({ isDark: true, hasThemeMounted: false });

  React.useEffect(() => {
    setThemeState({
      isDark: JSON.parse(localStorage.getItem("dark") || 'true'),
      hasThemeMounted: true
    });
  }, []);

  return [themeState, setThemeState] as [typeof themeState, typeof setThemeState];
};

export const ThemeProvider: React.FC = ({ children }) => {
  const [themeState, setThemeState] = useThemeState();

  if (!themeState.hasThemeMounted) {
    return <div />;
  }


  const toggle = () => {
    const dark = !themeState.isDark;
    localStorage.setItem("dark", JSON.stringify(dark));
    setThemeState({ ...themeState, isDark: dark });
  }


  const TheRoot = styled('article')({
    backgroundColor: themeState.isDark ? styles.darkAppBackgroundColor : styles.appBackgroundColor,
    minHeight: '100vh'
  });
  const className = classNames('root', { [Classes.DARK]: themeState.isDark })
  return (
    // <EmotionThemeProvider theme={computedTheme}>
    <TheRoot id="root" {...{ className }}>
      <ThemeContext.Provider value={{ dark: themeState.isDark, toggle }} >
        {children}
      </ThemeContext.Provider>
    </TheRoot>

    // </EmotionThemeProvider>
  );
};


