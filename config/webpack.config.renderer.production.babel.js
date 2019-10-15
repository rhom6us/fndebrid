{
  context: 'C:\\dev\\fndebrid',
  devtool: 'nosources-source-map',
  externals: [
    '@blueprintjs/core',
    '@blueprintjs/icons',
    '@emotion/core',
    '@emotion/styled',
    'classnames',
    'devtron',
    'dotenv-webpack',
    'electron-devtools-installer',
    'electron-redux-proxy',
    'emotion-theming',
    'lodash',
    'normalize.css',
    'react-hot-loader',
    'react-router-static',
    'redux',
    'redux-saga',
    'source-map-support',
    'typesafe-actions',
    'uuid',
    'winreg',
    'electron',
    'webpack',
    'electron-devtools-installer'
  ],
  node: { __dirname: false, __filename: false },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    libraryTarget: 'commonjs2',
    path: 'C:\\dev\\fndebrid\\dist\\renderer'
  },
  target: 'electron-renderer',
  resolve: {
    alias: {
      '@': 'C:\\dev\\fndebrid\\src\\renderer',
      common: 'C:\\dev\\fndebrid\\src\\common'
    },
    extensions: [ '.js', '.ts', '.tsx', '.json', '.node', '.css' ]
  },
  module: {
    rules: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object]
    ]
  },
  plugins: [
    HtmlWebpackPlugin { options: [Object] },
    DefinePlugin { definitions: [Object] },
    MiniCssExtractPlugin { options: [Object] },
    LoaderOptionsPlugin { options: [Object] },
    WebpackRemoveOldAssetsPlugin { dllManifest: null }
  ],
  optimization: {
    nodeEnv: 'production',
    minimizer: [ [TerserPlugin] ],
    minimize: true,
    concatenateModules: true,
    noEmitOnErrors: true
  },
  mode: 'production',
  entry: { renderer: [ 'C:\\dev\\fndebrid\\src\\renderer\\index.tsx' ] }
}


{
  "context": "C:\\dev\\fndebrid",
  "devtool": "nosources-source-map",
  "externals": [
    "@blueprintjs/core",
    "@blueprintjs/icons",
    "@emotion/core",
    "@emotion/styled",
    "classnames",
    "devtron",
    "dotenv-webpack",
    "electron-devtools-installer",
    "electron-redux-proxy",
    "emotion-theming",
    "lodash",
    "normalize.css",
    "react-hot-loader",
    "react-router-static",
    "redux",
    "redux-saga",
    "source-map-support",
    "typesafe-actions",
    "uuid",
    "winreg",
    "electron",
    "webpack",
    "electron-devtools-installer"
  ],
  "node": { "__dirname": false, "__filename": false },
  "output": {
    "filename": "[name].js",
    "chunkFilename": "[name].bundle.js",
    "libraryTarget": "commonjs2",
    "path": "C:\\dev\\fndebrid\\dist\\renderer"
  },
  "target": "electron-renderer",
  "resolve": {
    "alias": {
      "@": "C:\\dev\\fndebrid\\src\\renderer",
      "common": "C:\\dev\\fndebrid\\src\\common"
    },
    "extensions": [".js", ".ts", ".tsx", ".json", ".node", ".css"]
  },
  "module": {
    "rules": [
      {
        "test": {},
        "exclude": {},
        "use": {
          "loader": "babel-loader",
          "options": {
            "presets": [
              [null, { "modules": false, "targets": { "electron": "6.0.12" } }]
            ],
            "plugins": [null, [null]]
          }
        }
      },
      { "test": {}, "use": "node-loader" },
      {
        "test": {},
        "use": [
          "C:\\dev\\fndebrid\\node_modules\\electron-webpack\\node_modules\\mini-css-extract-plugin\\dist\\loader.js",
          { "loader": "css-loader", "options": { "modules": "global" } }
        ]
      },
      {
        "test": {},
        "use": [
          "C:\\dev\\fndebrid\\node_modules\\electron-webpack\\node_modules\\mini-css-extract-plugin\\dist\\loader.js",
          { "loader": "css-loader", "options": { "modules": "global" } },
          "less-loader"
        ]
      },
      {
        "test": {},
        "use": [
          "C:\\dev\\fndebrid\\node_modules\\electron-webpack\\node_modules\\mini-css-extract-plugin\\dist\\loader.js",
          { "loader": "css-loader", "options": { "modules": "global" } },
          "sass-loader"
        ]
      },
      {
        "test": {},
        "use": {
          "loader": "url-loader",
          "options": { "limit": 10240, "name": "imgs/[name]--[folder].[ext]" }
        }
      },
      {
        "test": {},
        "loader": "url-loader",
        "options": { "limit": 10240, "name": "media/[name]--[folder].[ext]" }
      },
      {
        "test": {},
        "use": {
          "loader": "url-loader",
          "options": { "limit": 10240, "name": "fonts/[name]--[folder].[ext]" }
        }
      },
      { "test": {}, "use": { "loader": "html-loader" } },
      {
        "test": {},
        "exclude": {},
        "use": [
          {
            "loader": "ts-loader",
            "options": {
              "transpileOnly": false,
              "appendTsSuffixTo": [{}],
              "configFile": "C:\\dev\\fndebrid\\tsconfig.json"
            }
          }
        ]
      }
    ]
  },
  "plugins": [
    {
      "options": {
        "template": "!!html-loader?minimize=false&url=false!C:\\dev\\fndebrid\\dist\\.renderer-index-template.html",
        "filename": "index.html",
        "hash": false,
        "inject": true,
        "compile": true,
        "favicon": false,
        "minify": false,
        "cache": true,
        "showErrors": true,
        "chunks": "all",
        "excludeChunks": [],
        "chunksSortMode": "auto",
        "meta": {},
        "title": "Webpack App",
        "xhtml": false,
        "nodeModules": null
      }
    },
    { "definitions": { "__static": "process.resourcesPath + \"/static\"" } },
    {
      "options": {
        "filename": "styles.css",
        "chunkFilename": "[id].styles.css"
      }
    },
    { "options": { "minimize": true, "test": {} } },
    { "dllManifest": null }
  ],
  "optimization": {
    "nodeEnv": "production",
    "minimizer": [
      {
        "options": {
          "test": {},
          "extractComments": false,
          "sourceMap": true,
          "cache": false,
          "parallel": true,
          "terserOptions": { "output": { "comments": {} } }
        }
      }
    ],
    "minimize": true,
    "concatenateModules": true,
    "noEmitOnErrors": true
  },
  "mode": "production",
  "entry": { "renderer": ["C:\\dev\\fndebrid\\src\\renderer\\index.tsx"] }
}
