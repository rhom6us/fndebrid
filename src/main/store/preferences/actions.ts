import { createAction, ActionType, createAsyncAction } from "typesafe-actions";
import State from './state';
import {AsyncActionCreator, createBetterAsyncAction} from '../better-async-creator';
// import { createBetterAsyncAction as createAsyncAction } from "../better-async-creator";

export const chooseDownloadLocation = createAction(  'preferences/choose-download-location/request', action =>
  () => action()
);
  
export const setPreferences = createAction('preferences/set-preferences', action =>
(preferences: Partial<Omit<State, 'associateTorrentFiles' | 'associateMagnetLinks' | 'autoSelectFiles' | 'fileWhiteList' | 'fileBlackList'>>) => action(preferences)
);
export const whiteListFile = createAction('preferences/whitelist-file', action =>
  (file: string) => action({file})
);
export const unWhiteListFile = createAction('preferences/un-whitelist-file', action =>
  (file: string) => action({file})
);
export const blackListFile = createAction('preferences/blacklist-file', action =>
  (file: string) => action({file})
);
export const unBlackListFile = createAction('preferences/un-blalist-file', action =>
  (file: string) => action({file})
);

export const setAutoSelectFilesPattern = createAction('preferences/set-autoselect-files', action =>
  (autoSelectFilesPattern: string) => action({autoSelectFilesPattern})
);
export const setAutoSelectFiles = createAction('preferences/set-autoselect-files', action =>
  (autoSelectFiles: 'none' | 'all_files' | 'largest_files') => action({autoSelectFiles})
);

export const associateMagnetLinks = createAsyncAction(
  'preferences/associate-magnet-links/request',
  'preferences/associate-magnet-links/success',
  'preferences/associate-magnet-links/failure',
)<{associateMagnetLinks: boolean}, {magnetLinksAssociated: boolean}, undefined>();


export const associateTorrentFiles = createAsyncAction(
  'preferences/associate-torrent-files/request',
  'preferences/associate-torrent-files/success',
  'preferences/associate-torrent-files/failure'
)<boolean, boolean, undefined>();


type RootAction = ActionType<typeof import('./actions')>;
export default RootAction;