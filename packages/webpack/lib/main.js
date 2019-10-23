"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_1 = __importDefault(require("webpack"));
var util_1 = require("util");
var configs_1 = require("./configs");
var _a = process.argv, mode = _a[2], entries = _a.slice(3);
var compile = util_1.promisify(webpack_1.default);
var config = (function () {
    switch (mode) {
        case 'main':
            return configs_1.mainConfig;
        case 'renderer':
            return configs_1.rendererConfig;
        default:
            throw new Error("Unknown config mode: '" + mode + "'");
    }
})();
webpack_1.default(config, function (err, stats) {
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
    if (stats.hasWarnings()) {
        console.warn(info.warnings);
    }
    console.log(stats.toString({
        chunks: false,
        colors: true // Shows colors in the console
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0RBQThCO0FBRTlCLDZCQUFpQztBQUNqQyxxQ0FBdUQ7QUFFakQsSUFBQSxpQkFBMkYsRUFBdEYsWUFBSSxFQUFFLHFCQUFnRixDQUFDO0FBRWxHLElBQU0sT0FBTyxHQUFHLGdCQUFTLENBQUMsaUJBQU8sQ0FBQyxDQUFDO0FBRW5DLElBQU0sTUFBTSxHQUFHLENBQUM7SUFDZCxRQUFRLElBQUksRUFBRTtRQUNaLEtBQUssTUFBTTtZQUNULE9BQU8sb0JBQVUsQ0FBQztRQUNwQixLQUFLLFVBQVU7WUFDYixPQUFPLHdCQUFjLENBQUM7UUFDeEI7WUFDRSxNQUFNLElBQUksS0FBSyxDQUFDLDJCQUF5QixJQUFJLE1BQUcsQ0FBQyxDQUFDO0tBQ3JEO0FBQ0gsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUVMLGlCQUFPLENBQUMsTUFBTSxFQUFFLFVBQUMsR0FBTyxFQUFFLEtBQUs7SUFDN0IsSUFBSSxHQUFHLEVBQUU7UUFDUCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDLENBQUM7UUFDaEMsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO1lBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDNUI7UUFDRCxPQUFPO0tBQ1I7SUFFRCxJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7SUFFNUIsSUFBSSxLQUFLLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDckIsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDNUI7SUFFRCxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUUsRUFBRTtRQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUM3QjtJQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUN6QixNQUFNLEVBQUUsS0FBSztRQUNiLE1BQU0sRUFBRSxJQUFJLENBQUksOEJBQThCO0tBQy9DLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUEifQ==