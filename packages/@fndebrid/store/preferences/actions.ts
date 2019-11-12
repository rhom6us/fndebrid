import {ActionType, createAction, createAsyncAction} from 'typesafe-actions';
import State from './state';

// import { createBetterAsyncAction as createAsyncAction } from "../better-async-creator";

export const chooseDownloadLocation = createAction('preferences/choose-download-location')();

export const setPreferences = createAction('preferences/set-preferences')<Partial<State>>();
export const whiteListFile = createAction('preferences/whitelist-file')<string>();
export const unWhiteListFile = createAction('preferences/un-whitelist-file')<string>();
export const blackListFile = createAction('preferences/blacklist-file')<string>();
export const unBlackListFile = createAction('preferences/un-blalist-file')<string>();

export const setAutoSelectFilesPattern = createAction('preferences/set-autoselect-files-pattern')<string>();
export const setAutoSelectFiles = createAction('preferences/set-autoselect-files')<'none' | 'all_files' | 'largest_files'>();
export const associateMagnetLinks = createAction('preferences/associate-magnet-links')<boolean>();
export const associateTorrentFiles = createAction('preferences/associate-torrent-files')<boolean>();
