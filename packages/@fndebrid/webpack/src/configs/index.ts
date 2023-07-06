// import { app } from './settings';
import main from './webpack.config.main';
import renderer from './webpack.config.renderer';

// import webpack = require('webpack');
// const {default: config} = require(`./webpack.config.${app}`) as {default: webpack.Configuration};
// export default config;
export { main, renderer };
