import React from "react";
import { ThemeProvider as EmotionThemeProvider } from "emotion-theming";
import styledInternal, { CreateStyled } from "@emotion/styled";
import theme, { Theme } from "./theme";

export interface ThemeContextProps {
  dark: boolean;
  toggle(): void;
}
export const ThemeContext = React.createContext<ThemeContextProps>({ dark: false, toggle:()=> { } });
export const useTheme = () => React.useContext(ThemeContext);

interface ThemeState {
  dark: boolean;
  hasThemeMounted: boolean;
}

function useThemeState() {
  const [themeState, setThemeState] = React.useState<ThemeState>({ dark: false, hasThemeMounted: false });

  React.useEffect(() => {
    setThemeState({
      dark: JSON.parse(localStorage.getItem("dark")!),
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

  const computedTheme = themeState.dark ? theme("dark") : theme("light");
  const toggle= () => {
    const dark = !themeState.dark;
    console.log({dark});
    localStorage.setItem("dark", JSON.stringify(dark));
    setThemeState({ ...themeState, dark });
  }
 
  return (
    <EmotionThemeProvider theme={computedTheme}>
      <ThemeContext.Provider value={{dark:themeState.dark, toggle}} >
        {children}
      </ThemeContext.Provider>
    </EmotionThemeProvider>
  );
};

export const styled = styledInternal as CreateStyled<Theme>
