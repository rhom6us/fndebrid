import { Action, AnyAction } from "redux";
import { app } from "electron";
import * as path from 'path';
import { addMagnet } from "./store/torrents";

interface IDispatch {
  (action: AnyAction): void;
}


export const protocol = 'magnet';
function findProtocolArg(argv: string[]): string | undefined {
  let matches = argv.reverse().filter(p => {
    try {
      return new URL(p).protocol == protocol;
    } catch (err) {
      return false;
    }
  });
  // let matches = argv.filter(p => p.startsWith(`${protocol}:`));
  if (matches.length > 1) {
    throw new Error('multiple protocol matches found in argv. Don\'t know what to do...');
  }
  return matches[0];
}


export default ProtocolHandler;
export class ProtocolHandler {
  constructor(private dispatch: IDispatch) {

    this.init();

    let protocolUrl = findProtocolArg(process.argv);
    if (protocolUrl) {
      this.handle(protocolUrl);
    }
  }

  init() {
    const singleInstanceLock = app.requestSingleInstanceLock();
    if (!singleInstanceLock) {
      // logger.info(`main: got the lock hence closing the new instance`, { gotTheLock });
      app.exit();
    } else {
      // logger.info(`main: Creating the first instance of the application`);
      app.on('second-instance', (_event, argv) => {
        let protocolUrl = findProtocolArg(argv);
        if (protocolUrl) {
          this.handle(protocolUrl);
        } else {
          // logger.info('second instance launched without a valid protocol url');
        }

      });
    }
  }
  get isAssociated() {
    if (process.defaultApp) {
      if (process.argv.length >= 2) {
        return app.isDefaultProtocolClient(protocol, process.execPath, [path.resolve(process.argv[process.argv.length - 1])]);
      }
    }
    return app.isDefaultProtocolClient(protocol);
  }
  associate() {
    if (process.defaultApp) {
      if (process.argv.length >= 2) {
        return app.setAsDefaultProtocolClient(protocol, process.execPath, [path.resolve(process.argv[process.argv.length - 1])]);
      }
    } else {
      return app.setAsDefaultProtocolClient(protocol);
    }
    return app.isDefaultProtocolClient(protocol);
  }
  disassociate() {
    if (process.defaultApp) {
      if (process.argv.length >= 2) {
        return app.removeAsDefaultProtocolClient(protocol, process.execPath, [path.resolve(process.argv[process.argv.length - 1])]);
      }
    } else {
      return app.removeAsDefaultProtocolClient(protocol);
    }
    return app.isDefaultProtocolClient(protocol);
  }
  handle(magnetLink: string) {
    this.dispatch(addMagnet.request({ magnetLink }));
  }


}