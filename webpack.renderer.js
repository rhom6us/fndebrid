const util = require('util');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');

function addChunk(configuration, entry, renderer, addHtmlFile) {
  configuration.entry[entry] = [
    "css-hot-loader/hotModuleReplacement",
    `./src/renderer/${renderer}`
  ]
    ;

  if (addHtmlFile) {
    configuration.plugins.push(new HtmlWebpackPlugin({
      "template": "!!html-loader?minimize=false&url=false!dist\\.renderer-index-template.html",
      "filename": `${entry}.html`,
      "hash": false,
      "inject": true,
      "compile": true,
      "favicon": false,
      "minify": false,
      "cache": true,
      "showErrors": true,
      "chunks": [entry],
      "excludeChunks": [],
      "chunksSortMode": "auto",
      "meta": {},
      "title": `Chunk ${entry}`,
      "xhtml": false,
      "nodeModules": "node_modules"
    }));
  }
}



// addChunk("theme", "theme.ts", false);
// addChunk("app", "index.tsx", true);
// addChunk("login", "login.tsx", true);

// module.exports = configuration;
module.exports = function (context) {
  // Fix filename clash in MiniCssExtractPlugin
  context.plugins.forEach((plugin) => {
    if (plugin.constructor.name === "MiniCssExtractPlugin") {
      plugin.options.filename = '[id].styles.css';
      plugin.options.moduleFilename = (name) => {
        return '[id].styles.css';
      };
    }
  });

  // context.plugins.push(
  //   new CspHtmlWebpackPlugin({
  //     "default-src": "'self'",
  //     "script-src": ["'self'", "'unsafe-eval'"]
  //   })
  // );
  
// const isDev = process.env.NODE_ENV === "development";

// const cssModuleLoader = {
//   loader: "css-loader",
//   options: {
//     importLoaders: 2,
//     modules: true,
//     camelCase: true,
//     sourceMap: isDev,
//     localIdentName: isDev
//       ? "[folder]__[name]__[local]__[hash:base64:5]"
//       : "[hash:base64:5]"
//   }
// };

// const cssLoader = {
//   loader: "css-loader",
//   options: {
//     importLoaders: 2,
//     modules: false,
//     sourceMap: isDev
//   }
// };
//   const sassLoader = {
//     loader: "sass-loader",
//     options: {
//       sourceMap: isDev
//     }
//   };
//   const miniCssExtractLoader = {
//     loader: MiniCssExtractPlugin.loader,
//     options: {
//       publicPath: '/'
//     }
//   }
//   const rules = context.module.rules.filter(rule => rule.test.test('global.scss'));
//   console.log(JSON.stringify(rules));
//   const rule = rules[0];
//   // rule.use = [...rule.use.slice(0, rule.use.length - 1), 'postcss-loader', ...rule.use.slice(rule.use.length - 1)];
//   rule.use = ["css-hot-loader", miniCssExtractLoader, cssLoader, 'postcss-loader', sassLoader];
//   context.module.rules.push( {
//     test: /\.(ttf|eot|svg)$/,
//     use: {
//       loader: 'file-loader',
//       options: {
//         name: 'fonts/[hash].[ext]'
//       }
//     }
//   });
//   context.module.rules.push(
//   {
//   test: /\.(woff|woff2)$/,
//   use: {
//     loader: 'url-loader',
//     options: {
//       name: 'fonts/[hash].[ext]',
//       limit: 5000,
//       mimetype: 'application/font-woff'
//     }
//   }
// })
  // context.entry.renderer = [`./src/renderer/index.tsx`];
  // console.log(JSON.stringify(rule));

  // Add entrypoint for second renderer
  //context.entry.secondRenderer = ['./src/renderer/second-renderer.js'];
  //addChunk(context, 'debug', 'debug.tsx', false);
  // console.log('\n\n\n\n\n', util.inspect(context, {colors:true}),'\n\n\n\n\n\n;')
  // console.log('\n\n\n\n\n', JSON.stringify(context),'\n\n\n\n\n\n;')
  return context;
};
//