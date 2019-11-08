import {Classes} from '@blueprintjs/core';
import styled, {CreateStyled} from '@emotion/styled';
import classNames from 'classnames';
import {ipcRenderer} from 'electron';
import {ThemeProvider as EmotionThemeProvider} from 'emotion-theming';
import React from 'react';
import ResizeDetector from 'react-resize-detector';
import styles from './bpjs/core';
import theme, {Theme} from './theme';

// tslint:disable-next-line: no-empty
export const ThemeContext = React.createContext({dark: true, toggle: () => {}});
export const useTheme = () => React.useContext(ThemeContext);

function useThemeState() {
  const [themeState, setThemeState] = React.useState({isDark: true, hasThemeMounted: false});

  React.useEffect(() => {
    setThemeState({
      isDark: JSON.parse(localStorage.getItem('dark') || 'true'),
      hasThemeMounted: true,
    });
  }, []);

  return [themeState, setThemeState] as [typeof themeState, typeof setThemeState];
}

export const ThemeProvider: React.FC = ({children}) => {
  const [themeState, setThemeState] = useThemeState();

  if (!themeState.hasThemeMounted) {
    return <div />;
  }

  const toggle = () => {
    const dark = !themeState.isDark;
    localStorage.setItem('dark', JSON.stringify(dark));
    setThemeState({...themeState, isDark: dark});
  };

  const TheRoot = styled('article')({
    backgroundColor: themeState.isDark ? styles.darkAppBackgroundColor : styles.appBackgroundColor,
    // minHeight: '100vh'
  });
  const className = classNames('root', {[Classes.DARK]: themeState.isDark});

  const resizeDetectorProps = {
    refreshMode: 'debounce' as 'debounce',
    refreshRate: 250,
    refreshOptions: {
      leading: true,
      trailing: true,
    },
    handleWidth: true,
    handleHeight: true,
    onResize(width: number, height: number) {
      ipcRenderer.send('please-resize', {width, height});
    },
  };
  return (
    // <EmotionThemeProvider theme={computedTheme}>
    <TheRoot id='root' {...{className}}>
      <ThemeContext.Provider value={{dark: themeState.isDark, toggle}}>{children}</ThemeContext.Provider>
      <ResizeDetector {...resizeDetectorProps} />
    </TheRoot>

    // </EmotionThemeProvider>
  );
};
