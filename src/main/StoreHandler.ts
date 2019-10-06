import { Store, Unsubscribe } from "redux";
import {alert, showArray} from './utils';

import { ipcMain, WebContents } from "electron";
let a: string;

interface Listener {
  (): void;
}
export class StoreHandler {
  // private listeners: Listener[] = [];
  private unsubscribeStore: Unsubscribe;
  private subscribers = new Set<WebContents>();
  //private subscribers: [WebContents, string][] = [];
  constructor(private store: Store<any>) {
    this.unsubscribeStore = this.store.subscribe(() => {
      
      this.notifyListeners()});
    this.init();
  }
  notifyListeners() {
    this.subscribers.forEach(webContents => {
      webContents.send('store-update');
    })
    // this.listeners.forEach(p => p());
    // subscribers.forEach(([webContents, guid]) => webContents.send(`subscription-${guid}`));
  }
  init() {
    ipcMain.on('dispatch', (event, action) => {
      event.returnValue = this.store.dispatch(action);
    });
    ipcMain.on('getState', (event, args) => {
      event.returnValue = this.store.getState();
    });
    ipcMain.on('subscribe', (event, [guid]: [string]) => {
      this.subscribers.add(event.sender);
      // this.listeners.push(() => {
      //   event.reply(`subscription-${guid}`)
      // });
      // this.subscribers.push([event.sender, guid]);
    });

  }
  dispose() {
    this.unsubscribeStore();
  }
}
export default StoreHandler;    
