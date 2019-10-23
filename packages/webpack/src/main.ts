import webpack from 'webpack';
import path from 'path';
import { promisify } from 'util';
import { mainConfig, rendererConfig } from './configs';

const [, , mode, ...entries] = process.argv as [string, string, 'main' | 'renderer', ...string[]];

const compile = promisify(webpack);

const config = (() => {
  switch (mode) {
    case 'main':
      return mainConfig;
    case 'renderer':
      return rendererConfig;
    default:
      throw new Error(`Unknown config mode: '${mode}'`);
  }
})();

webpack(config, (err:any, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }

  console.log(stats.toString({
    chunks: false,  // Makes the build much quieter
    colors: true    // Shows colors in the console
  }));
})