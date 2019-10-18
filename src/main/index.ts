import { app } from 'electron';
// import debug from 'electron-debug';
import Store from 'electron-store';
import * as path from 'path';
import { createAppIcon } from './app-icon';
import configureStore from './configureStore';
import { Dispatcher, getDispatcher } from './dispatcher';
import { DEBUG, deleteDir, installReactDevTools, isDev } from './utils';
import { showPreferences, showAddMagnet } from './windows';
import { MagnetLink } from './real-debrid';
if (isDev) {
  require('electron-reloader')(module, {path:path.resolve(".", "dist", "main"), ignore:"src", watchRenderer:false});
}
const storage = new Store();
console.log('main');
function appReady() { 
  console.log('app.ready');
  // installReactDevTools();

  createAppIcon();

  if (DEBUG) {
    showAddMagnet().then(link => console.log({link}));
    // showPreferences();
  }
}
function appSecondInstance(dispatcher: Dispatcher) {
  return function (_: any, argv: string[]) {
    const magnetLink = argv.filter(p => p.startsWith('magnet:'))[0] as MagnetLink;
    if (magnetLink) {
      dispatcher.addMagnet.request(magnetLink);
    }
  }
}
function appWindowAllClosed() {
  if (DEBUG) {
    // app.quit();
  }
}
function appWillQuit() {
  
}
function appBeforeQuit() {
  
}
function appQuit() {
  
}

const [store, dispatcher] = setupRedux();
function initializeApp(app: Electron.App) {
  if (!app.requestSingleInstanceLock()) {
    app.exit();
    return;
  } 
  
  app.on('ready', appReady)
  app.on('second-instance', appSecondInstance(dispatcher));
  app.on('window-all-closed', appWindowAllClosed)
  app.on('activate', createAppIcon);
  app.on('will-quit', appWillQuit);
  app.on('before-quit', appBeforeQuit)
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
  })
  // app.on('quit', () => {
  //   storage.set('state', store.getState());
  // });
  const dispatcher = getDispatcher(store);
  return [store, dispatcher] as [typeof store, typeof dispatcher];
}

initializeApp(app);