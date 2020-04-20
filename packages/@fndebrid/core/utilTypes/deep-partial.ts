import { Primitive } from './primitive';

/**
 * Create a type from another type with all keys and nested keys set to optional.
 *
 * Use-cases:
 * - Merging a default settings/config object with another object, the second object would be a deep partial of the default object.
 * - Mocking and testing complex entities, where populating an entire object with its keys would be redundant in terms of the mock or test.
 *
 * @example
 *
 * const settings: Settings = {
 * 	textEditor: {
 * 		fontSize: 14;
 * 		fontColor: '#000000';
 * 		fontWeight: 400;
 * 	}
 * 	autocomplete: false;
 * 	autosave: true;
 * };
 *
 * const applySavedSettings = (savedSettings: DeepPartial<Settings>) => {
 * 	return {...settings, ...savedSettings};
 * }
 *
 * settings = applySavedSettings({textEditor: {fontWeight: 500}});
 */
export type DeepPartial<T> =
  T extends Primitive ? Partial<T>
  : T extends Map<infer KeyType, infer ValueType> ? DeepPartialMap<KeyType, ValueType>
  : T extends Set<infer ItemType> ? DeepPartialSet<ItemType>
  : T extends ReadonlyMap<infer KeyType, infer ValueType> ? DeepPartialReadonlyMap<KeyType, ValueType>
  : T extends ReadonlySet<infer ItemType> ? DeepPartialReadonlySet<ItemType>
  : T extends (...args: any[]) => unknown ? T | undefined
  : T extends object ? DeepPartialObject<T>
  : unknown;

/**
 * Same as `DeepPartial`, but accepts only `Map`s and  as inputs. Internal helper for `DeepPartial`.
 */
interface DeepPartialMap<KeyType, ValueType> extends Map<DeepPartial<KeyType>, DeepPartial<ValueType>> {}

/**
 * Same as `DeepPartial`, but accepts only `Set`s as inputs. Internal helper for `DeepPartial`.
 */
interface DeepPartialSet<T> extends Set<DeepPartial<T>> {}

/**
 * Same as `DeepPartial`, but accepts only `ReadonlyMap`s as inputs. Internal helper for `DeepPartial`.
 */
interface DeepPartialReadonlyMap<KeyType, ValueType> extends ReadonlyMap<DeepPartial<KeyType>, DeepPartial<ValueType>> {}

/**
 * Same as `DeepPartial`, but accepts only `ReadonlySet`s as inputs. Internal helper for `DeepPartial`.
 */
interface DeepPartialReadonlySet<T> extends ReadonlySet<DeepPartial<T>> {}

/**
 * Same as {@link DeepPartial}, but accepts only `object`s as inputs. Internal helper for `DeepPartial`.
 */
type DeepPartialObject<ObjectType extends object> = {
  [KeyType in keyof ObjectType]?: DeepPartial<ObjectType[KeyType]>;
};
