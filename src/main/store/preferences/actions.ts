import { createAction, ActionType } from "typesafe-actions";
import State from './types';

export const setDownloadLocation = createAction('@@preferences/set-download-location', action => 
    (downloadLocation: string) => action({downloadLocation})
);
export const setPreferences = createAction('@@preferences/set-download-location', action => 
    (preferences: Partial<Omit<State, 'associateTorrentFiles' | 'associateMagnetLinks' | 'autoSelectFiles' | 'fileWhiteList' | 'fileBlackList'>>) => action(preferences)
);
export const associateMagnetLinks_request = createAction('@@preferences/associateMagnetLinks/request', action =>
    (associateMagnetLinks: boolean) => action({associateMagnetLinks})
);
export const associateMagnetLinks_complete = createAction('@@preferences/associateMagnetLinks/complete', action =>
    (associateMagnetLinks: boolean) => action({associateMagnetLinks})
);
export const associateTorrentFiles_request = createAction('@@preferences/associateTorrentFiles/request', action =>
    (associateTorrentFiles: boolean) => action({associateTorrentFiles})
);
export const associateTorrentFiles_complete = createAction('@@preferences/associateTorrentFiles/complete', action =>
    (associateTorrentFiles: boolean) => action({associateTorrentFiles})
);



type RootAction = ActionType<typeof import('./actions')>;
export default RootAction;