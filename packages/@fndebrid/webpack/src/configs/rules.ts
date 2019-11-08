import MiniCssExtractPlugin from 'mini-css-extract-plugin';
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

//#region code
export const typescriptRule = {
  test: /\.ts$/i,
  exclude: /node_modules/i,
  use: [tsLoader],
};
export const reactTypescriptRule = {
  test: /\.tsx?$/i,
  exclude: /node_modules/i,
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
//#endregion

//#region styles
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
//#endregion

//#region assets
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
//#endregion
