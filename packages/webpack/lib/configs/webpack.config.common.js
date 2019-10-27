"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var fork_ts_checker_webpack_plugin_1 = __importDefault(require("fork-ts-checker-webpack-plugin"));
var path_1 = __importDefault(require("path"));
var webpack_1 = __importDefault(require("webpack"));
var webpackbar_1 = __importDefault(require("webpackbar"));
var settings_1 = require("./settings");
exports.config = {
    mode: settings_1.mode,
    devtool: 'cheap-module-eval-source-map',
    context: settings_1.sourceDir,
    entry: (_a = {},
        _a[settings_1.app] = path_1.default.join(settings_1.sourceDir, 'index.ts'),
        _a),
    watch: settings_1.watch,
    output: {
        path: settings_1.outDir,
        filename: "[name]" + (settings_1.isDev ? "" : ".[contenthash]") + ".js",
        chunkFilename: "[name]" + (settings_1.isDev ? "" : ".[contenthash]") + ".js",
    },
    stats: {
        warnings: false,
        warningsFilter: /export .* was not found in/
    },
    resolve: {
        alias: {
            // '@': path.resolve(rendererSourceDir),
            // '~main': path.resolve(mainSourceDir),
            // '~renderer': path.resolve(rendererSourceDir),
            // '~common': path.resolve(commonSourceDir),
            // common: path.resolve(commonSourceDir),
            'react-dom': '@hot-loader/react-dom'
        },
        extensions: ['.js', ".ts", ".json", ".node"]
    },
    node: {
        __dirname: true,
        __filename: true
    },
    optimization: {
        nodeEnv: "development",
        namedModules: true,
        noEmitOnErrors: true,
    },
    plugins: [
        new webpackbar_1.default(),
        // new CleanWebpackPlugin() as any,
        new fork_ts_checker_webpack_plugin_1.default({
        // silent: true
        }),
        new webpack_1.default.DefinePlugin({
            __static: JSON.stringify(settings_1.staticSourceDir)
        }),
        new webpack_1.default.EnvironmentPlugin({ NODE_ENV: "development", DEBUG: true })
    ],
    module: {
        rules: [
        //typescriptRule
        ]
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay5jb25maWcuY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZ3Mvd2VicGFjay5jb25maWcuY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLGtHQUF3RTtBQUN4RSw4Q0FBd0I7QUFDeEIsb0RBQThCO0FBQzlCLDBEQUFvQztBQUVwQyx1Q0FBeUY7QUFHNUUsUUFBQSxNQUFNLEdBQTBCO0lBQzNDLElBQUksaUJBQUE7SUFDSixPQUFPLEVBQUUsOEJBQThCO0lBQ3ZDLE9BQU8sRUFBRSxvQkFBUztJQUNsQixLQUFLO1FBQ0gsR0FBQyxjQUFHLElBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxvQkFBUyxFQUFFLFVBQVUsQ0FBQztXQUN4QztJQUNELEtBQUssa0JBQUE7SUFDTCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsaUJBQU07UUFDWixRQUFRLEVBQUUsWUFBUyxnQkFBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixTQUFLO1FBQ3JELGFBQWEsRUFBRSxZQUFTLGdCQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLFNBQUs7S0FDM0Q7SUFDRCxLQUFLLEVBQUU7UUFDTCxRQUFRLEVBQUUsS0FBSztRQUNmLGNBQWMsRUFBRSw0QkFBNEI7S0FDN0M7SUFDRCxPQUFPLEVBQUU7UUFDUCxLQUFLLEVBQUU7WUFDTCx3Q0FBd0M7WUFDeEMsd0NBQXdDO1lBQ3hDLGdEQUFnRDtZQUNoRCw0Q0FBNEM7WUFDNUMseUNBQXlDO1lBQ3pDLFdBQVcsRUFBRSx1QkFBdUI7U0FDckM7UUFDRCxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUM7S0FDN0M7SUFDRCxJQUFJLEVBQUU7UUFDSixTQUFTLEVBQUUsSUFBSTtRQUNmLFVBQVUsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsWUFBWSxFQUFFO1FBQ1osT0FBTyxFQUFFLGFBQWE7UUFDdEIsWUFBWSxFQUFFLElBQUk7UUFDbEIsY0FBYyxFQUFFLElBQUk7S0FZckI7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLG9CQUFVLEVBQUU7UUFDaEIsbUNBQW1DO1FBQ25DLElBQUksd0NBQTBCLENBQUM7UUFDN0IsZUFBZTtTQUNoQixDQUFDO1FBQ0YsSUFBSSxpQkFBTyxDQUFDLFlBQVksQ0FBQztZQUN2QixRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQywwQkFBZSxDQUFDO1NBQzFDLENBQUM7UUFDRixJQUFJLGlCQUFPLENBQUMsaUJBQWlCLENBQUMsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztLQUN4RTtJQUNELE1BQU0sRUFBRTtRQUNOLEtBQUssRUFBRTtRQUNMLGdCQUFnQjtTQUNqQjtLQUNGO0NBQ0YsQ0FBQyJ9