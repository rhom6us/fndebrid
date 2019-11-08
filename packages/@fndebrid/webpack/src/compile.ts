import webpack, {Compiler, Watching} from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import * as configs from './configs';
import {App, Command, Environment, staticSourceDir} from './configs/settings';

// tslint:disable: no-console
function validate(value: string[]): value is [Command, App, Environment] {
  const [command, app, mode] = value;
  return (
    ['fnbuild', 'fnwatch', 'fnserve'].includes(command) &&
    ['main', 'renderer'].includes(app) &&
    ['production', 'development'].includes(mode)
  );
}

export default function fndosomething(...args: [Command, string, string]) {
  if (validate(args)) {
    const [command, app, mode] = args;
    switch (command) {
      case 'fnbuild':
        compile({...configs[app], mode, watch: false});
        break;
      case 'fnwatch':
        compile({...configs[app], mode, watch: true});
        break;
      case 'fnserve':
        serve({...configs[app], mode, watch: false});
        break;
    }
  } else {
    console.error(
      `invalid command "([${process.execPath}] ${process.execArgv.join(' ')}) -- ${process.argv.join(' ')}"`,
    );
  }
}
export function compile(config: webpack.Configuration & {watch: false}): Compiler;
export function compile(config: webpack.Configuration & {watch: true}): Watching;
export function compile(config: webpack.Configuration) {
  return webpack(config, (err: any, stats) => {
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
}

export function serve(
  config: webpack.Configuration & {
    watch: false;
  },
) {
  const devServerConfig: WebpackDevServer.Configuration = {
    contentBase: [staticSourceDir],
    host: 'localhost',
    port: 9080,
    hot: true,
    noInfo: true,
    open: false,
    overlay: true,
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
  };
  WebpackDevServer.addDevServerEntrypoints(config, devServerConfig);
  const server = new WebpackDevServer(webpack(config), devServerConfig);
  return server.listen(devServerConfig.port, devServerConfig.host, () => {
    // tslint:disable-next-line: no-console
    console.log(`Starting server on http://${devServerConfig.host}:${devServerConfig.port}`);
  });
}
