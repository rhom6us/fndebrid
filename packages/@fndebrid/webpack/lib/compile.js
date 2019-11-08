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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_1 = __importDefault(require("webpack"));
var webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
var configs = __importStar(require("./configs"));
var settings_1 = require("./configs/settings");
// tslint:disable: no-console
function validate(value) {
    var command = value[0], app = value[1], mode = value[2];
    return (['fnbuild', 'fnwatch', 'fnserve'].includes(command) &&
        ['main', 'renderer'].includes(app) &&
        ['production', 'development'].includes(mode));
}
function fndosomething() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (validate(args)) {
        var command = args[0], app = args[1], mode = args[2];
        switch (command) {
            case 'fnbuild':
                compile(__assign(__assign({}, configs[app]), { mode: mode, watch: false }));
                break;
            case 'fnwatch':
                compile(__assign(__assign({}, configs[app]), { mode: mode, watch: true }));
                break;
            case 'fnserve':
                serve(__assign(__assign({}, configs[app]), { mode: mode, watch: false }));
                break;
        }
    }
    else {
        console.error("invalid command \"([" + process.execPath + "] " + process.execArgv.join(' ') + ") -- " + process.argv.join(' ') + "\"");
    }
}
exports.default = fndosomething;
function compile(config) {
    return webpack_1.default(config, function (err, stats) {
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
        console.log(stats.toString({
            assets: false,
            chunks: false,
            colors: true,
        }));
    });
}
exports.compile = compile;
function serve(config) {
    var devServerConfig = {
        contentBase: [settings_1.staticSourceDir],
        host: 'localhost',
        port: 9080,
        hot: true,
        noInfo: true,
        open: false,
        overlay: true,
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
    webpack_dev_server_1.default.addDevServerEntrypoints(config, devServerConfig);
    var server = new webpack_dev_server_1.default(webpack_1.default(config), devServerConfig);
    return server.listen(devServerConfig.port, devServerConfig.host, function () {
        // tslint:disable-next-line: no-console
        console.log("Starting server on http://" + devServerConfig.host + ":" + devServerConfig.port);
    });
}
exports.serve = serve;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21waWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQW9EO0FBQ3BELDBFQUFrRDtBQUNsRCxpREFBcUM7QUFDckMsK0NBQThFO0FBRTlFLDZCQUE2QjtBQUM3QixTQUFTLFFBQVEsQ0FBQyxLQUFlO0lBQ3hCLElBQUEsa0JBQU8sRUFBRSxjQUFHLEVBQUUsZUFBSSxDQUFVO0lBQ25DLE9BQU8sQ0FDTCxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUNuRCxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1FBQ2xDLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FDN0MsQ0FBQztBQUNKLENBQUM7QUFFRCxTQUF3QixhQUFhO0lBQUMsY0FBa0M7U0FBbEMsVUFBa0MsRUFBbEMscUJBQWtDLEVBQWxDLElBQWtDO1FBQWxDLHlCQUFrQzs7SUFDdEUsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDWCxJQUFBLGlCQUFPLEVBQUUsYUFBRyxFQUFFLGNBQUksQ0FBUztRQUNsQyxRQUFRLE9BQU8sRUFBRTtZQUNmLEtBQUssU0FBUztnQkFDWixPQUFPLHVCQUFLLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBRSxJQUFJLE1BQUEsRUFBRSxLQUFLLEVBQUUsS0FBSyxJQUFFLENBQUM7Z0JBQy9DLE1BQU07WUFDUixLQUFLLFNBQVM7Z0JBQ1osT0FBTyx1QkFBSyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUUsSUFBSSxNQUFBLEVBQUUsS0FBSyxFQUFFLElBQUksSUFBRSxDQUFDO2dCQUM5QyxNQUFNO1lBQ1IsS0FBSyxTQUFTO2dCQUNaLEtBQUssdUJBQUssT0FBTyxD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