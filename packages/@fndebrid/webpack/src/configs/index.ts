import {app} from './settings';

import webpack = require('webpack');
const {default: config} = require(`./webpack.config.${app}`) as {default: webpack.Configuration};
export default config;
