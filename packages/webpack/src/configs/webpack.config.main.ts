import webpack from "webpack";
import { config } from './webpack.config.common';
import { typescriptRule } from './rules';

export default <webpack.Configuration>{
  ...config,
  target: "electron-main",
  stats: {
    warningsFilter: [
      /Can't resolve '(utf-8-validate|bufferutil)'/i,
      /export .* was not found in/i
    ],
  },
  module: {
    ...config.module,
    rules: [
      typescriptRule,
      ...config.module.rules
    ]
  }
};
