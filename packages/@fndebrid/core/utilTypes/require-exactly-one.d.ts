/**
 * Create a type that requires exactly one of the given keys and disallows more. The remaining keys are kept as is.
 *
 * Use-cases:
 * - Creating interfaces for components that only need one of the keys to display properly.
 * - Declaring generic keys in a single place for a single use-case that gets narrowed down via `RequireExactlyOne`.
 * @example
 * type Responder = {
 * 	text: () => string;
 * 	json: () => string;
 * 	secure: boolean;
 * };
 *
 * const responder: RequireExactlyOne<Responder, 'text' | 'json'> = {
 * 	// Adding a `text` key here would cause a compile error.
 *
 * 	json: () => '{"message": "ok"}',
 * 	secure: true
 * };
 *
 */

export type RequireExactlyOne<ObjectType, KeysType extends keyof ObjectType = keyof ObjectType> = {
  [Key in KeysType]: Required<Pick<ObjectType, Key>> & Partial<Record<Exclude<KeysType, Key>, never>>;
}[KeysType] &
  Omit<ObjectType, KeysType>;
