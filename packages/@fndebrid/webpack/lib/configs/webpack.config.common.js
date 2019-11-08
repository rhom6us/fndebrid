"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fork_ts_checker_webpack_plugin_1 = __importDefault(require("fork-ts-checker-webpack-plugin"));
var path_1 = __importDefault(require("path"));
var webpack_1 = __importDefault(require("webpack"));
var webpackbar_1 = __importDefault(require("webpackbar"));
var settings_1 = require("./settings");
exports.default = {
    devtool: 'cheap-module-eval-source-map',
    context: settings_1.sourceDir,
    entry: path_1.default.join(settings_1.sourceDir, 'index.ts'),
    output: {
        path: settings_1.outDir,
        filename: "[name]" + (settings_1.isDev ? '' : '.[contenthash]') + ".js",
        chunkFilename: "[name]" + (settings_1.isDev ? '' : '.[contenthash]') + ".js",
    },
    stats: {
        warnings: false,
        warningsFilter: /export .* was not found in/,
    },
    resolve: {
        alias: {
            // '@': path.resolve(rendererSourceDir),
            // '~main': path.resolve(mainSourceDir),
            // '~renderer': path.resolve(rendererSourceDir),
            // '~common': path.resolve(commonSourceDir),
            // common: path.resolve(commonSourceDir),
            'react-dom': '@hot-loader/react-dom',
        },
        extensions: ['.js', '.ts', '.json', '.node'],
    },
    node: {
        __dirname: true,
        __filename: true,
    },
    optimization: {
        nodeEnv: 'development',
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
            __static: JSON.stringify(settings_1.staticSourceDir),
        }),
        new webpack_1.default.EnvironmentPlugin({ NODE_ENV: 'development', DEBUG: true }),
    ],
    module: {
        rules: [
        // typescriptRule
        ],
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay5jb25maWcuY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZ3Mvd2VicGFjay5jb25maWcuY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esa0dBQXdFO0FBQ3hFLDhDQUF3QjtBQUN4QixvREFBOEI7QUFDOUIsMERBQW9DO0FBRXBDLHVDQUFxRTtBQUVyRSxrQkFBZTtJQUNiLE9BQU8sRUFBRSw4QkFBOEI7SUFDdkMsT0FBTyxFQUFFLG9CQUFTO0lBQ2xCLEtBQUssRUFBRSxjQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFTLEVBQUUsVUFBVSxDQUFDO0lBQ3ZDLE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxpQkFBTTtRQUNaLFFBQVEsRUFBRSxZQUFTLGdCQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLFNBQUs7UUFDckQsYUFBYSxFQUFFLFlBQVMsZ0JBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsU0FBSztLQUMzRDtJQUNELEtBQUssRUFBRTtRQUNMLFFBQVEsRUFBRSxLQUFLO1FBQ2YsY0FBYyxFQUFFLDRCQUE0QjtLQUM3QztJQUNELE9BQU8sRUFBRTtRQUNQLEtBQUssRUFBRTtZQUNMLHdDQUF3QztZQUN4Qyx3Q0FBd0M7WUFDeEMsZ0RBQWdEO1lBQ2hELDRDQUE0QztZQUM1Qyx5Q0FBeUM7WUFDekMsV0FBVyxFQUFFLHVCQUF1QjtTQUNyQztRQUNELFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQztLQUM3QztJQUNELElBQUksRUFBRTtRQUNKLFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLElBQUk7S0FDakI7SUFDRCxZQUFZLEVBQUU7UUFDWixPQUFPLEVBQUUsYUFBYTtRQUN0QixZQUFZLEVBQUUsSUFBSTtRQUNsQixjQUFjLEVBQUUsSUFBSTtLQVlyQjtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksb0JBQVUsRUFBRTtRQUNoQixtQ0FBbUM7UUFDbkMsSUFBSSx3Q0FBMEIsQ0FBQztRQUM3QixlQUFlO1NBQ2hCLENBQUM7UUFDRixJQUFJLGlCQUFPLENBQUMsWUFBWSxDQUFDO1lBQ3ZCLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLDBCQUFlLENBQUM7U0FDMUMsQ0FBQztRQUNGLElBQUksaUJBQU8sQ0FBQyxpQkFBaUIsQ0FBQyxFQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDO0tBQ3RFO0lBQ0QsTUFBTSxFQUFFO1FBQ04sS0FBSyxFQUFFO1FBQ0wsaUJBQWlCO1NBQ2xCO0tBQ0Y7Q0FDdUIsQ0FBQyJ9