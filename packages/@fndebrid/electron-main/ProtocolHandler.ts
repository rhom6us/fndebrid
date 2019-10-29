import {app} from 'electron';
import path from 'path';
import {Associator} from './Associator';
import {InvalidOperationError} from '@fndebrid/core';

export class ProtocolHandler extends Associator {
  constructor(private protocol: string = 'magnet') {
    super();
  }
  private appArgs(): [string, (string | undefined), (string[] | undefined)] {
    if (process.defaultApp && process.argv.length >= 2) {
      const switches = process.argv.filter(p => p.startsWith('-'));
      const pathArgs = process.argv
        .filter(p => !p.startsWith('-'))
        .filter(p => path.resolve(p) != path.resolve(process.execPath));
      if (pathArgs.length != 1) {
        throw new InvalidOperationError("Encountered args that I don't know what to do with", pathArgs);
      }
      const args = [...switches, pathArgs[0]];
      return [this.protocol, path.resolve(process.execPath), args];
    }
    return [this.protocol, undefined, undefined];
  }
  get isAssociated() {
    const args = this.appArgs();
    return app.isDefaultProtocolClient(...args);
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
