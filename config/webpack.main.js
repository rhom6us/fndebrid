
const Dotenv = require('dotenv-webpack');
//#region [isDev, isProd, buildType]
const [isDev, isProd, buildType] = (() => { 
  const envs = ['development', 'production']
  const env = process.env.NODE_ENV;
  if (!envs.some(p => p === env)) {
    throw new Error(`Unknown environment "${process.env.NODE_ENV}"`)
  }
  const [dev, prod] = envs;
  const isDev = env === dev;
  const isProd = env === prod;
  return [isDev, isProd, env];
})();
//#endregion

//#region [isMain, isRenderer, target]
const [isMain, isRenderer, target] = (() => { 
  return [true, false, 'main'];
  return [false, true, 'renderer'];
})();
//#endregion

const isDebug = !!process.env.DEBUG;

module.exports = function (context) {
  console.log(`=== webpack.config.${target}.${buildType}.babel.js ===`)
  console.log(context);
  console.log(JSON.stringify(context));
  console.log(`=== webpack.config.${target}.${buildType}.babel.js ===`)
  context.plugins.push(new Dotenv());
  
  return context;
};
