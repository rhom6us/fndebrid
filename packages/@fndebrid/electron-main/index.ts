import { DEBUG, isDev, tuple } from '@fndebrid/core';
import { MagnetLink } from '@fndebrid/real-debrid';
import { createCommandHandler, getCommandCreator } from '@fndebrid/store';
import { jobId } from '@fndebrid/store/real-debrid';
import { app, ipcMain } from 'electron';
// import debug from 'electron-debug';
import Store from 'electron-store';
import fs from 'fs';
import path from 'path';
import { setTimeout } from 'timers';
import { createAppIcon } from './app-icon';
import { commands as cmdImpl } from './commands';
import configureStore from './configureStore';
import { showTorrents } from './windows';

if (isDev || DEBUG) {
  const programPath = path.resolve(process.argv.filter(p => p.endsWith('main.js'))[0]);
  fs.watchFile(programPath, {}, () => {
    app.relaunch({
      execPath: process.argv[0],
      args: process.argv.slice(1),
    });
    app.quit();
  });
}
const storage = new Store();

function appReady() {
  ipcMain.on('command', (event, cmd) => commandHandler(cmd));
  createAppIcon();

  if (isDev) {
    showTorrents();
  }
}
function appSecondInstance(cmd: typeof commands) {
  return (_: any, argv: string[]) => {
    const magnetLink = argv.filter(p => p.startsWith('magnet:'))[0] as MagnetLink;
    if (magnetLink) {
      cmd.realDebrid.addMagnet(magnetLink, jobId(magnetLink));
    }
  };
}
function appWindowAllClosed() {
  if (DEBUG) {
    // app.quit();
  }
}
// tslint:disable: no-empty
function appWillQuit() {}
function appBeforeQuit() {}
function appQuit() {}
// tslint:enable: no-empty
const [store, commandHandler, commands] = setupRedux();
function initializeApp(app: Electron.App) {
  if (!app.requestSingleInstanceLock()) {
    app.exit();
    return;
  }

  app.on('ready', appReady);
  app.on('second-instance', appSecondInstance(commands));
  app.on('window-all-closed', appWindowAllClosed);
  app.on('activate', createAppIcon);
  app.on('will-quit', appWillQuit);
  app.on('before-quit', appBeforeQuit);
  app.on('quit', appQuit);
}
// (async () => {
//   const appStartedOk = await Promise.race([
//     (async () => {
//       await app.whenReady();
//       return true;
//     })(),
//     (async () => {
//       await sleep(10000);
//       return false;
//     })()
//   ]);

//   if (appStartedOk) {
//     return;
//   }
//   console.log('Things don\'t seem to be starting, time to clear AppData');
//   app.relaunch();
//   const appData = path.join(app.getPath('userData'), 'extensions');
//   await deleteDir(appData);

//   app.exit();
// })();

function setupRedux() {
  const initialState = storage.get('state');
  const store = configureStore(initialState);
  let token: NodeJS.Timeout | undefined;
  store.subscribe(() => {
    token =
      token ||
      setTimeout(() => {
        storage.set('state', store.getState());
        token = undefined;
      }, 5000);

    // setImmediate(state => storage.set('state', state), store.getState());
  });
  app.on('quit', () => {
    storage.set('state', store.getState());
  });
  const commandHandler = createCommandHandler(store, cmdImpl);
  const commandInvoker = getCommandCreator(commandHandler);
  return tuple(store, commandHandler, commandInvoker);
}

initializeApp(app);
