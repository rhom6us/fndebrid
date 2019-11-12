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
var webpack_dev_server_1 = __importStar(require("webpack-dev-server"));
var cliLogger_1 = __importDefault(require("./cliLogger"));
var configs = __importStar(require("./configs"));
var settings_1 = require("./configs/settings");
function validate(value) {
    var command = value[0], app = value[1], mode = value[2];
    return ['fnbuild', 'fnwatch', 'fnserve'].includes(command) && ['main', 'renderer'].includes(app) && ['production', 'development'].includes(mode);
}
function getCompiler(config) {
    var compiler = webpack_1.default(config);
    if (config.watch) {
        compiler.hooks.watchRun.tap('WebpackInfo', function (compilation) {
            var compilationName = compilation.name ? compilation.name : '';
            cliLogger_1.default.info('Compilation ' + compilationName + ' starting…');
        });
    }
    else {
        compiler.hooks.beforeRun.tap('WebpackInfo', function (compilation) {
            var compilationName = compilation.name ? compilation.name : '';
            cliLogger_1.default.info('Compilation ' + compilationName + ' starting…');
        });
    }
    compiler.hooks.done.tap('WebpackInfo', function (compilation) {
        var compilationName = compilation.name ? compilation.name : '';
        cliLogger_1.default.info('Compilation ' + compilationName + ' finished');
    });
    return compiler;
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
                serve(__assign(__assign({}, configs[app]), { mode: mode, watch: true }));
                break;
        }
    }
    else {
        throw new Error("invalid command \"([" + process.execPath + "] " + process.execArgv.join(' ') + ") -- " + process.argv.join(' ') + "\"");
    }
}
exports.default = fndosomething;
function compile(config) {
    var compiler = getCompiler(config);
    var callback = function (err, stats) {
        if (err) {
            process.stderr.write('\n\n');
            process.stderr.write(err.stack || err + '\n');
            if (!config.watch) {
                process.exit(1);
            }
            // console.error(err.stack || err);
            // if (err.details) {
            //   console.error(err.details);
            // }
            // return;
        }
        var info = stats.toJson();
        if (stats.hasErrors()) {
            process.stderr.write('\n\n');
            process.stderr.write(info.errors + '\n');
        }
        // // if (stats.hasWarnings()) {
        // //   console.warn(info.warnings);
        // // }
        // console.log(
        //   stats.toString({
        //     assets: false,
        //     chunks: false, // Makes the build much quieter
        //     colors: true, // Shows colors in the console
        //   }),
        // );
    };
    if (config.watch) {
        return compiler.watch({}, callback);
    }
    compiler.run(callback);
    return compiler;
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
            warnings: false,
            warningsFilter: function (warning) {
                var pattern = /export .* was not found in/i;
                return warning.split(/\r?\n/g).every(function (line) { return !pattern.test(line); });
            },
            modules: false,
            timings: false,
            version: false,
            hash: false,
        },
    };
    webpack_dev_server_1.addDevServerEntrypoints(config, devServerConfig);
    var server = new webpack_dev_server_1.default(getCompiler(config), devServerConfig);
    return server.listen(devServerConfig.port, devServerConfig.host, function () {
        // tslint:disable-next-line: no-console
        console.log("Starting server on http://" + devServerConfig.host + ":" + devServerConfig.port);
    });
}
exports.serve = serve;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21waWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQTBFO0FBQzFFLHVFQUE2RTtBQUM3RSwwREFBb0M7QUFDcEMsaURBQXFDO0FBQ3JDLCtDQUE4RTtBQUU5RSxTQUFTLFFBQVEsQ0FBQyxLQUFlO0lBQ3hCLElBQUEsa0JBQU8sRUFBRSxjQUFHLEVBQUUsZUFBSSxDQUFVO0lBQ25DLE9BQU8sQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25KLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxNQUFxQjtJQUN4QyxJQUFNLFFBQVEsR0FBRyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pDLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTtRQUNoQixRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFVBQUEsV0FBVztZQUNwRCxJQUFNLGVBQWUsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDakUsbUJBQVMsQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLGVBQWUsR0FBRyxZQUFZLENBQUMsQ0FBQztRQUNsRSxDQUFDLENBQUMsQ0FBQztLQUNKO1NBQU07UUFDTCxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFVBQUEsV0FBVztZQUNyRCxJQUFNLGVBQWUsR0FBRyxXQUFX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