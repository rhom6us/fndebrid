import { createAction, ActionType, createAsyncAction } from "typesafe-actions";
import State from './state';
import { AsyncActionCreator, createBetterAsyncAction } from '../better-async-creator';
// import { createBetterAsyncAction as createAsyncAction } from "../better-async-creator";

export const chooseDownloadLocation = createAction('preferences/choose-download-location', action =>
  () => action()
);

export const setPreferences = createAction('preferences/set-preferences', action =>
  (preferences: Partial<State>) => action(preferences)
);
export const whiteListFile = createAction('preferences/whitelist-file', action =>
  (file: string) => action({ file })
);
export const unWhiteListFile = createAction('preferences/un-whitelist-file', action =>
  (file: string) => action({ file })
);
export const blackListFile = createAction('preferences/blacklist-file', action =>
  (file: string) => action({ file })
);
export const unBlackListFile = createAction('preferences/un-blalist-file', action =>
  (file: string) => action({ file })
);

export const setAutoSelectFilesPattern = createAction('preferences/set-autoselect-files', action =>
  (autoSelectFilesPattern: string) => action({ autoSelectFilesPattern })
);
export const setAutoSelectFiles = createAction('preferences/set-autoselect-files', action =>
  (autoSelectFiles: 'none' | 'all_files' | 'largest_files') => action({ autoSelectFiles })
);
export const associateMagnetLinks = createAction('preferences/associate-magnet-links', action =>
  (associate: boolean) => action(associate)
);
export const associateTorrentFiles = createAction('preferences/associate-torrent-files', action =>
  (associate: boolean) => action(associate)
);



