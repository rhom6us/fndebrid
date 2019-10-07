import React from "react";
import { ThemeProvider as EmotionThemeProvider } from "emotion-theming";
import styledInternal, { CreateStyled } from "@emotion/styled";
import theme, { Theme } from "./theme";


export const ThemeContext = React.createContext({ dark: false, toggle: () => { } });
export const useTheme = () => React.useContext(ThemeContext);


function useThemeState() {
  const [themeState, setThemeState] = React.useState({ isDark: false, hasThemeMounted: false });

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
  const toggle = () => {
    const dark = !themeState.isDark;
    localStorage.setItem("dark", JSON.stringify(dark));
    setThemeState({ ...themeState, isDark: dark });
  }

  return (
    <EmotionThemeProvider theme={computedTheme}>
      <ThemeContext.Provider value={{ dark: themeState.isDark, toggle }} >
        {children}
      </ThemeContext.Provider>
    </EmotionThemeProvider>
  );
};

export const styled = styledInternal as CreateStyled<Theme>
