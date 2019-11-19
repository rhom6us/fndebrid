import { isDev } from '@fndebrid/core';
import { FileId, TorrentId } from '@fndebrid/real-debrid';
import { BrowserWindow, ipcMain, webFrame } from 'electron';
import path from 'path';
import { format as formatUrl, URLSearchParams } from 'url';
import uuid5 from 'uuid/v5';
import { showWindow } from './file-selection';

type WindowName = 'Main' | 'Preferences' | 'AddTorrent' | 'Torrents';
export const windows: { [K in WindowName]?: BrowserWindow } = {};

const dialogs = new Set<BrowserWindow>();

ipcMain.on('please-resize', async (event, size: { width?: number; height?: number }) => {
  const win = BrowserWindow.fromWebContents(event.sender);

  const zoom = event.sender.zoomFactor;
  const [contentX, contentY] = win.getContentSize();
  const x = size.width ? Math.floor(zoom * size.width) : contentX;
  const y = size.height ? Math.floor(zoom * size.height) : contentY;
  win.setContentSize(x, y, true);
});
function showDialog<T>(
  route: WindowName,
  options: Electron.BrowserWindowConstructorOptions & { devTools?: boolean } = { devTools: isDev },
  query: any,
) {
  return new Promise<T>((resolve, reject) => {
    const callbackId = uuid5(`http://fndebrid.butler.software/${route}`, uuid5.URL);
    const window = new BrowserWindow({
      show: false,
      alwaysOnTop: true,
      frame: false,
      closable: true,
      skipTaskbar: true,
      autoHideMenuBar: true,
      maximizable: false,
      useContentSize: true,
      minimizable: false,
      resizable: false,
      transparent: false,
      backgroundColor: '#00FF0000',
      ...options,
      webPreferences: {
        nodeIntegration: true,
        ...options.webPreferences,
      },
    });
    dialogs.add(window);
    window.once('ready-to-show', () => {
      window.show();
    });
    if (options.devTools) {
      window.webContents.once('dom-ready', () => {
        window.webContents.openDevTools();
      });
    }

    if (isDev) {
      const search = new URLSearchParams({ ...query, route }).toString();
      window.loadURL(`http://localhost:9080/?${search}`);
    } else {
      console.log(__dirname);
      window.loadURL(
        formatUrl({
          // __dirname will be dist/main
          pathname: path.join(__dirname, '..', 'renderer', 'index.html'),
          query: { ...query, route },
          protocol: 'file',
          slashes: true,
        }),
      );
    }

    ipcMain.once(`dialog-result-${callbackId}`, (event, result) => {
      if (result instanceof Error) {
        reject(result);
      }
      resolve(result);
      BrowserWindow.fromWebContents(event.sender).close();
    });
    window.on('close', () => {
      resolve();
      dialogs.delete(window);
    });
  });
}
function createWindow(
  route: WindowName,
  options: Electron.BrowserWindowConstructorOptions & { devTools?: boolean } = { devTools: isDev },
  query: Record<string, string | number | boolean> = {},
) {
  if (windows[route]) {
    windows[route]!.focus();
    return windows[route];
  }

  const window = new BrowserWindow({
    show: false,
    webPreferences: { nodeIntegration: true },
    alwaysOnTop: true,
    ...options,
  });
  window.once('ready-to-show', () => {
    window.show();
  });
  if (options.devTools) {
    window.webContents.once('dom-ready', () => {
      window.webContents.openDevTools();
    });
  }

  if (isDev) {
    const search = new URLSearchParams({ ...query, route }).toString();
    console.log({ search });
    window.loadURL(`http://localhost:9080/?${search}`);
  } else {
    console.log(__dirname);
    window.loadURL(
      formatUrl({
        // __dirname will be dist/main
        pathname: path.join(__dirname, '..', 'renderer', 'index.html'),
        query: { ...query, route },
        protocol: 'file',
        slashes: true,
      }),
    );
  }
  window.on('closed', () => {
    delete windows[route];
  });

  return (windows[route] = window);
}

export function showAddMagnet() {
  return showDialog<string>(
    'AddTorrent',
    {
      height: 156 / 0.8,
      width: 400 / 0.8,
      skipTaskbar: false,
      alwaysOnTop: false,
      resizable: true,
    },
    {},
  );
}
export const showMain = () => createWindow('Main');
export const showTorrents = () =>
  createWindow('Torrents', {
    alwaysOnTop: false,
    resizable: true,
    height: 600,
    width: 400,
  });
export const showPreferences = () =>
  createWindow('Preferences', {
    alwaysOnTop: false,
    frame: true,
    autoHideMenuBar: true,
    resizable: true,
    closable: true,
    height: 750,
    width: 625,
    useContentSize: true,
  });
export const showFileSelect = (torrentId: TorrentId) => {
  showDialog(
    'AddTorrent',
    {
      height: 400,
      width: 400,
    },
    { torrentId },
  );
};
