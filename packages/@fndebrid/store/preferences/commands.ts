import { DeepPartial } from '@fndebrid/core';
import { CommandFn } from 'redux-command-pattern';
import { FnState } from '../';
import State from './state';

type FnCommand<T = undefined> = CommandFn<FnState, T>;
export type Commands = {
  updatePreferences: FnCommand<Partial<State>>;
  chooseDownloadLocation: FnCommand;
  associateTorrentFiles: FnCommand<{associated: boolean}>;
  associateMagnetLinks: FnCommand<{associated: boolean}>;
}
