import fs from 'fs';
import { Action, AnyAction } from "redux";
import { app } from "electron";
import path from 'path';
import { addMagnet } from "./store/torrents";

import { Dispatcher, dispatcher } from './dispatcher';
import { Associator } from './Associator';
import { Memoize } from '../common';
interface IDispatch {
  (action: AnyAction): void;
}




export class ProtocolHandler extends Associator {
  constructor(private protocol: string = 'magnet'){
    super();
  }
  private appArgs(): [string, (string|undefined), (string[]|undefined)] {
    if (process.defaultApp && process.argv.length >=2) {
      return [this.protocol, path.resolve(process.execPath), process.argv.slice(1).filter(p => !p.startsWith(this.protocol))];
    }
    return [this.protocol, undefined, undefined];
  }
  get isAssociated() {
    const args = this.appArgs();
    return app.isDefaultProtocolClient.apply(app, args);
  }
  protected _associate() {
    const args = this.appArgs();
    app.setAsDefaultProtocolClient.apply(app, args);
  }
  protected _disassociate() {
    app.removeAsDefaultProtocolClient.apply(app, this.appArgs());
  }



}

export default ProtocolHandler;