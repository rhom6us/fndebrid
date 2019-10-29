import {promisify} from 'util';

export const setImmediateAsync = promisify(setImmediate);
export const setTimeoutAsync = promisify(setTimeout);
