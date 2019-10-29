import path from 'path';
export const mode = <'production' | 'development'>process.env.NODE_ENV || 'development';
export const isDev = mode != 'production';
export const sourceDir = path.resolve('.');
export const [, app] = sourceDir.match(/electron-(main|renderer)[\\\/]?$/i) as [string, 'main' | 'renderer'];

export const watch = process.argv.some(p => p == '--watch');
// This will be running from "./packages/@fndebrid/electron-main/" or the like.
// Get back up to the root dir
export const rootDir = path.join(sourceDir, '../../../');

export const staticSourceDir = path.join(rootDir, 'static');
export const outDir = path.join(rootDir, 'dist');
