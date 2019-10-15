import path from 'path';

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
  return [true, false, 'main'];
  return [false, true, 'renderer'];
})();
//#endregion

const outDir = 'dist';
const srcDir = 'src'
const commonDir = 'common';

export default {
  context: path.resolve('__dirname'),
  devtool: 'nosources-source-map',
  node: { __dirname: false, __filename: false },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, outDir, target)
  },
  target: 'electron-main',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, srcDir, target),
      common: path.resolve(__dirname, srcDir, commonDir)
    },
    extensions: [ '.js', '.ts', '.tsx', '.json', '.node' ]
  },
  module: {
    rules: [
      {
        "test": {},
        "exclude": {},
        "use": {
          "loader": "babel-loader",
          "options": {
            "presets": [
              [null, { "modules": false, "targets": { "node": "10.2.0" } }]
            ],
            "plugins": [null, [null]]
          }
        }
      },
      { "test": {}, "use": "node-loader" },
      {
        "test": {},
        "use": [
          {
            "loader": "url-loader",
            "options": {
              "limit": 10485760,
              "name": "imgs/[name]--[folder].[ext]"
            }
          }
        ]
      },
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
  plugins: [
    new LoaderOptionsPlugin({ "minimize": true, "test": {} }),
    new WebpackRemoveOldAssetsPlugin ({ dllManifest: null }),
    new DefinePlugin({
      __static: "process.resourcesPath + \"/static\""
    }),
    new BannerPlugin ({
      "banner": "require(\"source-map-support/source-map-support.js\").install();",
      "test": {},
      "raw": true,
      "entryOnly": true
    })
  ],
  optimization: {
    nodeEnv: 'production',
    minimizer: [new TerserPlugin({
      test: {},
      extractComments: false,
      sourceMap: true,
      cache: false,
      parallel: true,
      terserOptions: { output: { comments: {} } }
    }) ],
    minimize: true,
    concatenateModules: true,
    noEmitOnErrors: true
  },
  mode: 'production',
  entry: {
    main: [path.resolve(srcDir, target, 'index.ts')]
  }
}

  