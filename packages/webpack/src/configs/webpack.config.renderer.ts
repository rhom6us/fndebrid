import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import webpack from 'webpack';
import { config } from './webpack.config.common';
import { fontRule, globalStylesheetRule, htmlRule, imageRule, nodeRule, stylesheetRile } from './rules';
import { staticSourceDir, app } from './settings';

const entry = Object.keys(config.entry).reduce((map, key) => {
  map[key] = ['react-hot-loader/patch', config.entry[key]];
  return map;
}, {} as Record<string, readonly string[]>)

export default <webpack.Configuration>{
  ...config,
  target: 'electron-renderer',
  entry,
  resolve: {
    ...config.resolve,
    extensions: [
      ...config.resolve.extensions,
      '.tsx', '.css', '.scss'
    ]
  },
  module: {
    ...config.module,
    rules: [
      ...config.module.rules,
      nodeRule,
      globalStylesheetRule,
      stylesheetRile,
      imageRule,
      fontRule,
      htmlRule,
    ]
  },
  plugins: [
    ...config.plugins,
    new HtmlWebpackPlugin({
      title: "Webpack App",
      // template: `!!html-loader?minimize=false&url=false!${path.resolve(rendererSourceDir, 'template.html')}`,
      "filename": `${"index"}.html`,
      // "chunks": [entry],
      inject: 'head',
      // "compile": true,
      chunks: "all",
      // excludeChunks: [],
      // "nodeModules": "C:\\dev\\fndebrid\\node_modules",
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[id].styles.css',
      chunkFilename: '[id].styles.css',
      // moduleFilename: (name) => '[id].styles.css'
    }),
  ]
};