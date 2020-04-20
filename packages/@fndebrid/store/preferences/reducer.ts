import { DeepPartial } from '@fndebrid/core';
import { ReducerFn } from 'redux-command-pattern';
import { FnState } from '../';
import State, { FileGlob } from './state';

type FnReducer<T extends any> = ReducerFn<FnState, T>;
export const preferencesUpdated: FnReducer<Partial<State>> = (state, payload) => ({
  ...state,
  preferences: {
    ...state.preferences,
    ...(payload as any),
  },
});
export const autoSelectFilesPatternUpdated: ReducerFn<FnState, FileGlob[]> = (state, pattern) => preferencesUpdated(state, {
  autoSelectFiles: {
    ...state.preferences.autoSelectFiles as any,
    type: 'pattern+',
    pattern,
  }
});

// export const autoSelectFilesSet: FnReducer<['none' | 'all_files' | 'largest_files']> = (state, autoSelectFiles) => {
//   const { autoSelectFilesPattern, ...preferences } = { ...state.preferences, autoSelectFiles };
//   return {
//     ...state,
//     preferences: without('autoSelectFilesPattern', {
//       ...state.preferences,
//       autoSelectFiles
//     })
//   };
// };

function without<TSource, TProp extends keyof TSource>(prop: TProp, source: TSource): Omit<TSource, TProp>{
  const { [prop]: deleted, ...result } = source;
  return result;
}
