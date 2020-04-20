import { Commands } from '@fndebrid/store';
import { commands as preferencesCommands } from './preferences-commands';
import { commands as realDebridCommands } from './real-debrid-commands';

export const commands: Commands = {
  preferences: preferencesCommands,
  realDebrid: realDebridCommands,
};
