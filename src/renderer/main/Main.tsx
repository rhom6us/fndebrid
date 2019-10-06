import { Store } from 'redux'
import React from "react"
import { Provider } from 'react-redux';
import { useTheme, styled } from "../ThemeContext";
import configureStore from '../configureStore';
import Demo from './Demo';
import DevTools from '../debug/DevTools';
import { Theme } from '../theme';


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
export default ({  }) => {
  const themeState = useTheme();
  console.log({themeState});
  return (<>
  
    <Wrapper>
      <Provider store={store}>
        <h1>yee haw</h1>
        <section><Demo />
          <pre>{JSON.stringify(store.getState())}</pre></section>
        <section><DevTools /></section>
        <footer>
        <button onClick={() => themeState.toggle()}>
          {themeState.dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
        </footer>
      </Provider>
    </Wrapper>
  </>);
}
