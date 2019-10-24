import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import webpack from 'webpack';
import { config } from './webpack.config.common';
import { fontRule, globalStylesheetRule, htmlRule, imageRule, nodeRule, stylesheetRile } from './rules';
import { staticSourceDir } from './settings';



export default <webpack.Configuration>{
  ...config,
  target: 'electron-renderer',
  entry: [
    'react-hot-loader/patch',
    ...config.entry as string[]
  ],
  resolve: {
    ...config.resolve,
    extensions: ['.tsx', '.css', '.scss']
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
      inject: true,
      // "compile": true,
      chunks: "all",
      // excludeChunks: [],
      // "nodeModules": "C:\\dev\\fndebrid\\node_modules"
    }),
    new MiniCssExtractPlugin({
      filename: '[id].styles.css',
      chunkFilename: '[id].styles.css',
      // moduleFilename: (name) => '[id].styles.css'
    }),
  ],
  devServer: {
    contentBase: [
      staticSourceDir,
      // path.resolve(outDir, 'renderer-dll')
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
  }

};