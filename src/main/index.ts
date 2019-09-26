
declare var __static: string;

import { app, BrowserWindow, dialog, Tray, Menu } from 'electron'
import * as path from 'path'
import { format as formatUrl } from 'url'

const isDevelopment = process.env.NODE_ENV !== 'production'

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let appIcon: Tray | null = null;
let mainWindow: BrowserWindow | null = null;
if (mainWindow) { }



if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('magnet', process.execPath, [path.resolve(process.argv[process.argv.length - 1])]);
  }
} else {
  app.setAsDefaultProtocolClient('magnet');
}


const singleInstanceLock = app.requestSingleInstanceLock();
if (!singleInstanceLock) {
  // logger.info(`main: got the lock hence closing the new instance`, { gotTheLock });
  app.exit();
} else {
  // logger.info(`main: Creating the first instance of the application`);
  app.on('second-instance', (_event, argv) => {
    showArray(argv);
  });
}


function createAppIcon() {
  appIcon = new Tray(path.join(__static, 'favicon-16x16.png'));
  appIcon.setToolTip('real-debrid.com in the tray.');
  appIcon.setContextMenu(
    Menu.buildFromTemplate([{
      label: 'Show Main Window',
      click: createMainWindow
    }, {
      label: 'Exit',
      click: () => app.exit()

    }])
  );
  return appIcon;
}

function createMainWindow() {
  const window = new BrowserWindow({ webPreferences: { nodeIntegration: true } });

  if (isDevelopment) {
    window.webContents.openDevTools();
  }

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  }
  else {
    window.loadURL(formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true,
    }));
  }

  window.on('closed', () => {
    mainWindow = null;
  })

  window.webContents.on('devtools-opened', () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    })
  })

  return window;
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
  showArray(process.argv);
  appIcon = createAppIcon();
})

function alert(message: string) {
  dialog.showMessageBox({ message });
}

function showArray(arr: string[]) {
  arr.forEach(alert);
}