import webpack from "webpack";
import { config } from './webpack.config.common';

export default <webpack.Configuration>{
  ...config,
  target: "electron-main"
};