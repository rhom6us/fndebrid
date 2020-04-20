import { isString } from '@fndebrid/core';
import { events, FnState } from '@fndebrid/store';
import { Commands } from '@fndebrid/store/preferences';
import { BrowserWindow, dialog } from 'electron';
import ProtocolHandler from '../ProtocolHandler';
import torrentFileHandler from '../torrent-file-associator';

// import { protocolHandler, torrentFileHandler } from '../../Application';


export const commands: Commands = {
  updatePreferences: (state, prefs) => events.preferences.preferencesUpdated(prefs),
  chooseDownloadLocation: async (state) => {
    const defaultPath = state.preferences.downloadLocation;
    const result = await dialog.showOpenDialog(BrowserWindow.getFocusedWindow()!, {
      defaultPath,
      properties: ['openDirectory'],
    });
    if (!result.canceled && result.filePaths && result.filePaths.length) {
      return events.preferences.preferencesUpdated({ downloadLocation: result.filePaths[0] });
    }
  },
  associateTorrentFiles: async (state, associateTorrentFiles) => {
    if (associateTorrentFiles && !state.preferences.torrentFilesAssociated) {
      await torrentFileHandler.associate();
    } else if (!associateTorrentFiles && state.preferences.torrentFilesAssociated) {
      await torrentFileHandler.disassociate();
    }
    return events.preferences.preferencesUpdated({ torrentFilesAssociated: await torrentFileHandler.isAssociated() });
  },
  associateMagnetLinks: async (state, associateMagnetLinks) => {
    const protocolHandler = new ProtocolHandler();
    if (associateMagnetLinks && !state.preferences.magnetLinksAssociated) {
      protocolHandler.associate();
    } else if (!associateMagnetLinks && state.preferences.magnetLinksAssociated) {
      protocolHandler.disassociate();
    }
    return events.preferences.preferencesUpdated({ magnetLinksAssociated: protocolHandler.isAssociated });
  },
};
