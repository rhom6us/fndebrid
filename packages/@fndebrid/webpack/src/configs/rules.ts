import {
  babelLoader,
  cssHotLoader,
  cssHotModuleLoader,
  cssLoader,
  cssModuleLoader,
  fontLoader,
  imageLoader,
  postcssLoader,
  sassLoader,
  tsLoader,
} from './loaders';
import {isDev} from './settings';

import MiniCssExtractPlugin = require('mini-css-extract-plugin');

export const typescriptRule = {
  test: /\.tsx?$/i,
  exclude: /node_modules\/(?!@fndebrid\b)/i,
  use: [tsLoader],
};
export const reactTypescriptRule = {
  test: /\.tsx?$/i,
  //include: /node_modules/i,
  use: ['react-hot-loader/webpack', tsLoader],
};
export const scriptRule = {
  test: /\.(j|t)sx?$/i,
  exclude: /node_modules/,
  use: [babelLoader],
};
export const nodeRule = {
  test: /\.node$/i,
  use: 'node-loader',
};
export const globalStylesheetRule = {
  test: /\b(global|vars)\.s?css$/i,
  use: [...(isDev ? [cssHotLoader] : []), MiniCssExtractPlugin.loader, cssLoader, postcssLoader, sassLoader],
};
export const stylesheetRule = {
  test: /\.s?css$/i,
  exclude: /\b(global|vars)\.s?css$/i,
  use: [
    ...(isDev ? [cssHotModuleLoader] : []),
    MiniCssExtractPlugin.loader,
    cssModuleLoader,
    postcssLoader,
    sassLoader,
  ],
};

export const imageRule = {
  test: /\.(png|jpg|gif)$/i,
  use: [imageLoader],
};

export const fontRule = {
  test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
  use: [fontLoader],
};

export const htmlRule = {
  test: /\.(html)$/i,
  use: ['html-loader'],
};
