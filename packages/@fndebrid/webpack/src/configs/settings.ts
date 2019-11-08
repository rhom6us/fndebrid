import path from 'path';

export type Environment = 'production' | 'development';
export type App = 'main' | 'renderer';
export type Command = 'fnbuild' | 'fnwatch' | 'fnserve';
export const isDev = process.env.NODE_ENV !== 'production';
export const sourceDir = path.resolve('.');

// This will be running from "./packages/@fndebrid/electron-main/" or the like.
// Get back up to the root dir
export const rootDir = path.join(sourceDir, '../../../');

export const staticSourceDir = path.join(rootDir, 'static');
export const outDir = path.join(rootDir, 'dist');
