"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
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
    devtool: settings_1.isDev ? 'cheap-module-eval-source-map' : undefined,
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
        nodeEnv: process.env.NODE_ENV,
        namedModules: true,
        noEmitOnErrors: true,
    },
    plugins: __spreadArrays((settings_1.isDev
        ? [
            new webpackbar_1.default(),
            new fork_ts_checker_webpack_plugin_1.default({
            // silent: true
            }),
        ]
        : []), [
        // new CleanWebpackPlugin() as any,
        new webpack_1.default.DefinePlugin({
            __static: JSON.stringify(settings_1.staticSourceDir),
        }),
        new webpack_1.default.EnvironmentPlugin({ NODE_ENV: 'development' }),
    ]),
    module: {
        rules: [
        // typescriptRule
        ],
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay5jb25maWcuY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZ3Mvd2VicGFjay5jb25maWcuY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLGtHQUF3RTtBQUN4RSw4Q0FBd0I7QUFDeEIsb0RBQThCO0FBQzlCLDBEQUFvQztBQUVwQyx1Q0FBcUU7QUFFckUsa0JBQWU7SUFDYixPQUFPLEVBQUUsZ0JBQUssQ0FBQyxDQUFDLENBQUMsOEJBQThCLENBQUMsQ0FBQyxDQUFDLFNBQVM7SUFDM0QsT0FBTyxFQUFFLG9CQUFTO0lBQ2xCLEtBQUssRUFBRSxjQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFTLEVBQUUsVUFBVSxDQUFDO0lBQ3ZDLE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxpQkFBTTtRQUNaLFFBQVEsRUFBRSxZQUFTLGdCQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLFNBQUs7UUFDckQsYUFBYSxFQUFFLFlBQVMsZ0JBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsU0FBSztLQUMzRDtJQUNELEtBQUssRUFBRTtRQUNMLFFBQVEsRUFBRSxLQUFLO1FBQ2YsY0FBYyxFQUFFLDRCQUE0QjtLQUM3QztJQUNELE9BQU8sRUFBRTtRQUNQLEtBQUssRUFBRTtZQUNMLHdDQUF3QztZQUN4Qyx3Q0FBd0M7WUFDeEMsZ0RBQWdEO1lBQ2hELDRDQUE0QztZQUM1Qyx5Q0FBeUM7WUFDekMsV0FBVyxFQUFFLHVCQUF1QjtTQUNyQztRQUNELFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQztLQUM3QztJQUNELElBQUksRUFBRTtRQUNKLFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLElBQUk7S0FDakI7SUFDRCxZQUFZLEVBQUU7UUFDWixPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRO1FBQzdCLFlBQVksRUFBRSxJQUFJO1FBQ2xCLGNBQWMsRUFBRSxJQUFJO0tBWXJCO0lBQ0QsT0FBTyxpQkFDRixDQUFDLGdCQUFLO1FBQ1AsQ0FBQyxDQUFDO1lBQ0UsSUFBSSxvQkFBVSxFQUFFO1lBQ2hCLElBQUksd0NBQTBCLENBQUM7WUFDN0IsZUFBZTthQUNoQixDQUFDO1NBQ0g7UUFDSCxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ1AsbUNBQW1DO1FBRW5DLElBQUksaUJBQU8sQ0FBQyxZQUFZLENBQUM7WUFDdkIsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsMEJBQWUsQ0FBQztTQUMxQyxDQUFDO1FBQ0YsSUFBSSxpQkFBTyxDQUFDLGlCQUFpQixDQUFDLEVBQUMsUUFBUSxFQUFFLGFBQWEsRUFBQyxDQUFDO01BQ3pEO0lBQ0QsTUFBTSxFQUFFO1FBQ04sS0FBSyxFQUFFO1FBQ0wsaUJBQWlCO1NBQ2xCO0tBQ0Y7Q0FDdUIsQ0FBQyJ9