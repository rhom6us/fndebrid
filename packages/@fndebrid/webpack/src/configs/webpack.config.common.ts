import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
import WebpackBar from 'webpackbar';
import {typescriptRule} from './rules';
import {isDev, outDir, sourceDir, staticSourceDir} from './settings';

export default {
  devtool: isDev ? 'cheap-module-eval-source-map' : undefined, // 'eval-source-map',
  context: sourceDir,
  entry: path.join(sourceDir, 'index.ts'),
  output: {
    path: outDir,
    filename: `[name]${isDev ? '' : '.[contenthash]'}.js`,
    chunkFilename: `[name]${isDev ? '' : '.[contenthash]'}.js`,
  },
  stats: {
    warnings: false,
    warningsFilter: /export .* was not found in/,
  },
  resolve: {
    alias: {
      // '@': path.resolve(rendererSourceDir),
      // '~main': path.resolve(mainSourceDir),
      // '~renderer': path.resolve(rendererSourceDir),
      // '~common': path.resolve(commonSourceDir),
      // common: path.resolve(commonSourceDir),
      'react-dom': '@hot-loader/react-dom',
    },
    extensions: ['.js', '.ts', '.json', '.node'],
  },
  node: {
    __dirname: true,
    __filename: true,
  },
  optimization: {
    nodeEnv: process.env.NODE_ENV,
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
    ...(isDev
      ? [
          new WebpackBar(),
          new ForkTsCheckerWebpackPlugin({
            // silent: true
          }),
        ]
      : []),
    // new CleanWebpackPlugin() as any,

    new webpack.DefinePlugin({
      __static: JSON.stringify(staticSourceDir),
    }),
    new webpack.EnvironmentPlugin({NODE_ENV: 'development'}),
  ],
  module: {
    rules: [
      // typescriptRule
    ],
  },
} as webpack.Configuration;
