import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-static';
import Debug from './debug';
import Main from './main';
import { Preferences } from './preferences';
import Root from './Root';

ReactDOM.render(<Root><Router routes={{Main, Preferences, Debug}} /></Root>, document.getElementById('app'));