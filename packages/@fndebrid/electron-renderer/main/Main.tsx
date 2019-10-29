import React from 'react';
import configureStore from '../configureStore';
import {useTheme} from '../ThemeContext';
import Demo from './Demo';
import styled from '@emotion/styled';

const store = configureStore();

const Wrapper = styled('div')``;

// const GlobalStyle = createGlobalStyle`
//   ${reset}
//   /* other styles */
// `
export default ({}) => {
  const themeState = useTheme();
  return (
    <Wrapper>
      <h1>yee haw</h1>
      <section>
        <Demo />
        <pre>{JSON.stringify(store.getState())}</pre>
      </section>
      <footer>
        <button onClick={() => themeState.toggle()}>
          {themeState.dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </footer>
    </Wrapper>
  );
};
