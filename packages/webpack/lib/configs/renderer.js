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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var path_1 = __importDefault(require("path"));
var common_1 = __importStar(require("./common"));
var loaders_1 = require("./loaders");
console.log("configuring renderer with a basepath of '" + path_1.default.resolve('.') + "'");
exports.rendererConfig = __assign(__assign({}, common_1.default), { target: 'electron-renderer', entry: {
        renderer: [
            // 'css-hot-loader/hotModuleReplacement',
            'react-hot-loader/patch',
            path_1.default.resolve(common_1.rendererSourceDir, 'index.tsx')
        ]
    }, output: __assign(__assign({}, common_1.default.output), { path: path_1.default.resolve(common_1.rendererOutDir) }), 
    // externals: [
    //   'path',
    //   'util',
    //   'fs',
    //   'electron'
    // ],
    resolve: __assign(__assign({}, common_1.default.resolve), { extensions: ['.js', '.ts', '.tsx', '.json', '.node', '.css', '.scss'] }), module: {
        rules: [
            {
                test: /\.node$/i,
                use: "node-loader"
            }, {
                test: /\b(global|vars)\.s?css$/i,
                use: __spreadArrays((common_1.isDev ? [loaders_1.cssHotLoader] : []), [
                    mini_css_extract_plugin_1.default.loader,
                    loaders_1.cssLoader,
                    loaders_1.postcssLoader,
                    loaders_1.sassLoader
                ])
            }, {
                test: /\.s?css$/i,
                exclude: /\b(global|vars)\.s?css$/i,
                use: __spreadArrays((common_1.isDev ? [loaders_1.cssHotModuleLoader] : []), [
                    mini_css_extract_plugin_1.default.loader,
                    loaders_1.cssModuleLoader,
                    loaders_1.postcssLoader,
                    loaders_1.sassLoader
                ])
            }, {
                test: /\.(png|jpg|gif)$/i,
                use: [loaders_1.imageLoader]
            }, {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
                use: [loaders_1.fontLoader]
            }, {
                test: /\.(html)$/i,
                use: ['html-loader']
            }, {
                test: /\.tsx?$/,
                exclude: /node_modules\/(?!@fndebrid\b)/i,
                use: [loaders_1.tsLoader]
            }
        ]
    }, plugins: __spreadArrays(common_1.default.plugins, (['renderer'].map(function (entry) { return new html_webpack_plugin_1.default({
        title: "Webpack App",
        // template: `!!html-loader?minimize=false&url=false!${path.resolve(rendererSourceDir, 'template.html')}`,
        "filename": "index" + ".html",
        // "chunks": [entry],
        inject: true,
        // "compile": true,
        chunks: "all",
    }); })), [
        new mini_css_extract_plugin_1.default({
            filename: '[id].styles.css',
            chunkFilename: '[id].styles.css',
        }),
    ]), devServer: {
        contentBase: [
            path_1.default.resolve(common_1.staticSourceDir),
            path_1.default.resolve(common_1.outDir, 'renderer-dll')
        ],
        host: 'localhost',
        port: 9080,
        hot: true,
        overlay: true,
        open: false,
        noInfo: true,
        stats: 'minimal'
        // before() {
        //   spawn(
        //     'electron',
        //     ['.'],
        //     { shell: true, env: process.env, stdio: 'inherit' }
        //   )
        //   .on('close', code => process.exit(0))
        //   .on('error', spawnError => console.error(spawnError))
        // }
    }, optimization: __assign({}, common_1.default.optimization) });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlncy9yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0RUFBb0Q7QUFDcEQsb0ZBQTJEO0FBQzNELDhDQUF3QjtBQUV4QixpREFBcUc7QUFDckcscUNBQWlLO0FBS2pLLE9BQU8sQ0FBQyxHQUFHLENBQUMsOENBQTRDLGNBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQUcsQ0FBQyxDQUFDO0FBQ2pFLFFBQUEsY0FBYyx5QkFDdEIsZ0JBQU0sS0FDVCxNQUFNLEVBQUUsbUJBQW1CLEVBQzNCLEtBQUssRUFBRTtRQUNMLFFBQVEsRUFBRTtZQUNSLHlDQUF5QztZQUN6Qyx3QkFBd0I7WUFDeEIsY0FBSSxDQUFDLE9BQU8sQ0FBQywwQkFBaUIsRUFBRSxXQUFXLENBQUM7U0FDN0M7S0FDRixFQUNELE1BQU0sd0JBQ0QsZ0JBQU0sQ0FBQyxNQUFNLEtBQ2hCLElBQUksRUFBRSxjQUFJLENBQUMsT0FBTyxDQUFDLHVCQUFjLENBQUM7SUFFcEMsZUFBZTtJQUNmLFlBQVk7SUFDWixZQUFZO0lBQ1osVUFBVTtJQUNWLGVBQWU7SUFDZixLQUFLO0lBRUwsT0FBTyx3QkFDRixnQkFBTSxDQUFDLE9BQU8sS0FDakIsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLEtBRXZFLE1BQU0sRUFBRTtRQUNOLEtBQUssRUFBRTtZQUlGO2dCQUNILElBQUksRUFBRSxVQUFVO2dCQUNoQixHQUFHLEVBQUUsYUFBYTthQUNuQixFQUFFO2dCQUNELElBQUksRUFBRSwwQkFBMEI7Z0JBQ2hDLEdBQUcsaUJBQ0UsQ0FBQyxjQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsc0JBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7b0JBQ2hDLGlDQUFvQixDQUFDLE1BQU07b0JBQzNCLG1CQUFTO29CQUNULHVCQUFhO29CQUNiLG9CQUFVO2tCQUFDO2FBQ2QsRUFBRTtnQkFDRCxJQUFJLEVBQUUsV0FBVztnQkFDakIsT0FBTyxFQUFFLDBCQUEwQjtnQkFDbkMsR0FBRyxpQkFDRSxDQUFDLGNBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyw0QkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7b0JBQ3RDLGlDQUFvQixDQUFDLE1BQU07b0JBQzNCLHlCQUFlO29CQUNmLHVCQUFhO29CQUNiLG9CQUFVO2tCQUNYO2FBQ0YsRUFBRTtnQkFDRCxJQUFJLEVBQUUsbUJBQW1CO2dCQUN6QixHQUFHLEVBQUUsQ0FBQyxxQkFBVyxDQUFDO2FBQ25CLEVBQUU7Z0JBQ0QsSUFBSSxFQUFFLGdEQUFnRDtnQkFDdEQsR0FBRyxFQUFFLENBQUMsb0JBQVUsQ0FBQzthQUNsQixFQUFFO2dCQUNELElBQUksRUFBRSxZQUFZO2dCQUNsQixHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUM7YUFDckIsRUFBRTtnQkFDRCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsZ0NBQWdDO2dCQUN6QyxHQUFHLEVBQUUsQ0FBQyxrQkFBUSxDQUFDO2FBQ2hCO1NBQUM7S0FDSCxFQUNELE9BQU8saUJBQ0YsZ0JBQU0sQ0FBQyxPQUFRLEVBQ2YsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLElBQUksNkJBQWlCLENBQUM7UUFDbEQsS0FBSyxFQUFFLGFBQWE7UUFDcEIsMEdBQTBHO1FBQzFHLFVBQVUsRUFBSyxPQUFPLFVBQU87UUFDN0IscUJBQXFCO1FBQ3JCLE1BQU0sRUFBRSxJQUFJO1FBQ1osbUJBQW1CO1FBQ25CLE1BQU0sRUFBRSxLQUFLO0tBR2QsQ0FBQyxFQVY0QixDQVU1QixDQUFDLENBQUM7UUFFSixJQUFJLGlDQUFvQixDQUFDO1lBQ3ZCLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsYUFBYSxFQUFFLGlCQUFpQjtTQUVqQyxDQUFDO1FBRUosU0FBUyxFQUFFO1FBQ1QsV0FBVyxFQUFFO1lBQ1gsY0FBSSxDQUFDLE9BQU8sQ0FBQyx3QkFBZSxDQUFDO1lBQzdCLGNBQUksQ0FBQyxPQUFPLENBQUMsZUFBTSxFQUFFLGNBQWMsQ0FBQztTQUNyQztRQUNELElBQUksRUFBRSxXQUFXO1FBQ2pCLElBQUksRUFBRSxJQUFJO1FBQ1YsR0FBRyxFQUFFLElBQUk7UUFDVCxPQUFPLEVBQUUsSUFBSTtRQUNiLElBQUksRUFBRSxLQUFLO1FBQ1gsTUFBTSxFQUFFLElBQUk7UUFDWixLQUFLLEVBQUUsU0FBUztRQUNoQixhQUFhO1FBQ2IsV0FBVztRQUNYLGtCQUFrQjtRQUNsQixhQUFhO1FBQ2IsMERBQTBEO1FBQzFELE1BQU07UUFDTiwwQ0FBMEM7UUFDMUMsMERBQTBEO1FBQzFELElBQUk7S0FDTCxFQUNELFlBQVksZUFDUCxnQkFBTSxDQUFDLFlBQVksS0FleEIifQ==