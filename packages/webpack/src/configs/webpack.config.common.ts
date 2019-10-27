import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
import WebpackBar from 'webpackbar';
import { typescriptRule } from './rules';
import { isDev, mode, outDir, sourceDir, staticSourceDir, watch, app } from './settings';


export const config: webpack.Configuration = {
  mode,
  devtool: 'cheap-module-eval-source-map',//'eval-source-map',
  context: sourceDir,
  entry: {
    [app]: path.join(sourceDir, 'index.ts')
  },
  watch,
  output: {
    path: outDir,
    filename: `[name]${isDev ? "" : ".[contenthash]"}.js`,
    chunkFilename: `[name]${isDev ? "" : ".[contenthash]"}.js`,
  },
  stats: {
    warnings: false,
    warningsFilter: /export .* was not found in/
  },
  resolve: {
    alias: {
      // '@': path.resolve(rendererSourceDir),
      // '~main': path.resolve(mainSourceDir),
      // '~renderer': path.resolve(rendererSourceDir),
      // '~common': path.resolve(commonSourceDir),
      // common: path.resolve(commonSourceDir),
      'react-dom': '@hot-loader/react-dom'
    },
    extensions: ['.js', ".ts", ".json", ".node"]
  },
  node: {
    __dirname: true,
    __filename: true
  },
  optimization: {
    nodeEnv: "development",
    namedModules: true,
    noEmitOnErrors: true,
    // moduleIds: 'hashed',
    // runtimeChunk: 'single',
    // splitChunks: {
    //   cacheGroups: {
    //     vendor: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name: 'vendor',
    //       chunks: 'all',
    //     },
    //   },
    // },
  },
  plugins: [
    new WebpackBar(),
    // new CleanWebpackPlugin() as any,
    new ForkTsCheckerWebpackPlugin({
      // silent: true
    }),
    new webpack.DefinePlugin({
      __static: JSON.stringify(staticSourceDir)
    }),
    new webpack.EnvironmentPlugin({ NODE_ENV: "development", DEBUG: true })
  ],
  module: {
    rules: [
      //typescriptRule
    ]
  },
};
