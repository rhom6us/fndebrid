import { CleanWebpackPlugin } from "clean-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import path from "path";
import webpack from "webpack";
import WatchFilterPlugin from "webpack-match-plugin";
import { tsLoader } from "../config/loaders";

const sourceDir = "src/main";
const commonSourceDir = "src/common";
const staticSourceDir = "static";
const outDir = "dist";
const type = "main";

const isDev = process.env.NODE_ENV != 'production';
function isAncestor(file:string, dir:string) {
  return file.length > dir.length && file[dir.length] === path.sep && file.startsWith(dir)
}

const config: webpack.Configuration = {
  mode: "development",
  target: "electron-main",
  devtool: 'eval-source-map',
  context: path.resolve('.'),
  entry: path.resolve(sourceDir, "index.ts"),
  output: {
    filename: `[name]${isDev ? "" : ".[contenthash]"}.js`,
    chunkFilename: `[name]${isDev ? "" : ".[contenthash]"}.js`,
    path: path.resolve(outDir, type)
  },
  stats: {
    warnings: false
  },
  resolve: {
    alias: {
      "@": path.resolve(sourceDir),
      common: path.resolve(commonSourceDir)
    },
    extensions: [".js", ".ts", ".json", ".node"]
  },
  node: {
    __dirname: true,
    __filename: true
  },  
  optimization: {
    nodeEnv: "development",
    namedModules: true,
    noEmitOnErrors: true
  },
  watchOptions: {
    ignored: ['dist/**/*.*', 'node_modules']
  },
  plugins: [
    new CleanWebpackPlugin() as any,
    new ForkTsCheckerWebpackPlugin(),
    new webpack.DefinePlugin({
      __static: JSON.stringify(path.resolve(staticSourceDir))
    }),
    // new WatchFilterPlugin(
    //   file =>
    //     file === commonSourceDir ||
    //     (isAncestor(file, commonSourceDir) &&
    //       (alienSourceDir != null && !file.startsWith(alienSourceDir))),
    //   require("debug")(`electron-webpack:watch-${type}`)
    // ),
    new webpack.EnvironmentPlugin({ NODE_ENV: "development" , DEBUG: true})
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules|renderer)/,
        use: [tsLoader]
      }
    ]
  }
};
export default config;