#!/usr/bin/env node
import webpack from 'webpack';
import config from './configs';

webpack(config, (err: any, stats) => {
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

  // // if (stats.hasWarnings()) {
  // //   console.warn(info.warnings);
  // // }

  console.log(
    stats.toString({
      assets: false,
      chunks: false, // Makes the build much quieter
      colors: true, // Shows colors in the console
    }),
  );
});
