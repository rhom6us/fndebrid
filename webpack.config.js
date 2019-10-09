const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {WatchFilterPlugin} = require('webpack-match-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

function isAncestor(file, dir) {
  return file.length > dir.length && file[dir.length] === path.sep && file.startsWith(dir)
}

const commonSourceDir = 'src/common';

const staticSourceDir = 'static';
const outDir = 'dist';
const configurator = {
  type: 'renderer'
}
const sourceDir = path.join('src', configurator.type === "main" ? "main" : "renderer");;
const alienSourceDir = path.join('src', configurator.type === "main" ? "renderer" : "main");

module.exports = {
  mode: 'development',
  entry: {
    renderer: [
      // 'css-hot-loader/hotModuleReplacement',
      path.resolve(sourceDir, 'index.tsx')
    ]
  },
  context: path.resolve(__dirname),
  devtool: 'eval-source-map',
  // externals: [
  //   '@emotion/core',
  //   '@emotion/styled',
  //   'emotion-theming',
  //   'lodash',
  //   'react-router-static',
  //   'redux',
  //   'redux-electron-store',
  //   'redux-saga',
  //   'source-map-support',
  //   'typesafe-actions',
  //   'uuid',
  //   'electron',
  //   'webpack',
  //   'electron-devtools-installer'
  // ],
  node: {
    __dirname: true,
    __filename: true
  },
  output: {
    filename: `[name]${process.env.NODE_ENV === 'production' ? '.[contenthash]' : ''}.js`,
    chunkFilename: `[name]${process.env.NODE_ENV === 'production' ? '.[contenthash]' : ''}.js`,
    path: path.resolve(outDir, configurator.type)
  },
  target: 'electron-renderer',
  resolve: {
    alias: {
      '@': path.resolve(sourceDir),
      common: path.resolve(commonSourceDir)
    },
    extensions: ['.js', '.ts', '.tsx', '.json', '.node', '.css']
  },
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components|webpack-match-plugin)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            [
              "@babel/preset-env", {
                modules: false,
                targets: {
                  electron: "6.0.11"
                }
              }
            ]
          ],
        }
      }
    }, {
      test: /\.node$/,
      use: "node-loader"
    }, {
      test: /\.s?[ac]ss$/,
      use: [
        {
          loader: process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          options: {
            // publicPath: '../', // You can specify a publicPath here. By default it uses publicPath in webpackOptions.output
            hmr: process.env.NODE_ENV === 'development',
          },
        },
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ],
    }, {
      test: /\.(png|jpg|gif)$/i,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: "imgs/[name]--[folder].[ext]"
        },
      }]
    }, {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 10240,
          name: "fonts/[name]--[folder].[ext]"
        }
      }
    }, {
      test: /\.(html)$/,
      use: ['html-loader']
    }, {
      test: /\.tsx?$/,
      exclude: /(node_modules|webpack-match-plugin)/,
      use: [{
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        }
      }]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Webpack App",
      template: `!!html-loader?minimize=false&url=false!${path.resolve('dist', '.renderer-index-template.html')}`,
      // "compile": true,
      chunks: "all",
      excludeChunks: [],
      // "nodeModules": "C:\\dev\\fndebrid\\node_modules"
    }),
    new MiniCssExtractPlugin({
      filename: '[id].styles.css',
      chunkFilename: '[id].styles.css',
      moduleFilename: (name) => '[id].styles.css'
    }),
    new webpack.DefinePlugin({
      __static: JSON.stringify(path.resolve(staticSourceDir))
    }),
    new webpack.HotModuleReplacementPlugin(),
    new WatchFilterPlugin(
      file => file === commonSourceDir || (isAncestor(file, commonSourceDir) && (alienSourceDir != null && !file.startsWith(alienSourceDir))),
      require("debug")(`electron-webpack:watch-${configurator.type}`)
    ),
    new webpack.EnvironmentPlugin({NODE_ENV: 'development'})
  ],
  devServer: {
    contentBase: [
      path.resolve(staticSourceDir),
      path.resolve(outDir, 'renderer-dll')
    ],
    host: 'localhost',
    port: '9080',
    hot: true,
    overlay: true
  },
  optimization: {
    nodeEnv: 'development',
    namedModules: true,
    noEmitOnErrors: true,

    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  }

}