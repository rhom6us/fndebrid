import { Store, Unsubscribe } from "redux";

import { ipcMain } from "electron";

interface Listener {
  (): void;
}
export class StoreHandler {
  private listeners: Listener[] = [];
  private unsubscribeStore: Unsubscribe;
  //private subscribers: [WebContents, string][] = [];
  constructor(private store: Store<any>) {
    this.unsubscribeStore = this.store.subscribe(() => this.notifyListeners());
    this.init();
  }
  notifyListeners() {
    this.listeners.forEach(p => p());
    // subscribers.forEach(([webContents, guid]) => webContents.send(`subscription-${guid}`));
  }
  init() {
    ipcMain.on('dispatch', (event, [action]) => {
      event.returnValue = this.store.dispatch(action);
    });
    ipcMain.on('getState', (event, args) => {
      event.returnValue = this.store.getState();
    });
    ipcMain.on('subscribe', (event, [guid]: [string]) => {
      this.listeners.push(() => event.reply(`subscription-${guid}`));
      // this.subscribers.push([event.sender, guid]);
    });

  }
  dispose() {
    this.unsubscribeStore();
  }
}
export default StoreHandler;    
