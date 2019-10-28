import path from 'path';
import {format as formatUrl} from 'url';
import {BrowserWindow} from 'electron';
import {isDev} from '@fndebrid/core';

let window: BrowserWindow | undefined;
const route = 'FileSelect';
export function showWindow() {
  if (window) {
    window.focus();
    return;
  }
  window = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    frame: false,
    width: 600,
    height: 600,
    resizable: false,
    alwaysOnTop: true,
    fullscreenable: false,
    skipTaskbar: true,
  });

  window.on('close', () => {
    window = undefined;
  });

  if (isDev) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}/?route=${route}`);
  } else {
    window.loadURL(
      formatUrl({
        pathname: path.join(__dirname, 'index.html'),
        query: {route},
        protocol: 'file',
        slashes: true,
      }),
    );
  }
}
