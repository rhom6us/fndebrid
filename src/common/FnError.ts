import { isString } from 'util';
import { getInstanceTypeName } from '~common/utils';
import { Ctor } from '~common';

export class FnError extends Error {
  constructor(message?: string, public readonly data?: any) {
    super(`${message}${data ? ` (${JSON.stringify(data)})` : ''}`);
    this.name = new.target.name;

    //prior to es2015 (e.g. es5) the Error constructor broke the prototype chain, hence the following:
    if (!(this instanceof FnError)) {
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }

}

export class OperationFailedError extends FnError { }
export class InvalidOperationError extends FnError { }
export class UnexpectedStateError extends FnError { }
export class ArguementError extends FnError {
  constructor(public readonly name: string, message?: string) {
    super(message);
  }
}
export class ArguementFalsyError extends ArguementError {
  constructor(public readonly name: string, message: string = `The value passed for "${name}" did not have a truthy value.`) {
    super(name, message);
  }
}
export class ArguementNullOrUndefinedError extends ArguementFalsyError {
  constructor(public readonly name: string, message: string = `The value passed for "${name}" was null or undefined.`) {
    super(name, message);
  }
}
export class ArguementUndefinedError extends ArguementNullOrUndefinedError {
  constructor(public readonly name: string, message: string = `The value passed for "${name}" was undefined.`) {
    super(name, message);
  }
}

export class ArguementNullError extends ArguementNullOrUndefinedError {
  constructor(public readonly name: string, message: string = `The value passed for "${name}" was null.`) {
    super(name, message);
  }
}

export class InvalidArguementError extends ArguementError {
  constructor(public readonly name: string, message: string = `The value passed for ${name} was not valid.`) {
    super(name, message);
  }
}

export class ArguementTypeError extends InvalidArguementError {
  constructor(public readonly name: string, public readonly expectedType: string | Ctor, public readonly actualValue: any, message: string = `The value passed for ${name} was not of the expected type "${isString(expectedType) ? expectedType : getInstanceTypeName(expectedType)}".`) {
    super(name, message);
  }
}