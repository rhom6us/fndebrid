import { Func } from "@rhombus-toolkit/func";
import { DeepDictionaryItem, restify, unrestify } from "@rhombus-toolkit/type-helpers";
import { CommandFnAny, CommandHandler, CommandMap, InferPayload as CommandPayload } from './create-command-handler';
import { StandardCommand } from './standard-command';


type CommandCreatorMap<T extends CommandMap, OverrideReturn = never> = {
  [K in keyof T]: CommandCreatorOrMap<T[K], OverrideReturn>;
};
type CommandCreatorOrMap<T extends DeepDictionaryItem<CommandFnAny>, OverrideReturn = never> =
  T extends CommandFnAny ? Func<[...payload:restify<CommandPayload<T>>], OverrideReturn extends never ? StandardCommand<CommandPayload<T>> : OverrideReturn> :
  T extends Record<string, any> ? CommandCreatorMap<T, OverrideReturn> :
  never;
const defaultFn = function () { } as any;

/**
 * This function takes a map of command implementations and returns a maching map
 * of command creator functions.
 *
 * It also optionally accepts an invoker to auto-invoke commands as they are created.
 *
 * @returns \{[command-name]: (payload) => handler(new StandardCommand(command-name, payload))\}
 */
export const getCommands: {
  <T extends CommandMap>(): CommandCreatorOrMap<T>;
  <T extends CommandMap>(handler: CommandHandler<T>): CommandCreatorOrMap<T, void>;
} =

  function _getCommands<T extends CommandMap>(invoker?: CommandHandler<T>, type?: string): CommandCreatorMap<T> {
    return new Proxy(defaultFn, {
      get(target, prop) {
        const ns = [type, prop].filter(Boolean).join('.');
        return _getCommands<T>(invoker, ns);
      },
      apply(target, thisArg, payload:any) {
        if (!type) {
          throw new Error('Cannot invoke the root command map object');
        }
        const cmd: StandardCommand<CommandPayload<T>> = {
          type,
          payload: unrestify(payload)
        };
        invoker?.(cmd);
        return cmd;
      },
    }) as CommandCreatorMap<T>;
  };
