#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var compile_1 = __importDefault(require("./compile"));
var _a = process.argv.reverse().slice(0, 2), env = _a[0], app = _a[1];
// ...process.argv.slice(process.argv.length - 3, process.argv.length-1)
compile_1.default('fnbuild', app, env);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm5idWlsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9mbmJ1aWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLHNEQUFzQztBQUdoQyxJQUFBLHVDQUFxRSxFQUFwRSxXQUFHLEVBQUUsV0FBK0QsQ0FBQztBQUM1RSx3RUFBd0U7QUFDeEUsaUJBQWEsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDIn0=