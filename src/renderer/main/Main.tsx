import React from "react";
import configureStore from '../configureStore';
import DevTools from '../debug/DevTools';
import { styled, useTheme } from "../ThemeContext";
import Demo from './Demo';


const store = configureStore();

const Wrapper = styled("div")`
  background: ${props => props.theme.background};
  width: 100vw;
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen";
  h1 {
    color: ${props => props.theme.body};
  }
`;



// const GlobalStyle = createGlobalStyle`
//   ${reset}
//   /* other styles */
// `
export default ({ }) => {
  const themeState = useTheme();
  return (

    <Wrapper>
      <h1>yee haw</h1>
      <section><Demo />
        <pre>{JSON.stringify(store.getState())}</pre></section>
      <section><DevTools /></section>
      <footer>
        <button onClick={() => themeState.toggle()}>
          {themeState.dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </footer>
    </Wrapper>
  );
}
