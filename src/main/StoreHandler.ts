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
    this.unsubscribeStore = this.store.subscribe(() => this.notifyListeners());
    this.init();
  }
  notifyListeners() {
    Array.from(this.subscribers)
        .forEach(webContents => {
          webContents.send('store-update');
        });
  }
  init() {
    ipcMain.on('dispatch', (event, {action}) => {
      event.returnValue = this.store.dispatch(action);
    });
    ipcMain.on('getState', (event, args) => {
      event.returnValue = this.store.getState();
    });
    ipcMain.on('getStateAsync', (event, {replyTo}) => {
      event.reply(`getStateAsync-${replyTo}`, this.store.getState());
    });
    ipcMain.on('subscribe', (event, [guid]: [string]) => {
      this.subscribers.add(event.sender);
    });

  }
  dispose() {
    this.unsubscribeStore();
  }
}
export default StoreHandler;    
