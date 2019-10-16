import { BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { format as formatUrl } from 'url';
import { isDev } from './utils';
import uuid from 'uuid';
import { FileId, TorrentId } from './real-debrid';


type WindowName = 'Main' | 'Preferences' | 'FileSelect';
export const windows: { [K in WindowName]?: BrowserWindow } = {};

const dialogs = new Set<BrowserWindow>();
function showDialog<T>(route: WindowName, options: any, query: any) {
  return new Promise<T>((resolve, reject) => {
    const callbackId = uuid();
    const window = new BrowserWindow({
      height: 400,
      width: 400,
      ...options,
      webPreferences: {
        ...options.webPreferences,
        nodeIntegration: true
      },
      frame: false,
      closable: true,
      skipTaskbar: true,
      autoHideMenuBar: true
    });
    dialogs.add(window);
    window.on('close', () => dialogs.delete(window));

  });
}
function createWindow(route: WindowName, options: Electron.BrowserWindowConstructorOptions & { devTools?: boolean } = { devTools: isDev }, query: Record<string, string | number | boolean> = {}) {
  if (windows[route]) {
    windows[route]!.focus();
    return windows[route];
  }
  const window = new BrowserWindow({
    webPreferences: { nodeIntegration: true },
    alwaysOnTop: true,
    ...options
  });

  if (options.devTools) {
    window.webContents.once('dom-ready', () => {
      window.webContents.openDevTools();
    })
  }

  if (isDev) {
    window.loadURL(`http://localhost:9080/?route=${route}`);
  }
  else {
    window.loadURL(formatUrl({
      // __dirname will be dist/main
      pathname: path.join(__dirname, '..', 'renderer', 'index.html'),
      query: { ...query, route },
      protocol: 'file',
      slashes: true,
    }));
  }

  window.on('closed', () => {
    delete windows[route];
  });

  return windows[route] = window;
}

export function showAddMagnet(): void {
  throw 'nyi';
}
export const showMain = () => createWindow('Main');
export const showPreferences = () => createWindow('Preferences', {
  alwaysOnTop: true,
  frame: true,
  autoHideMenuBar: true,
  resizable: true,
  closable: true,
  height: 750,
  width: 625
});
export const showFileSelect = (torrentId: TorrentId) => {
  return new Promise<FileId[] | null>((resolve, reject) => {
    const callbackId = uuid();
    const window = createWindow('FileSelect', {
      frame: false,
      closable: true,
      skipTaskbar: true,
      height: 400,
      width: 400,
      autoHideMenuBar: true
    }, { torrentId, callbackId });

    ipcMain.once(`return-${callbackId}`, (event, result: FileId[] | null | Error) => {
      if (result instanceof Error) {
        reject(result);
      } else {
        resolve(result);
      }
      
      window!.close();
    });


  })
}