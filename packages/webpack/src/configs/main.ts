import path from "path";
import webpack from "webpack";
import common, { mainOutDir, mainSourceDir } from './common';
import { tsLoader } from "./loaders";


console.log(`configuring main with a basepath of '${path.resolve('.')}'`);

export const mainConfig: webpack.Configuration = {
  ...common,
  target: "electron-main",
  entry: path.resolve(mainSourceDir, "index.ts"),
  output: {
    ...common.output,
    path: path.resolve(mainOutDir)
  },
  resolve: {
    ...common.resolve,
    extensions: [".js", ".ts", ".json", ".node"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        exclude: /node_modules\/(?!@fndebrid\b)/i,
        use: [tsLoader]
      }
    ]
  }
};