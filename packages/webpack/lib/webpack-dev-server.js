#!/usr/bin/env node
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_1 = __importDefault(require("webpack"));
var webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
var configs_1 = __importDefault(require("./configs"));
var settings_1 = require("./configs/settings");
var compiler = webpack_1.default(configs_1.default);
var devServerOptions = __assign(__assign({}, configs_1.default.devServer), { contentBase: [
        settings_1.staticSourceDir,
    ], host: 'localhost', port: 9080, hot: true, noInfo: true, open: false, overlay: true, inline: false, 
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
    } });
var server = new webpack_dev_server_1.default(compiler, devServerOptions);
server.listen(devServerOptions.port, devServerOptions.host, function () {
    console.log("Starting server on http://" + devServerOptions.host + ":" + devServerOptions.port);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay1kZXYtc2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3dlYnBhY2stZGV2LXNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG9EQUE4QjtBQUM5QiwwRUFBa0Q7QUFDbEQsc0RBQStCO0FBQy9CLCtDQUFxRDtBQUdyRCxJQUFNLFFBQVEsR0FBRyxpQkFBTyxDQUFDLGlCQUFNLENBQUMsQ0FBQztBQUNqQyxJQUFNLGdCQUFnQix5QkFDakIsaUJBQU0sQ0FBQyxTQUFTLEtBQ25CLFdBQVcsRUFBRTtRQUNYLDBCQUFlO0tBRWhCLEVBQ0QsSUFBSSxFQUFFLFdBQVcsRUFDakIsSUFBSSxFQUFFLElBQUksRUFDVixHQUFHLEVBQUUsSUFBSSxFQUNULE1BQU0sRUFBRSxJQUFJLEVBQ1osSUFBSSxFQUFFLEtBQUssRUFDWCxPQUFPLEVBQUUsSUFBSSxFQUNiLE1BQU0sRUFBRSxLQUFLO0lBQ2IsNkJBQTZCO0lBQzdCLEtBQUssRUFBRTtRQUNMLE1BQU0sRUFBRSxJQUFJO1FBQ1osTUFBTSxFQUFFLEtBQUs7UUFDYixXQUFXLEVBQUUsS0FBSztRQUNsQixjQUFjLEVBQUUsNEJBQTRCO1FBQzVDLE9BQU8sRUFBRSxLQUFLO1FBQ2QsT0FBTyxFQUFFLEtBQUs7UUFDZCxPQUFPLEVBQUUsS0FBSztRQUNiLElBQUksRUFBRSxLQUFLO0tBQ2IsR0FTRixDQUFDO0FBQ0YsSUFBTSxNQUFNLEdBQUcsSUFBSSw0QkFBZ0IsQ0FBQyxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUVoRSxNQUFNLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUU7SUFDMUQsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBNkIsZ0JBQWdCLENBQUMsSUFBSSxTQUFJLGdCQUFnQixDQUFDLElBQU0sQ0FBQyxDQUFDO0FBQzdGLENBQUMsQ0FBQyxDQUFDIn0=