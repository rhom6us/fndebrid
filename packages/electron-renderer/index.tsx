import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import './global.scss';
import Root from './Root';

const render = (Component: any) => {
  ReactDom.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.querySelector('div')
  );
}
const div = document.createElement('div')
document.body.appendChild(div);
render(Root);

if (module.hot) {
  module.hot.accept('./Root', () => {
    render(Root);
  });
}


declare global {
  export interface NodeModule {
    hot: any;
  }
}