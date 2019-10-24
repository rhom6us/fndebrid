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
Object.defineProperty(exports, "__esModule", { value: true });
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var path_1 = __importDefault(require("path"));
var common_1 = require("./common");
var rules_1 = require("./rules");
var settings_1 = require("./settings");
console.log("configuring renderer with a basepath of '" + path_1.default.resolve('.') + "'");
exports.rendererConfig = __assign(__assign({}, common_1.config), { target: 'electron-renderer', entry: __spreadArrays([
        'react-hot-loader/patch'
    ], common_1.config.entry), resolve: __assign(__assign({}, common_1.config.resolve), { extensions: ['.js', '.ts', '.tsx', '.json', '.node', '.css', '.scss'] }), module: __assign(__assign({}, common_1.config.module), { rules: __spreadArrays(common_1.config.module.rules, [
            rules_1.nodeRule,
            rules_1.globalStylesheetRule,
            rules_1.stylesheetRile,
            rules_1.imageRule,
            rules_1.fontRule,
            rules_1.htmlRule,
        ]) }), plugins: __spreadArrays(common_1.config.plugins, [
        new html_webpack_plugin_1.default({
            title: "Webpack App",
            // template: `!!html-loader?minimize=false&url=false!${path.resolve(rendererSourceDir, 'template.html')}`,
            "filename": "index" + ".html",
            // "chunks": [entry],
            inject: true,
            // "compile": true,
            chunks: "all",
        }),
        new mini_css_extract_plugin_1.default({
            filename: '[id].styles.css',
            chunkFilename: '[id].styles.css',
        }),
    ]), devServer: {
        contentBase: [
            settings_1.staticSourceDir,
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
    } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlncy9yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRFQUFvRDtBQUNwRCxvRkFBMkQ7QUFDM0QsOENBQXdCO0FBRXhCLG1DQUFrQztBQUNsQyxpQ0FBd0c7QUFDeEcsdUNBQTZDO0FBSTdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsOENBQTRDLGNBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQUcsQ0FBQyxDQUFDO0FBQ2pFLFFBQUEsY0FBYyx5QkFDdEIsZUFBTSxLQUNULE1BQU0sRUFBRSxtQkFBbUIsRUFDM0IsS0FBSztRQUNILHdCQUF3QjtPQUNyQixlQUFNLENBQUMsS0FBaUIsR0FFN0IsT0FBTyx3QkFDRixlQUFNLENBQUMsT0FBTyxLQUNqQixVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsS0FFdkUsTUFBTSx3QkFDRCxlQUFNLENBQUMsTUFBTSxLQUNoQixLQUFLLGlCQUNBLGVBQU0sQ0FBQyxNQUFNLENBQUMsS0FBSztZQUN0QixnQkFBUTtZQUNSLDRCQUFvQjtZQUNwQixzQkFBYztZQUNkLGlCQUFTO1lBQ1QsZ0JBQVE7WUFDUixnQkFBUTtlQUdaLE9BQU8saUJBQ0YsZUFBTSxDQUFDLE9BQU87UUFDakIsSUFBSSw2QkFBaUIsQ0FBQztZQUNwQixLQUFLLEVBQUUsYUFBYTtZQUNwQiwwR0FBMEc7WUFDMUcsVUFBVSxFQUFLLE9BQU8sVUFBTztZQUM3QixxQkFBcUI7WUFDckIsTUFBTSxFQUFFLElBQUk7WUFDWixtQkFBbUI7WUFDbkIsTUFBTSxFQUFFLEtBQUs7U0FHZCxDQUFDO1FBQ0YsSUFBSSxpQ0FBb0IsQ0FBQztZQUN2QixRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLGFBQWEsRUFBRSxpQkFBaUI7U0FFakMsQ0FBQztRQUVKLFNBQVMsRUFBRTtRQUNULFdBQVcsRUFBRTtZQUNYLDBCQUFlO1NBRWhCO1FBQ0QsSUFBSSxFQUFFLFdBQVc7UUFDakIsSUFBSSxFQUFFLElBQUk7UUFDVixHQUFHLEVBQUUsSUFBSTtRQUNULE9BQU8sRUFBRSxJQUFJO1FBQ2IsSUFBSSxFQUFFLEtBQUs7UUFDWCxNQUFNLEVBQUUsSUFBSTtRQUNaLEtBQUssRUFBRSxTQUFTO1FBQ2hCLGFBQWE7UUFDYixXQUFXO1FBQ1gsa0JBQWtCO1FBQ2xCLGFBQWE7UUFDYiwwREFBMEQ7UUFDMUQsTUFBTTtRQUNOLDBDQUEwQztRQUMxQywwREFBMEQ7UUFDMUQsSUFBSTtLQUNMLElBRUQifQ==