import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-static';
import Debug from './debug';
import Main from './main';
import { Preferences } from './preferences';
import Root from './Root';
import './global.scss';
// function addStyle(url: string) {
//   const style1 = document.createElement(('link'));
//   style1.href = url;
//   style1.rel = "stylesheet";
//   document.head.appendChild(style1);
// }
// addStyle("https://unpkg.com/normalize.css@^7.0.0");
// addStyle("https://unpkg.com/@blueprintjs/icons@^3.4.0/lib/css/blueprint-icons.css" );
// addStyle("https://unpkg.com/@blueprintjs/core@^3.10.0/lib/css/blueprint.css");
ReactDOM.render(<Root><Router routes={{ Main, Preferences, Debug }} /></Root>, document.getElementById('app'));