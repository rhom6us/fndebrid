import { Action, AnyAction } from "redux";
import { app } from "electron";
import * as path from 'path';
import * as actionCreators from './actions';

interface IDispatch{
    (action: AnyAction):void;
}
export class ProtocolHandler {
    public static readonly protocol = 'magnet';
    public static findProtocolArg(argv:string[]): string | undefined {
        let matches = argv.filter(p => p.startsWith(`${ProtocolHandler.protocol}:`));
        if(matches.length > 1){
            throw new Error('multiple protocol matches found in argv. Don\'t know what to do...');
        }
        return matches[0];
    }
    constructor(private dispatch:IDispatch){

    }

    init(){
        let protocolUrl = ProtocolHandler.findProtocolArg(process.argv);
        if(protocolUrl){
            this.handle(protocolUrl);
        }

        const singleInstanceLock = app.requestSingleInstanceLock();
        if(!singleInstanceLock){
        // logger.info(`main: got the lock hence closing the new instance`, { gotTheLock });
            app.exit();
        } else {
        // logger.info(`main: Creating the first instance of the application`);
            app.on('second-instance', (_event, argv) => {
                let protocolUrl = ProtocolHandler.findProtocolArg(argv);
                if(protocolUrl){
                    this.handle(protocolUrl);
                } else {
                    // logger.info('second instance launched without a valid protocol url');
                }
                    
            });
        }
    }

    associate(){
        if (process.defaultApp) {
            if (process.argv.length >= 2) {
            app.setAsDefaultProtocolClient('magnet', process.execPath, [path.resolve(process.argv[process.argv.length-1])]);
            }
        } else {
            app.setAsDefaultProtocolClient('magnet');
        }
    }

    handle(url: string){
        this.dispatch(actionCreators.addMagnet(url));
    }
    

}