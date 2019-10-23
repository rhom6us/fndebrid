
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
import WebpackBar from 'webpackbar';

function isAncestor(file: string, dir: string) {
  return file.length > dir.length && file[dir.length] === path.sep && file.startsWith(dir)
}
export const isDev = process.env.NODE_ENV != 'production';
export const sourceDir = 'runtime';
// export const commonSourceDir = path.join(sourceDir);
export const rendererSourceDir = path.join(sourceDir/*, 'electron-renderer'*/);
export const mainSourceDir = path.join(sourceDir/*, 'electron-main'*/);

export const staticSourceDir = 'static';
export const outDir = 'dist';
export const mainOutDir = path.join(outDir, 'main');
export const rendererOutDir = path.join(outDir, 'renderer');


const config: webpack.Configuration = {
  mode: "development",
  devtool: 'eval-source-map',
  context: path.resolve('.'),
  output: {
    filename: `[name]${isDev ? "" : ".[contenthash]"}.js`,
    chunkFilename: `[name]${isDev ? "" : ".[contenthash]"}.js`,
  },
  stats: {
    warnings: false
  },
  resolve: {
    alias:{
      // '@': path.resolve(rendererSourceDir),
      // '~main': path.resolve(mainSourceDir),
      // '~renderer': path.resolve(rendererSourceDir),
      // '~common': path.resolve(commonSourceDir),
      // common: path.resolve(commonSourceDir),
      'react-dom': '@hot-loader/react-dom'
    },
  },
  node: {
    __dirname: true,
    __filename: true
  },  
  optimization: {
    nodeEnv: "development",
    namedModules: true,
    noEmitOnErrors: true
  },
  watchOptions: {
    ignored: ['dist/**/*.*']
  },
  plugins: [
    new WebpackBar(),
    new CleanWebpackPlugin() as any,
    new ForkTsCheckerWebpackPlugin(),
    new webpack.DefinePlugin({
      __static: JSON.stringify(path.resolve(staticSourceDir))
    }),
    // new WatchFilterPlugin(
    //   file =>
    //     file === commonSourceDir ||
    //     (isAncestor(file, commonSourceDir) &&
    //       (alienSourceDir != null && !file.startsWith(alienSourceDir))),
    //   require("debug")(`electron-webpack:watch-${type}`)
    // ),
    new webpack.EnvironmentPlugin({ NODE_ENV: "development" , DEBUG: true})
  ],
};
export default config;