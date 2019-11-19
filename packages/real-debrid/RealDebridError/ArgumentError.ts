import { RealDebridError } from './RealDebridError';

// tslint:disable: max-classes-per-file
export class ArgumentError extends RealDebridError {
  constructor(public readonly name: string, message?: string) {
    super(message);
  }
}
export class InvalidArgumentError extends ArgumentError {}
export class ArgumentFalsyError extends InvalidArgumentError {}
