import { Store, Unsubscribe } from "redux";
import {alert, showArray} from './utils';

import { ipcMain, WebContents, webContents } from "electron";
let a: string;

interface Listener {
  (): void;
}
export class StoreHandler {
  // private listeners: Listener[] = [];
  private unsubscribeStore: Unsubscribe;
  private subscribers = new Set<string>();
  //private subscribers: [WebContents, string][] = [];
  constructor(private store: Store<any>) {
    this.unsubscribeStore = this.store.subscribe(() => this.notifyListeners());
    this.init();
  }
  notifyListeners() {
    Array.from(this.subscribers)
        .map(id => id.split('-').map(Number))
        .forEach(([weContentsId, frameId]) => {
          webContents.fromId(weContentsId).sendToFrame(frameId, 'store-update');
        });
  }
  init() {
    ipcMain.on('dispatch', (event, {action}) => {
      this.store.dispatch(action);
    });
    ipcMain.on('getState', (event, args) => {
      event.returnValue = this.store.getState();
    });
    ipcMain.on('getStateAsync', (event, {replyTo}) => {
      event.reply(`getStateAsync-${replyTo}`, this.store.getState());
    });
    ipcMain.on('subscribe', (event, [guid]: [string]) => {
      this.subscribers.add(`${event.sender.id}-${event.frameId}`);
    });

  }
  dispose() {
    this.unsubscribeStore();
  }
}
export default StoreHandler;    
