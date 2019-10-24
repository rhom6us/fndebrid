#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_1 = __importDefault(require("webpack"));
var configs_1 = __importDefault(require("./configs"));
webpack_1.default(configs_1.default, function (err, stats) {
    if (err) {
        console.error(err.stack || err);
        if (err.details) {
            console.error(err.details);
        }
        return;
    }
    var info = stats.toJson();
    if (stats.hasErrors()) {
        console.error(info.errors);
    }
    // // if (stats.hasWarnings()) {
    // //   console.warn(info.warnings);
    // // }
    // console.log(stats.toString({
    //   assets: false,
    //   chunks: false,  // Makes the build much quieter
    //   colors: true    // Shows colors in the console
    // }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy93ZWJwYWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLG9EQUE4QjtBQUM5QixzREFBK0I7QUFJL0IsaUJBQU8sQ0FBQyxpQkFBTSxFQUFFLFVBQUMsR0FBTyxFQUFFLEtBQUs7SUFDN0IsSUFBSSxHQUFHLEVBQUU7UUFDUCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDLENBQUM7UUFDaEMsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO1lBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDNUI7UUFDRCxPQUFPO0tBQ1I7SUFFRCxJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7SUFFNUIsSUFBSSxLQUFLLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDckIsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDNUI7SUFFRCxnQ0FBZ0M7SUFDaEMsb0NBQW9DO0lBQ3BDLE9BQU87SUFFUCwrQkFBK0I7SUFDL0IsbUJBQW1CO0lBQ25CLG9EQUFvRDtJQUNwRCxtREFBbUQ7SUFDbkQsT0FBTztBQUNULENBQUMsQ0FBQyxDQUFBIn0=