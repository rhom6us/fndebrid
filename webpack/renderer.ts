import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import webpack from 'webpack';
import WatchFilterPlugin from 'webpack-match-plugin';
import { cssLoader, postcssLoader, sassLoader, cssHotLoader, cssModuleLoader, cssHotModuleLoader, fontLoader, fileLoader } from '../config/loaders';
import { spawn } from 'child_process';
function isAncestor(file: string, dir: string) {
  return file.length > dir.length && file[dir.length] === path.sep && file.startsWith(dir)
}
const isDev = process.env.NODE_ENV != 'production';
const commonSourceDir = 'src/common';

const staticSourceDir = 'static';
const outDir = 'dist';
const configurator = {
  type: 'renderer'
}
const sourceDir = path.join('src', "renderer");
const alienSourceDir = path.join('src', "main");

const config: webpack.Configuration = {
  mode: 'development',
  target: 'electron-renderer',
  devtool: 'eval-source-map',
  context: path.resolve('.'),
  entry: {
    renderer: [
      // 'css-hot-loader/hotModuleReplacement',
      'react-hot-loader/patch',
      path.resolve(sourceDir, 'index.tsx')
    ]
  },
  output: {
    filename: `[name]${isDev ? '' : '.[contenthash]'}.js`,
    chunkFilename: `[name]${isDev ? '' : '.[contenthash]'}.js`,
    path: path.resolve(outDir, configurator.type)
  },
  // externals: [
  //   'path',
  //   'util',
  //   'fs',
  //   'electron'
  // ],
  node: {
    __dirname: true,
    __filename: true
  },
  resolve: {
    alias: {
      '@': path.resolve(sourceDir),
      common: path.resolve(commonSourceDir),
      'react-dom': '@hot-loader/react-dom'
    },
    extensions: ['.js', '.ts', '.tsx', '.json', '.node', '.css']
  },
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            [
              "@babel/preset-env", {
                debug: isDev,
                modules: false,
                targets: {
                  electron: "6.0.12"
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
      test: /\b(global|vars)\.scss$/i,
      use: [
        ...(isDev ? [cssHotLoader] : []),
        MiniCssExtractPlugin.loader,
        cssLoader,
        postcssLoader,
        sassLoader]
    }, {
      test: /\.scss$/,
      exclude: /\b(global|vars)\.scss$/i,
      use: [
        ...(isDev ? [cssHotModuleLoader] : []),
        MiniCssExtractPlugin.loader,
        cssModuleLoader,
        postcssLoader,
        sassLoader
      ]
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
    new CleanWebpackPlugin() as any,
    new ForkTsCheckerWebpackPlugin(),
    ...(['renderer'].map(entry => new HtmlWebpackPlugin({
      title: "Webpack App",
      template: `!!html-loader?minimize=false&url=false!${path.resolve('src/renderer', 'template.html')}`,
      "filename": `${"index"}.html`,
      // "chunks": [entry],
      inject: true,
      // "compile": true,
      chunks: "all",
      // excludeChunks: [],
      // "nodeModules": "C:\\dev\\fndebrid\\node_modules"
    })))
    ,
    new MiniCssExtractPlugin({
      filename: '[id].styles.css',
      chunkFilename: '[id].styles.css',
      // moduleFilename: (name) => '[id].styles.css'
    }),
    new webpack.DefinePlugin({
      __static: JSON.stringify(path.resolve(staticSourceDir))
    }),
    // new WatchFilterPlugin(
    //   file => file === commonSourceDir || (isAncestor(file, commonSourceDir) && (alienSourceDir != null && !file.startsWith(alienSourceDir))),
    //   require("debug")(`electron-webpack:watch-${configurator.type}`)
    // ),
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' })
  ],
  devServer: {
    contentBase: [
      path.resolve(staticSourceDir),
      path.resolve(outDir, 'renderer-dll')
    ],
    host: 'localhost',
    port: 9080,
    hot: true,
    overlay: true,
    open: false,
    // before() {
    //   spawn(
    //     'electron',
    //     ['.'],
    //     { shell: true, env: process.env, stdio: 'inherit' }
    //   )
    //   .on('close', code => process.exit(0))
    //   .on('error', spawnError => console.error(spawnError))
    // }
  },
  optimization: {
    nodeEnv: 'development',
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
  }

};
export default config;