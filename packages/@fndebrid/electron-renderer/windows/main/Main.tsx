import styled from '@emotion/styled';
import React from 'react';
import {useStore} from 'react-redux';
import {useTheme} from '../../ThemeContext';
import {Demo} from './Demo';

const Wrapper = styled('div')``;

// const GlobalStyle = createGlobalStyle`
//   ${reset}
//   /* other styles */
// `
export const Main = ({}) => {
  const themeState = useTheme();
  const store = useStore();
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
