import { app } from './settings';
import webpack = require('webpack');
const  {default: config}  = require(`./webpack.config.${app}`) as {default: webpack.Configuration};
console.log({ resolve: JSON.stringify(config.resolve.extensions), rules: JSON.stringify(config.module.rules) });
export default config;