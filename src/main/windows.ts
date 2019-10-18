import { BrowserWindow, ipcMain, webFrame } from 'electron';
import path from 'path';
import { format as formatUrl } from 'url';
import { isDev } from './utils';
import uuid5 from 'uuid/v5';
import { FileId, TorrentId } from './real-debrid';
import uuid from 'uuid';
import { showWindow } from './file-selection';

declare global {
  interface Element {
    computedStyleMap(): CSSStyleDeclaration
  }
}
type WindowName = 'Main' | 'Preferences' | 'FileSelect' | 'AddMagnet';
export const windows: { [K in WindowName]?: BrowserWindow } = {};

const dialogs = new Set<BrowserWindow>();

ipcMain.on('please-resize', async (event, size: {width?:number, height?:number}) => {
  const win = BrowserWindow.fromWebContents(event.sender);
 
  const zoom = event.sender.getZoomFactor()
  const [contentX, contentY] = win.getContentSize();
  const x = size.width ? Math.floor(zoom * size.width) : contentX;
  const y = size.height ? Math.floor(zoom * size.height) : contentY;
  win.setContentSize(x, y, true);
})
function showDialog<T>(route: WindowName, options: Electron.BrowserWindowConstructorOptions & { devTools?: boolean } = { devTools: isDev }, query: any) {
  return new Promise<T>((resolve, reject) => {
    const callbackId = uuid5(`http://fndebrid.butler.software/${route}`, uuid5.URL);
    const window = new BrowserWindow({
      alwaysOnTop: true,
      ...options,
      webPreferences: { nodeIntegration: true },
      frame: false,
      closable: true,
      skipTaskbar: true,
      height: 156,
      width: 400,
      autoHideMenuBar: true,
      maximizable: false,
      minimizable: false,
      resizable: false,
      transparent: true,
      backgroundColor: "#00FF0000"
    });
    dialogs.add(window);
    if (options.devTools) {
      window.webContents.once('dom-ready', () => {
        window.webContents.openDevTools();
      })
    }
  
    if (isDev) {
      const search = new URLSearchParams({ ...query, route }).toString();
      console.log({ search });
      window.loadURL(`http://localhost:9080/?${search}`);
    }
    else {
      console.log(__dirname);
      window.loadURL(formatUrl({
        // __dirname will be dist/main
        pathname: path.join(__dirname, '..', 'renderer', 'index.html'),
        query: { ...query, route },
        protocol: 'file',
        slashes: true,
      }));
    }
   
    ipcMain.once(`dialog-result-${callbackId}`, (event, result) => {
      resolve(result);
      BrowserWindow.fromWebContents(event.sender).close();
    })
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
    const search = new URLSearchParams({ ...query, route }).toString();
    console.log({ search });
    window.loadURL(`http://localhost:9080/?${search}`);
  }
  else {
    console.log(__dirname);
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

export function showAddMagnet():Promise<string> {
  return showDialog<'cancel' | string>('AddMagnet', {
    height: 156,
    width: 400,
  }, {});
  // return new Promise<FileId[] | null>((resolve, reject) => {
  //   const callbackId = uuid();
  //   const window = showDialog('AddMagnet', {
  //   }, { callbackId });

  //   ipcMain.once(`return-${callbackId}`, (event, result: FileId[] | null | Error) => {
  //     if (result instanceof Error) {
  //       reject(result);
  //     } else {
  //       resolve(result);
  //     }

  //     window!.close();
  //   });


  // });
}
export const showMain = () => createWindow('Main');
export const showPreferences = () => createWindow('Preferences', {
  alwaysOnTop: false,
  frame: true,
  autoHideMenuBar: true,
  resizable: true,
  closable: true,
  height: 750,
  width: 625,
  useContentSize: true
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
      autoHideMenuBar: true,
      useContentSize: true,
    }, { torrentId, callbackId });
    ipcMain.once(`return-${callbackId}`, (event, result: FileId[] | null | Error) => {
      if (result instanceof Error) {
        reject(result);
      } else {
        resolve(result);
      }

      window!.close();
    });


  });
}