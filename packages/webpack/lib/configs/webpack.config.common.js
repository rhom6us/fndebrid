"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var clean_webpack_plugin_1 = require("clean-webpack-plugin");
var fork_ts_checker_webpack_plugin_1 = __importDefault(require("fork-ts-checker-webpack-plugin"));
var path_1 = __importDefault(require("path"));
var webpack_1 = __importDefault(require("webpack"));
var webpackbar_1 = __importDefault(require("webpackbar"));
var rules_1 = require("./rules");
var settings_1 = require("./settings");
exports.config = {
    mode: settings_1.mode,
    devtool: 'eval-source-map',
    context: settings_1.sourceDir,
    entry: [path_1.default.join(settings_1.sourceDir, 'index.ts')],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay5jb25maWcuY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZ3Mvd2VicGFjay5jb25maWcuY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkRBQTBEO0FBQzFELGtHQUF3RTtBQUN4RSw4Q0FBd0I7QUFDeEIsb0RBQThCO0FBQzlCLDBEQUFvQztBQUNwQyxpQ0FBeUM7QUFDekMsdUNBQTZFO0FBR2hFLFFBQUEsTUFBTSxHQUEwQjtJQUMzQyxJQUFJLGlCQUFBO0lBQ0osT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixPQUFPLEVBQUUsb0JBQVM7SUFDbEIsS0FBSyxFQUFFLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxvQkFBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3pDLE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxpQkFBTTtRQUNaLFFBQVEsRUFBRSxZQUFTLGdCQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLFNBQUs7UUFDckQsYUFBYSxFQUFFLFlBQVMsZ0JBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsU0FBSztLQUMzRDtJQUNELEtBQUssRUFBRTtRQUNMLFFBQVEsRUFBRSxLQUFLO0tBQ2hCO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsS0FBSyxFQUFFO1lBQ0wsd0NBQXdDO1lBQ3hDLHdDQUF3QztZQUN4QyxnREFBZ0Q7WUFDaEQsNENBQTRDO1lBQzVDLHlDQUF5QztZQUN6QyxXQUFXLEVBQUUsdUJBQXVCO1NBQ3JDO1FBQ0QsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDO0tBQzdDO0lBQ0QsSUFBSSxFQUFFO1FBQ0osU0FBUyxFQUFFLElBQUk7UUFDZixVQUFVLEVBQUUsSUFBSTtLQUNqQjtJQUNELFlBQVksRUFBRTtRQUNaLE9BQU8sRUFBRSxhQUFhO1FBQ3RCLFlBQVksRUFBRSxJQUFJO1FBQ2xCLGNBQWMsRUFBRSxJQUFJO0tBWXJCO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxvQkFBVSxFQUFFO1FBQ2hCLElBQUkseUNBQWtCLEVBQVM7UUFDL0IsSUFBSSx3Q0FBMEIsRUFBRTtRQUNoQyxJQUFJLGlCQUFPLENBQUMsWUFBWSxDQUFDO1lBQ3ZCLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLDBCQUFlLENBQUM7U0FDMUMsQ0FBQztRQUNGLElBQUksaUJBQU8sQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDO0tBQ3hFO0lBQ0QsTUFBTSxFQUFFO1FBQ04sS0FBSyxFQUFFO1lBQ0wsc0JBQWM7U0FDZjtLQUNGO0NBQ0YsQ0FBQyJ9