
const postcssPresetEnv = require('postcss-preset-env');
const postcssImport = require('postcss-import');

const isDev = process.env.NODE_ENV === "development";
module.exports = {
  cssModuleLoader: {
    loader: "css-loader",
    options: {
      importLoaders: 2,
      modules: true,
      import: true,
      sourceMap: isDev
    }
  },
  cssHotLoader: {
    loader: 'css-hot-loader'
  },
  cssHotModuleLoader: {
    loader: "css-hot-loader",
    options: {
      cssModule: true
    }
  },
  cssLoader: {
    loader: "css-loader",
    options: {
      importLoaders: 2,
      modules: false,
      sourceMap: isDev
    }
  },
  sassLoader: {
    loader: "sass-loader",
    options: {
      sourceMap: isDev
    }
  },
  postcssLoader: {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      sourceMap: isDev,
      plugins: () => [postcssImport(), postcssPresetEnv()],
    }
  },
  fileLoader: {
    loader: "file-loader?name=[name]__[hash:base64:5].[ext]"
  },
  threadLoader: {
    loader: 'thread-loader'
  },
  babelLoader: {
    loader: "babel-loader",
    options: {
      cacheDirectory: true
    }
  },
  electronMainBabelLoader: {
    loader: 'babel-loader',
    options: {
      presets: [
        [ "@babel/preset-env", {
          debug: isDev,
          modules: false,
          targets: {
            electron: "6.0.12"
          }
        }]
      ],
    }
  },
  fontLoader: {
    loader: 'url-loader',
    options: {
      name: 'fonts/[hash].[ext]',
      limit: 5000,
      mimetype: 'application/font-woff'
    }
  },
  tsLoader: {
    loader: "ts-loader",
    options: {
      transpileOnly: true,
      // appendTsSuffixTo: [{}],
      // configFile: "C:\\dev\\fndebrid\\tsconfig.json"
    }
  }
}
