"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var clean_webpack_plugin_1 = require("clean-webpack-plugin");
var fork_ts_checker_webpack_plugin_1 = __importDefault(require("fork-ts-checker-webpack-plugin"));
var webpack_1 = __importDefault(require("webpack"));
var webpackbar_1 = __importDefault(require("webpackbar"));
var rules_1 = require("./rules");
var settings_1 = require("./settings");
exports.config = {
    mode: settings_1.mode,
    devtool: 'eval-source-map',
    context: settings_1.sourceDir,
    entry: ['index.ts'],
    output: {
        path: settings_1.outDir,
        filename: "[name]" + (settings_1.isDev ? "" : ".[contenthash]") + ".js",
        chunkFilename: "[name]" + (settings_1.isDev ? "" : ".[contenthash]") + ".js",
    },
    stats: {
        warnings: false
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
        extensions: [".ts", ".json", ".node"]
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
        new clean_webpack_plugin_1.CleanWebpackPlugin(),
        new fork_ts_checker_webpack_plugin_1.default(),
        new webpack_1.default.DefinePlugin({
            __static: JSON.stringify(settings_1.staticSourceDir)
        }),
        new webpack_1.default.EnvironmentPlugin({ NODE_ENV: "development", DEBUG: true })
    ],
    module: {
        rules: [
            rules_1.typescriptRule
        ]
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZ3MvY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsNkRBQTBEO0FBQzFELGtHQUF3RTtBQUV4RSxvREFBOEI7QUFDOUIsMERBQW9DO0FBRXBDLGlDQUF5QztBQUN6Qyx1Q0FBNkU7QUFJaEUsUUFBQSxNQUFNLEdBQTBCO0lBQzNDLElBQUksaUJBQUE7SUFDSixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLE9BQU8sRUFBRSxvQkFBUztJQUNsQixLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUM7SUFDbkIsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLGlCQUFNO1FBQ1osUUFBUSxFQUFFLFlBQVMsZ0JBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsU0FBSztRQUNyRCxhQUFhLEVBQUUsWUFBUyxnQkFBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixTQUFLO0tBQzNEO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsUUFBUSxFQUFFLEtBQUs7S0FDaEI7SUFDRCxPQUFPLEVBQUU7UUFDUCxLQUFLLEVBQUU7WUFDTCx3Q0FBd0M7WUFDeEMsd0NBQXdDO1lBQ3hDLGdEQUFnRDtZQUNoRCw0Q0FBNEM7WUFDNUMseUNBQXlDO1lBQ3pDLFdBQVcsRUFBRSx1QkFBdUI7U0FDckM7UUFDRCxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQztLQUN0QztJQUNELElBQUksRUFBRTtRQUNKLFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLElBQUk7S0FDakI7SUFDRCxZQUFZLEVBQUU7UUFDWixPQUFPLEVBQUUsYUFBYTtRQUN0QixZQUFZLEVBQUUsSUFBSTtRQUNsQixjQUFjLEVBQUUsSUFBSTtLQVlyQjtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksb0JBQVUsRUFBRTtRQUNoQixJQUFJLHlDQUFrQixFQUFTO1FBQy9CLElBQUksd0NBQTBCLEVBQUU7UUFDaEMsSUFBSSxpQkFBTyxDQUFDLFlBQVksQ0FBQztZQUN2QixRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQywwQkFBZSxDQUFDO1NBQzFDLENBQUM7UUFDRixJQUFJLGlCQUFPLENBQUMsaUJBQWlCLENBQUMsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztLQUN4RTtJQUNELE1BQU0sRUFBRTtRQUNOLEtBQUssRUFBRTtZQUNMLHNCQUFjO1NBQ2Y7S0FDRjtDQUNGLENBQUMifQ==