import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import webpack from 'webpack';
import {
  fontRule,
  globalStylesheetRule,
  htmlRule,
  imageRule,
  nodeRule,
  reactTypescriptRule,
  scriptRule,
  stylesheetRule,
} from './rules';
import {app, staticSourceDir} from './settings';
import {config} from './webpack.config.common';

export default <webpack.Configuration>{
  ...config,
  target: 'electron-renderer',
  resolve: {
    ...config.resolve,
    extensions: [...config.resolve.extensions, '.tsx', '.css', '.scss'],
  },
  module: {
    ...config.module,
    rules: [
      ...config.module.rules,
      reactTypescriptRule,
      nodeRule,
      globalStylesheetRule,
      stylesheetRule,
      imageRule,
      fontRule,
      htmlRule,
    ],
  },
  plugins: [
    ...config.plugins,
    new HtmlWebpackPlugin({
      title: 'Webpack App',
      // template: `!!html-loader?minimize=false&url=false!${path.resolve(rendererSourceDir, 'template.html')}`,
      filename: `${'index'}.html`,
      // "chunks": [entry],
      inject: 'head',
      // "compile": true,
      chunks: 'all',
      // excludeChunks: [],
      // "nodeModules": "C:\\dev\\fndebrid\\node_modules",
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[id].styles.css',
      chunkFilename: '[id].styles.css',
      // moduleFilename: (name) => '[id].styles.css'
    }),
  ],
};
