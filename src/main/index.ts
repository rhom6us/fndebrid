

import { app, BrowserWindow, dialog, Tray, Menu, MenuItem } from 'electron'
import * as path from 'path'
import { format as formatUrl } from 'url'
import configureStore from './configureStore';
import StoreHandler from './StoreHandler';
import { alert, killElectronWebpackDevServer, showArray } from './utils';
import dispatcher from './dispatcher';
// import * as myApp from './Application';
const isDevelopment = process.env.NODE_ENV !== 'production'

let appIcon: Tray | undefined;
const windows: { [route: string]: BrowserWindow } = {};

// if (process.defaultApp) {
//   if (process.argv.length >= 2) {
//     app.setAsDefaultProtocolClient('magnet', process.execPath, [path.resolve(process.argv[process.argv.length - 1])]);
//   }
// } else {
//   app.setAsDefaultProtocolClient('magnet');
// }


const store = configureStore();
const handler = new StoreHandler(store);
const singleInstanceLock = app.requestSingleInstanceLock();
if (!singleInstanceLock) {
  // logger.info(`main: got the lock hence closing the new instance`, { gotTheLock });
  app.exit();
} else {
  // logger.info(`main: Creating the first instance of the application`);
  app.on('second-instance', (_event, argv) => {
    const magnetLink = argv.filter(p => p.startsWith('magnet:'))[0];
    if(magnetLink){
      
      store.dispatch(dispatcher.addMagnet.request({ magnetLink }));
    }
  });
}
function createAppIcon() {
  appIcon = new Tray(path.join(__static, 'favicon-16x16.png'));
  appIcon.setToolTip('real-debrid.com in the tray.');
  appIcon.setContextMenu(
    Menu.buildFromTemplate([{
      label: 'Show Main Window',
      click: () => createWindow('Main')
    }, {
      label: 'Show Debug Window',
      click: () => createWindow('Debug')
    }, {
      label: 'Preferences',
      click: () => createWindow('Preferences')
    }, {
      label: 'Quit',
      click: () => app.quit()
    }])
  );
  return appIcon;
}

function createWindow(route: string, devTools: boolean = isDevelopment): void {
  if (windows[route]) {
    return windows[route].focus();
  }
  const window = new BrowserWindow({ webPreferences: { nodeIntegration: true } });

  if (devTools) {
    window.webContents.openDevTools();
  }

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}/?route=${route}`);
  }
  else {
    window.loadURL(formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      query: { route },
      protocol: 'file',
      slashes: true,
    }));
  }

  window.on('closed', () => {
    delete windows[route];
  });

  windows[route] = window;
}


app.on('window-all-closed', () => {
  // without this empty handler the app will default to quitting.
})

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (appIcon === null) {
    appIcon = createAppIcon();
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  // showArray(process.argv);
  alert(process.argv0);
  appIcon = createAppIcon();
})
// app.on('quit', async (e) => {
//   if (isDevelopment) {
//     await killElectronWebpackDevServer();
//     console.log('XXXXXXXXXXX killed like a motherfucker XXXXXXXXXXXXXXXX');
//   }
// });
