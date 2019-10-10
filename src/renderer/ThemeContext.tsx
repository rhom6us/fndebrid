import React from "react";
import { ThemeProvider as EmotionThemeProvider } from "emotion-theming";
import styledInternal, { CreateStyled } from "@emotion/styled";
import theme, { Theme } from "./theme";
import {Classes} from '@blueprintjs/core';


export const ThemeContext = React.createContext({ dark: true, toggle: () => { } });
export const useTheme = () => React.useContext(ThemeContext);


function useThemeState() {
  const [themeState, setThemeState] = React.useState({ isDark: true, hasThemeMounted: false });

  React.useEffect(() => {
    setThemeState({
      isDark: JSON.parse(localStorage.getItem("dark")!),
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

  const computedTheme = themeState.isDark ? theme("dark") : theme("light");
  const themeClassName = themeState.isDark ? Classes.DARK: '';
  console.log({themeClassName})
  const toggle = () => {
    const dark = !themeState.isDark;
    localStorage.setItem("dark", JSON.stringify(dark));
    setThemeState({ ...themeState, isDark: dark });
  }

  const TheRoot = styled('div')`
    background-color: ${themeState.isDark ? 'hsl(207, 23%, 25%)' : 'inherit'} ;
    height: 100vh;
  `;

  return (
    // <EmotionThemeProvider theme={computedTheme}>
    <TheRoot className={themeClassName}>
      <ThemeContext.Provider value={{ dark: themeState.isDark, toggle }} >
        {children}
      </ThemeContext.Provider>
    </TheRoot>

    // </EmotionThemeProvider>
  );
};

export const styled = styledInternal as CreateStyled<Theme>
