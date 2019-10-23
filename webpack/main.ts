import path from "path";
import webpack from "webpack";
import common, { mainOutDir, mainSourceDir } from './common';
import { tsLoader } from "./loaders";




const config: webpack.Configuration = {
  ...common,
  target: "electron-main",
  entry: path.resolve(mainSourceDir, "main.ts"),
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
export default config;