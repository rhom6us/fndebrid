export class FnError extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;

    //prior to es2015 (e.g. es5) the Error constructor broke the prototype chain, hence the following:
    if (!(this instanceof FnError)) {
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }
}

export class OperationFailedError extends FnError {}
export class InvalidOperationError extends FnError {}
export class UnexpectedStateError extends FnError {}