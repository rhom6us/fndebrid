const util = require('util');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const { cssLoader, postcssLoader, sassLoader, cssHotLoader, cssModuleLoader, cssHotModuleLoader, fontLoader, fileLoader } = require('./loaders');


//#region [isDev, isProd, buildType]
const [isDev, isProd, buildType] = (() => { 
  const envs = ['development', 'production']
  const env = process.env.NODE_ENV;
  if (!envs.some(p => p === env)) {
    throw new Error(`Unknown environment "${process.env.NODE_ENV}"`)
  }
  const [dev, prod] = envs;
  const isDev = env === dev;
  const isProd = env === prod;
  return [isDev, isProd, env];
})();
//#endregion

//#region [isMain, isRenderer, target]
const [isMain, isRenderer, target] = (() => { 
  return [false, true, 'renderer'];
})();
//#endregion

// module.exports = configuration;
module.exports = function (context) {
  console.log(`=== webpack.config.${target}.${buildType}.babel.js ===`)
  console.log(context);
  console.log(JSON.stringify(context));
  console.log(`=== webpack.config.${target}.${buildType}.babel.js ===`)
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
  if (isDev) {
    context.entry.renderer.unshift('react-hot-loader/patch');
  }
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
