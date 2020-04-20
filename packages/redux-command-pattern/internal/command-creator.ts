import { CommandFnAny, InferPayload } from './command-fn';
import { StandardCommand } from './standard-command';
import { DeepDictionary, DeepDictionaryItem, Restify, unrestify } from './utils';

export type CommandCreator<TCommandFn extends CommandFnAny> = (...payload: Restify<InferPayload<TCommandFn>>) => StandardCommand<InferPayload<TCommandFn>>;


type CommandCreatorMap<TCommandFnMap extends DeepDictionary<CommandFnAny>> = {
  [K in keyof TCommandFnMap]: CommandCreatorOrMap<TCommandFnMap[K]>;
};
type CommandCreatorOrMap<TCommandFnOrMap extends DeepDictionaryItem<CommandFnAny>> = TCommandFnOrMap extends CommandFnAny
  ? CommandCreator<TCommandFnOrMap>
  : TCommandFnOrMap extends DeepDictionary<CommandFnAny>
  ? CommandCreatorMap<TCommandFnOrMap>
  : never;
type CommandInvoker = (command: StandardCommand<any>) => void;
  // tslint:disable-next-line: no-empty
function defaultFn() { }
function _getCommandCreator<T extends DeepDictionaryItem<CommandFnAny>>(invoker: CommandInvoker, type?: string): CommandCreatorOrMap<T> {
  return new Proxy(defaultFn, {
    get(target, prop, receiver) {
      const ns = [type, prop].filter(Boolean).join('.');
      return _getCommandCreator<T>(invoker, ns);
    },
    apply(target, thisArg, payload) {
      if (!type) {
        throw new Error('Cannot invoke the root command map object');
      }
      const cmd = {
        type,
        payload: unrestify(payload)

      };
      invoker(cmd);
      return cmd;
    },
  }) as CommandCreatorOrMap<T>;
}

export const getCommandCreator: <T extends DeepDictionaryItem<CommandFnAny>>(invoker:CommandInvoker) => CommandCreatorOrMap<T> = _getCommandCreator;
