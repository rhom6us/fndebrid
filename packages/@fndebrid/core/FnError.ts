import { isString } from 'util';
import { getInstanceTypeName } from './utils/type-check';
import { Ctor } from './utilTypes';

export class FnError extends Error {
  constructor(message?: string, public readonly data?: any) {
    super(`${message}${data ? ` (${JSON.stringify(data)})` : ''}`);
    this.name = new.target.name;

    // prior to es2015 (e.g. es5) the Error constructor broke the prototype chain, hence the following:
    if (!(this instanceof FnError)) {
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }
}

// tslint:disable: max-classes-per-file
export class OperationFailedError extends FnError {}
export class InvalidOperationError extends FnError {}
export class UnexpectedStateError extends FnError {}
export class ArgumentError extends FnError {
  constructor(public readonly name: string, message?: string, public readonly innerError?:any) {
    super(message);
  }
}
export class ArgumentFalsyError extends ArgumentError {
  constructor(public readonly name: string, message: string = `The value passed for "${name}" did not have a truthy value.`) {
    super(name, message);
  }
}
export class ArgumentNullOrUndefinedError extends ArgumentFalsyError {
  constructor(public readonly name: string, message: string = `The value passed for "${name}" was null or undefined.`) {
    super(name, message);
  }
}
export class ArgumentUndefinedError extends ArgumentNullOrUndefinedError {
  constructor(public readonly name: string, message: string = `The value passed for "${name}" was undefined.`) {
    super(name, message);
  }
}

export class ArgumentNullError extends ArgumentNullOrUndefinedError {
  constructor(public readonly name: string, message: string = `The value passed for "${name}" was null.`) {
    super(name, message);
  }
}

export class InvalidArgumentError extends ArgumentError {
  constructor(public readonly name: string, message: string = `The value passed for ${name} was not valid.`, innerError?:any) {
    super(name, message, innerError);
  }
}

export class ArgumentTypeError extends InvalidArgumentError {
  constructor(
    public readonly name: string,
    public readonly expectedType: string | Ctor,
    public readonly actualValue: any,
    message: string = `The value passed for ${name} was not of the expected type "${
      isString(expectedType) ? expectedType : getInstanceTypeName(expectedType)
    }".`
  ) {
    super(name, message);
  }
}
