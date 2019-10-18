import { ipcMain, WebContents, BrowserWindow } from 'electron';
import { StoreEnhancer } from 'redux';

export const proxyEnhancer: StoreEnhancer = createStore => {
  return (reducer, preloadedState) => {
    const store = createStore(reducer, preloadedState);
    const subscribers = new Set<WebContents>();

    store.subscribe(() => {
      Array.from(subscribers).forEach(webContents => webContents.send('store-update'));
    });

    ipcMain.on('dispatch', (event, { action }) => {
      event.returnValue = store.dispatch(action);
    });
    ipcMain.on('getState', event => {
      event.returnValue = store.getState();
    });
    ipcMain.on('subscribe', subscribeEvent => {
      subscribers.add(subscribeEvent.sender);
      BrowserWindow.fromWebContents(subscribeEvent.sender).on('close', closeEvent => {
        if (closeEvent.defaultPrevented) {
          return;
        }
        subscribers.delete(subscribeEvent.sender);
      })
    });

    return store;
  };
};
