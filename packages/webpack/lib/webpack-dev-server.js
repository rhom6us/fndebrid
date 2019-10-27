#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_1 = __importDefault(require("webpack"));
var webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
var configs_1 = __importDefault(require("./configs"));
var settings_1 = require("./configs/settings");
var options = {
    contentBase: [
        settings_1.staticSourceDir,
    ],
    host: 'localhost',
    port: 9080,
    hot: true,
    noInfo: true,
    open: false,
    overlay: true,
    inline: true,
    // clientLogLevel: "warning",
    stats: {
        colors: true,
        assets: false,
        entrypoints: false,
        warningsFilter: /export .* was not found in/,
        modules: false,
        timings: false,
        version: false,
        hash: false,
    },
};
webpack_dev_server_1.default.addDevServerEntrypoints(configs_1.default, options);
var compiler = webpack_1.default(configs_1.default);
var server = new webpack_dev_server_1.default(compiler, options);
server.listen(options.port, options.host, function () {
    console.log("Starting server on http://" + options.host + ":" + options.port);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay1kZXYtc2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3dlYnBhY2stZGV2LXNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxvREFBOEI7QUFDOUIsMEVBQWtEO0FBQ2xELHNEQUErQjtBQUMvQiwrQ0FBcUQ7QUFHckQsSUFBTSxPQUFPLEdBQW1DO0lBQzlDLFdBQVcsRUFBRTtRQUNYLDBCQUFlO0tBRWhCO0lBQ0QsSUFBSSxFQUFFLFdBQVc7SUFDakIsSUFBSSxFQUFFLElBQUk7SUFDVixHQUFHLEVBQUUsSUFBSTtJQUNULE1BQU0sRUFBRSxJQUFJO0lBQ1osSUFBSSxFQUFFLEtBQUs7SUFDWCxPQUFPLEVBQUUsSUFBSTtJQUNiLE1BQU0sRUFBRSxJQUFJO0lBQ1osNkJBQTZCO0lBQzdCLEtBQUssRUFBRTtRQUNMLE1BQU0sRUFBRSxJQUFJO1FBQ1osTUFBTSxFQUFFLEtBQUs7UUFDYixXQUFXLEVBQUUsS0FBSztRQUNsQixjQUFjLEVBQUUsNEJBQTRCO1FBQzVDLE9BQU8sRUFBRSxLQUFLO1FBQ2QsT0FBTyxFQUFFLEtBQUs7UUFDZCxPQUFPLEVBQUUsS0FBSztRQUNkLElBQUksRUFBRSxLQUFLO0tBQ1o7Q0FTRixDQUFDO0FBQ0YsNEJBQWdCLENBQUMsdUJBQXVCLENBQUMsaUJBQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUMxRCxJQUFNLFFBQVEsR0FBRyxpQkFBTyxDQUFDLGlCQUFNLENBQUMsQ0FBQztBQUNqQyxJQUFNLE1BQU0sR0FBRyxJQUFJLDRCQUFnQixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUV2RCxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRTtJQUN4QyxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUE2QixPQUFPLENBQUMsSUFBSSxTQUFJLE9BQU8sQ0FBQyxJQUFNLENBQUMsQ0FBQztBQUMzRSxDQUFDLENBQUMsQ0FBQyJ9