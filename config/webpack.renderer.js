const util = require('util');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const { cssLoader, postcssLoader, sassLoader, cssHotLoader, cssModuleLoader, cssHotModuleLoader, fontLoader, fileLoader } = require('./loaders');


const isDev = process.env.NODE_ENV === "development";

// module.exports = configuration;
module.exports = function (context) {
  context.plugins.push(new Dotenv());
  // Fix filename clash in MiniCssExtractPlugin
  context.plugins.forEach((plugin) => {
    if (plugin.constructor.name === "MiniCssExtractPlugin") {
      plugin.options.filename = '[id].styles.css';
      plugin.options.moduleFilename = (name) => {
        return '[id].styles.css';
      };
    }
  });

  const rules = context.module.rules.filter(rule => rule.test.test('global.scss'));

  const rule = rules[0];
  rule.test = /\b(global|vars)\.scss$/;
  rule.use = [...(isDev ? [cssHotLoader] : []), MiniCssExtractPlugin.loader, cssLoader, postcssLoader, sassLoader];
  context.module.rules.push({
    test: /\.scss$/,
    exclude: /\b(global|vars)\.scss$/,
    use: [
      cssHotModuleLoader,
      MiniCssExtractPlugin.loader,
      cssModuleLoader,
      postcssLoader,
      sassLoader
    ]
  });
  context.module.rules.push({
    test: /\.(ttf|eot|svg)$/,
    use: fileLoader
  });
  context.module.rules.push({
    test: /\.(woff|woff2)$/,
    use: fontLoader 
  })

  // context.entry.renderer = [`./src/renderer/index.tsx`];
  context.entry.renderer.unshift('react-hot-loader/patch');
  //addChunk(context, 'debug', 'debug.tsx', false);
  return context;
};
//


// function addChunk(configuration, entry, renderer, addHtmlFile) {
//   configuration.entry[entry] = [
//     "css-hot-loader/hotModuleReplacement",
//     `./src/renderer/${renderer}`
//   ]
//     ;

//   if (addHtmlFile) {
//     configuration.plugins.push(new HtmlWebpackPlugin({
//       "template": "!!html-loader?minimize=false&url=false!dist\\.renderer-index-template.html",
//       "filename": `${entry}.html`,
//       "hash": false,
//       "inject": true,
//       "compile": true,
//       "favicon": false,
//       "minify": false,
//       "cache": true,
//       "showErrors": true,
//       "chunks": [entry],
//       "excludeChunks": [],
//       "chunksSortMode": "auto",
//       "meta": {},
//       "title": `Chunk ${entry}`,
//       "xhtml": false,
//       "nodeModules": "node_modules"
//     }));
//   }
// }
