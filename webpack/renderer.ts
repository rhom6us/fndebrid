import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import webpack from 'webpack';
import common, { isDev, outDir, rendererOutDir, rendererSourceDir, staticSourceDir } from './common';
import { cssHotLoader, cssHotModuleLoader, cssLoader, cssModuleLoader, fontLoader, imageLoader, jsLoader, postcssLoader, sassLoader, tsLoader } from './loaders';




const config: webpack.Configuration = {
  ...common,
  target: 'electron-renderer',
  entry: {
    renderer: [
      // 'css-hot-loader/hotModuleReplacement',
      'react-hot-loader/patch',
      path.resolve(rendererSourceDir, 'renderer.ts')
    ]
  },
  output: {
    ...common.output,
    path: path.resolve(rendererOutDir)
  },
  // externals: [
  //   'path',
  //   'util',
  //   'fs',
  //   'electron'
  // ],

  resolve: {
    ...common.resolve,
    extensions: ['.js', '.ts', '.tsx', '.json', '.node', '.css', '.scss']
  },
  module: {
    rules: [/*{
      test: /\.m?js$/i,
      exclude: /node_modules\/(?!@fndebrid\b)/i,
      use: jsLoader
    },*/ {
      test: /\.node$/i,
      use: "node-loader"
    }, {
      test: /\b(global|vars)\.s?css$/i,
      use: [
        ...(isDev ? [cssHotLoader] : []),
        MiniCssExtractPlugin.loader,
        cssLoader,
        postcssLoader,
        sassLoader]
    }, {
      test: /\.s?css$/i,
      exclude: /\b(global|vars)\.s?css$/i,
      use: [
        ...(isDev ? [cssHotModuleLoader] : []),
        MiniCssExtractPlugin.loader,
        cssModuleLoader,
        postcssLoader,
        sassLoader
      ]
    }, {
      test: /\.(png|jpg|gif)$/i,
      use: [imageLoader]
    }, {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
      use: [fontLoader]
    }, {
      test: /\.(html)$/i,
      use: ['html-loader']
    }, {
      test: /\.tsx?$/,
      exclude: /node_modules\/(?!@fndebrid\b)/i,
      use: [tsLoader]
    }]
  },
  plugins: [
    ...common.plugins!,
    ...(['renderer'].map(entry => new HtmlWebpackPlugin({
      title: "Webpack App",
      // template: `!!html-loader?minimize=false&url=false!${path.resolve(rendererSourceDir, 'template.html')}`,
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
    noInfo: true,
    stats: 'minimal'
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
    ...common.optimization,

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