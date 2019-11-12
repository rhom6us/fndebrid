#!/usr/bin/env node

import fndosomething from './compile';
import {App, Environment} from './configs/settings';

const [env, app] = process.argv.reverse().slice(0, 2) as [App, Environment];
// ...process.argv.slice(process.argv.length - 3, process.argv.length-1)
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
fndosomething('fnbuild', app, process.env.NODE_ENV || 'development');
