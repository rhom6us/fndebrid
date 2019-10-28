import React from 'react';
import ReactDom from 'react-dom';
import './global.scss';
import Root from './Root';

const render = (Component: any) => {
  ReactDom.render(<Component />, document.querySelector('react-dom'));
};
setImmediate(() => {
  document.body.appendChild(document.createElement('react-dom'));
  render(Root);
});

declare global {
  export interface NodeModule {
    hot: {
      accept(module: string, callback: () => void): void;
    };
  }
}
