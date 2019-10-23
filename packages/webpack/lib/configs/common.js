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
function isAncestor(file, dir) {
    return file.length > dir.length && file[dir.length] === path_1.default.sep && file.startsWith(dir);
}
exports.isDev = process.env.NODE_ENV != 'production';
exports.sourceDir = '../';
// export const commonSourceDir = path.join(sourceDir);
exports.rendererSourceDir = path_1.default.join(exports.sourceDir, 'electron-renderer');
exports.mainSourceDir = path_1.default.join(exports.sourceDir, 'electron-main');
exports.staticSourceDir = 'static';
exports.outDir = 'dist';
exports.mainOutDir = path_1.default.join(exports.outDir, 'main');
exports.rendererOutDir = path_1.default.join(exports.outDir, 'renderer');
var config = {
    mode: "development",
    devtool: 'eval-source-map',
    context: path_1.default.resolve('.'),
    output: {
        filename: "[name]" + (exports.isDev ? "" : ".[contenthash]") + ".js",
        chunkFilename: "[name]" + (exports.isDev ? "" : ".[contenthash]") + ".js",
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
    },
    node: {
        __dirname: true,
        __filename: true
    },
    optimization: {
        nodeEnv: "development",
        namedModules: true,
        noEmitOnErrors: true
    },
    watchOptions: {
        ignored: ['dist/**/*.*']
    },
    plugins: [
        new webpackbar_1.default(),
        new clean_webpack_plugin_1.CleanWebpackPlugin(),
        new fork_ts_checker_webpack_plugin_1.default(),
        new webpack_1.default.DefinePlugin({
            __static: JSON.stringify(path_1.default.resolve(exports.staticSourceDir))
        }),
        // new WatchFilterPlugin(
        //   file =>
        //     file === commonSourceDir ||
        //     (isAncestor(file, commonSourceDir) &&
        //       (alienSourceDir != null && !file.startsWith(alienSourceDir))),
        //   require("debug")(`electron-webpack:watch-${type}`)
        // ),
        new webpack_1.default.EnvironmentPlugin({ NODE_ENV: "development", DEBUG: true })
    ],
};
exports.default = config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZ3MvY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsNkRBQTBEO0FBQzFELGtHQUF3RTtBQUN4RSw4Q0FBd0I7QUFDeEIsb0RBQThCO0FBQzlCLDBEQUFvQztBQUVwQyxTQUFTLFVBQVUsQ0FBQyxJQUFZLEVBQUUsR0FBVztJQUMzQyxPQUFPLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLGNBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUMxRixDQUFDO0FBQ1ksUUFBQSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksWUFBWSxDQUFDO0FBQzdDLFFBQUEsU0FBUyxHQUFHLEtBQUssQ0FBQztBQUMvQix1REFBdUQ7QUFDMUMsUUFBQSxpQkFBaUIsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFTLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztBQUM5RCxRQUFBLGFBQWEsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFTLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFFdEQsUUFBQSxlQUFlLEdBQUcsUUFBUSxDQUFDO0FBQzNCLFFBQUEsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNoQixRQUFBLFVBQVUsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLGNBQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN2QyxRQUFBLGNBQWMsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLGNBQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztBQUc1RCxJQUFNLE1BQU0sR0FBMEI7SUFDcEMsSUFBSSxFQUFFLGFBQWE7SUFDbkIsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixPQUFPLEVBQUUsY0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7SUFDMUIsTUFBTSxFQUFFO1FBQ04sUUFBUSxFQUFFLFlBQVMsYUFBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixTQUFLO1FBQ3JELGFBQWEsRUFBRSxZQUFTLGFBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsU0FBSztLQUMzRDtJQUNELEtBQUssRUFBRTtRQUNMLFFBQVEsRUFBRSxLQUFLO0tBQ2hCO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsS0FBSyxFQUFDO1lBQ0osd0NBQXdDO1lBQ3hDLHdDQUF3QztZQUN4QyxnREFBZ0Q7WUFDaEQsNENBQTRDO1lBQzVDLHlDQUF5QztZQUN6QyxXQUFXLEVBQUUsdUJBQXVCO1NBQ3JDO0tBQ0Y7SUFDRCxJQUFJLEVBQUU7UUFDSixTQUFTLEVBQUUsSUFBSTtRQUNmLFVBQVUsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsWUFBWSxFQUFFO1FBQ1osT0FBTyxFQUFFLGFBQWE7UUFDdEIsWUFBWSxFQUFFLElBQUk7UUFDbEIsY0FBYyxFQUFFLElBQUk7S0FDckI7SUFDRCxZQUFZLEVBQUU7UUFDWixPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUM7S0FDekI7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLG9CQUFVLEVBQUU7UUFDaEIsSUFBSSx5Q0FBa0IsRUFBUztRQUMvQixJQUFJLHdDQUEwQixFQUFFO1FBQ2hDLElBQUksaUJBQU8sQ0FBQyxZQUFZLENBQUM7WUFDdkIsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBZSxDQUFDLENBQUM7U0FDeEQsQ0FBQztRQUNGLHlCQUF5QjtRQUN6QixZQUFZO1FBQ1osa0NBQWtDO1FBQ2xDLDRDQUE0QztRQUM1Qyx1RUFBdUU7UUFDdkUsdURBQXVEO1FBQ3ZELEtBQUs7UUFDTCxJQUFJLGlCQUFPLENBQUMsaUJBQWlCLENBQUMsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFHLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQztLQUN4RTtDQUNGLENBQUM7QUFDRixrQkFBZSxNQUFNLENBQUMifQ==