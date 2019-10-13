import React, { ReactNode } from 'react';
import ReactDom from 'react-dom';
import { Router } from 'react-router-static';
import Root from './Root';
import './global.scss';
import { AppContainer } from 'react-hot-loader';
// function addStyle(url: string) {
//   const style1 = document.createElement(('link'));
//   style1.href = url;
//   style1.rel = "stylesheet";
//   document.head.appendChild(style1);
// }
// addStyle("https://unpkg.com/normalize.css@^7.0.0");
// addStyle("https://unpkg.com/@blueprintjs/icons@^3.4.0/lib/css/blueprint-icons.css" );
// addStyle("https://unpkg.com/@blueprintjs/core@^3.10.0/lib/css/blueprint.css");

const render = (Component: any) => {
  ReactDom.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  );
}

render(Root);


if (module.hot) {
  module.hot.accept('./Root', () => { render(Root); });
}