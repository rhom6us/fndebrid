import { Store } from 'redux'
import React from "react"
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import Demo from './Demo';
import DevTools from '../debug/DevTools';


const store = configureStore();
// const GlobalStyle = createGlobalStyle`
//   ${reset}
//   /* other styles */
// `
export default ({  }) => (<>
   {/* <GlobalStyle /> */}
  <Provider store={store}>
    <h1>yee haw</h1>
    <section><Demo/>
    <pre>{JSON.stringify(store.getState())}</pre></section>
    <section><DevTools /></section>
    <footer><h5>that's all, folks.</h5></footer>
  </Provider>
</>)
