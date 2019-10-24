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
    document.querySelector('react-dom')
  );
}
setImmediate(() => {
  document.body.appendChild(document.createElement('react-dom'));
  render(Root);
});
// const c = document.createElement('mount');
// document.body.appendChild(c);

if (module.hot) {
  module.hot.accept('./Root', () => render(Root));
}


declare global {
  export interface NodeModule {
    hot: {
      accept(module: string, callback: () => void): void
    };
  }
}
