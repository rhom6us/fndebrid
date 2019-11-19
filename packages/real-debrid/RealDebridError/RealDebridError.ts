import { ApiError } from './ApiError';
import { ArgumentError } from './ArgumentError';

// tslint:disable: max-classes-per-file
export class RealDebridError extends Error {}
export class InvalidOperationError extends RealDebridError {}
// tslint:disable-next-line: one-variable-per-declaration
