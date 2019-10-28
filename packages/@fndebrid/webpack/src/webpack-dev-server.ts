#!/usr/bin/env node
import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './configs';
import { staticSourceDir } from './configs/settings';


const options: WebpackDevServer.Configuration = {
  contentBase: [
    staticSourceDir,
    // path.resolve(outDir, 'renderer-dll')
  ],
  host: 'localhost',
  port: 9080,
  hot: true,
  noInfo: true,
  open: false,
  overlay: true,
  inline: true,
  // clientLogLevel: "warning",
  stats: {
    colors: true,
    assets: false,
    entrypoints: false,
    warningsFilter: /export .* was not found in/,
    modules: false,
    timings: false,
    version: false,
    hash: false,
  },
  // before: function(app, server) {
  //   app.get('/some/path', function(req, res) {
  //     res.json({ custom: 'response' });
  //   });
  // },
  // after(app, server) {
  //   // do fancy stuff
  // }
};
WebpackDevServer.addDevServerEntrypoints(config, options);
const compiler = Webpack(config);
const server = new WebpackDevServer(compiler, options);

server.listen(options.port, options.host, () => {
  console.log(`Starting server on http://${options.host}:${options.port}`);
});
