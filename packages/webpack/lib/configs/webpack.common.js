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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay5jb21tb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlncy93ZWJwYWNrLmNvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLDZEQUEwRDtBQUMxRCxrR0FBd0U7QUFFeEUsb0RBQThCO0FBQzlCLDBEQUFvQztBQUVwQyxpQ0FBeUM7QUFDekMsdUNBQTZFO0FBSWhFLFFBQUEsTUFBTSxHQUEwQjtJQUMzQyxJQUFJLGlCQUFBO0lBQ0osT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixPQUFPLEVBQUUsb0JBQVM7SUFDbEIsS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDO0lBQ25CLE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxpQkFBTTtRQUNaLFFBQVEsRUFBRSxZQUFTLGdCQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLFNBQUs7UUFDckQsYUFBYSxFQUFFLFlBQVMsZ0JBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsU0FBSztLQUMzRDtJQUNELEtBQUssRUFBRTtRQUNMLFFBQVEsRUFBRSxLQUFLO0tBQ2hCO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsS0FBSyxFQUFFO1lBQ0wsd0NBQXdDO1lBQ3hDLHdDQUF3QztZQUN4QyxnREFBZ0Q7WUFDaEQsNENBQTRDO1lBQzVDLHlDQUF5QztZQUN6QyxXQUFXLEVBQUUsdUJBQXVCO1NBQ3JDO1FBQ0QsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUM7S0FDdEM7SUFDRCxJQUFJLEVBQUU7UUFDSixTQUFTLEVBQUUsSUFBSTtRQUNmLFVBQVUsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsWUFBWSxFQUFFO1FBQ1osT0FBTyxFQUFFLGFBQWE7UUFDdEIsWUFBWSxFQUFFLElBQUk7UUFDbEIsY0FBYyxFQUFFLElBQUk7S0FZckI7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLG9CQUFVLEVBQUU7UUFDaEIsSUFBSSx5Q0FBa0IsRUFBUztRQUMvQixJQUFJLHdDQUEwQixFQUFFO1FBQ2hDLElBQUksaUJBQU8sQ0FBQyxZQUFZLENBQUM7WUFDdkIsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsMEJBQWUsQ0FBQztTQUMxQyxDQUFDO1FBQ0YsSUFBSSxpQkFBTyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7S0FDeEU7SUFDRCxNQUFNLEVBQUU7UUFDTixLQUFLLEVBQUU7WUFDTCxzQkFBYztTQUNmO0tBQ0Y7Q0FDRixDQUFDIn0=