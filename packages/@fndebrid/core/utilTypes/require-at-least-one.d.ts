import { Except } from './except';

/**
 * Create a type that requires at least one of the given keys. The remaining keys are kept as is.
 * @example
 *
 * type Responder = {
 * 	text?: () => string;
 * 	json?: () => string;
 *
 * 	secure?: boolean;
 * };
 *
 * const responder: RequireAtLeastOne<Responder, 'text' | 'json'> = {
 * 	json: () => '{"message": "ok"}',
 * 	secure: true
 * };
 *
 */
export type RequireAtLeastOne<ObjectType, KeysType extends keyof ObjectType = keyof ObjectType> = {
  // For each Key in KeysType make a mapped type
  [Key in KeysType]: Required<Pick<ObjectType, Key>>; // …by picking that Key's type and making it required
}[KeysType] &
  // …then, make intersection types by adding the remaining keys to each mapped type.
  Except<ObjectType, KeysType>;
