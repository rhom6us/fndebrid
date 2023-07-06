import { getCommandCreator } from '@fndebrid/store';
import { ipcRenderer } from 'electron';
import { identity } from 'lodash';
import { useMemo } from 'react';

const commands = getCommandCreator(ipcRenderer.send.bind(ipcRenderer, 'command'));
export type Commands = typeof commands;

// export const CommandContext = createContext<Commands>(commands);
export function useCommand<TCommands>(selector: (cmds: Commands) => TCommands = identity): TCommands {
  return useMemo(() => selector(commands), []);
}
// export const CommandProvider: FC = ({ children }) => {
//   return <CommandContext.Provider value={commands}>
//     {children}
//   </CommandContext.Provider>
// }
``;
