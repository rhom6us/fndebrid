import {DEBUG, isDev} from '@fndebrid/core';
import {MagnetLink} from '@fndebrid/real-debrid';
import {FnDispatcher, getDispatcher} from '@fndebrid/store';
import {jobId} from '@fndebrid/store/real-debrid';
import {app} from 'electron';
// import debug from 'electron-debug';
import Store from 'electron-store';
import fs from 'fs';
import path from 'path';
import {createAppIcon} from './app-icon';
import configureStore from './configureStore';
import {showAddMagnet, showTorrents} from './windows';

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
  createAppIcon();

  if (isDev) {
    showTorrents();
  }
}
function appSecondInstance(dispatcher: FnDispatcher) {
  return (_: any, argv: string[]) => {
    const magnetLink = argv.filter(p => p.startsWith('magnet:'))[0] as MagnetLink;
    if (magnetLink) {
      dispatcher.realDebrid.addMagnet.request([magnetLink, jobId(magnetLink)]);
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
const [store, dispatcher] = setupRedux();
function initializeApp(app: Electron.App) {
  if (!app.requestSingleInstanceLock()) {
    app.exit();
    return;
  }

  app.on('ready', appReady);
  app.on('second-instance', appSecondInstance(dispatcher));
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
  store.subscribe(() => {
    setImmediate(state => storage.set('state', state), store.getState());
  });
  // app.on('quit', () => {
  //   storage.set('state', store.getState());
  // });
  const dispatcher = getDispatcher(store);
  return [store, dispatcher] as [typeof store, typeof dispatcher];
}

initializeApp(app);
