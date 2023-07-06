import webpack, { Compiler, Configuration, Stats, Watching } from 'webpack';
import WebpackDevServer, { addDevServerEntrypoints } from 'webpack-dev-server';
import cliLogger from './cliLogger';
import * as configs from './configs';
import { App, Command, Environment, staticSourceDir } from './configs/settings';

function validate(value: string[]): value is [Command, App, Environment] {
  const [command, app, mode] = value;
  return (
    ['fnbuild', 'fnwatch', 'fnserve'].includes(command) &&
    ['main', 'renderer'].includes(app) &&
    ['production', 'development'].includes(mode)
  );
}

function getCompiler(config: Configuration) {
  const compiler = webpack(config);
  if (config.watch) {
    compiler.hooks.watchRun.tap('WebpackInfo', compilation => {
      const compilationName = compilation.name ? compilation.name : '';
      cliLogger.info('Compilation ' + compilationName + ' starting…');
    });
  } else {
    compiler.hooks.beforeRun.tap('WebpackInfo', compilation => {
      const compilationName = compilation.name ? compilation.name : '';
      cliLogger.info('Compilation ' + compilationName + ' starting…');
    });
  }
  compiler.hooks.done.tap('WebpackInfo', (compilation: any) => {
    const compilationName = compilation.name ? compilation.name : '';
    cliLogger.info('Compilation ' + compilationName + ' finished');
  });
  return compiler;
}

export default function fndosomething(...args: [Command, string, string]) {
  if (validate(args)) {
    const [command, app, mode] = args;
    switch (command) {
      case 'fnbuild':
        compile({ ...configs[app], mode, watch: false });
        break;
      case 'fnwatch':
        compile({ ...configs[app], mode, watch: true });
        break;
      case 'fnserve':
        serve({ ...configs[app], mode, watch: true });
        break;
    }
  } else {
    throw new Error(
      `invalid command "([${process.execPath}] ${process.execArgv.join(' ')}) -- ${process.argv.join(' ')}"`,
    );
  }
}
export function compile(config: Configuration & { watch: false }): Compiler;
export function compile(config: Configuration & { watch: true }): Watching;
export function compile(config: Configuration) {
  const compiler = getCompiler(config);
  const callback = (err: any, stats: Stats) => {
    if (err) {
      process.stderr.write('\n\n');
      process.stderr.write(err.stack || err + '\n');
      if (!config.watch) {
        process.exit(1);
      }
      // console.error(err.stack || err);
      // if (err.details) {
      //   console.error(err.details);
      // }
      // return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      process.stderr.write('\n\n');
      process.stderr.write(info.errors + '\n');
    }

    // // if (stats.hasWarnings()) {
    // //   console.warn(info.warnings);
    // // }

    // console.log(
    //   stats.toString({
    //     assets: false,
    //     chunks: false, // Makes the build much quieter
    //     colors: true, // Shows colors in the console
    //   }),
    // );
  };

  if (config.watch) {
    return compiler.watch({}, callback);
  }

  compiler.run(callback);
  return compiler;
}

export function serve(config: Configuration & { watch: true }) {
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
      warnings: false,
      warningsFilter(warning) {
        const pattern = /export .* was not found in/i;
        return warning.split(/\r?\n/g).every(line => !pattern.test(line));
      },
      modules: false,
      timings: false,
      version: false,
      hash: false,
    },
  };
  addDevServerEntrypoints(config, devServerConfig);

  const server = new WebpackDevServer(getCompiler(config), devServerConfig);
  return server.listen(devServerConfig.port!, devServerConfig.host!, () => {
    // tslint:disable-next-line: no-console
    console.log(`Starting server on http://${devServerConfig.host}:${devServerConfig.port}`);
  });
}
