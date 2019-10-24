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
var webpack_config_common_1 = require("./webpack.config.common");
var rules_1 = require("./rules");
var settings_1 = require("./settings");
exports.default = __assign(__assign({}, webpack_config_common_1.config), { target: 'electron-renderer', entry: __spreadArrays([
        'react-hot-loader/patch'
    ], webpack_config_common_1.config.entry), resolve: __assign(__assign({}, webpack_config_common_1.config.resolve), { extensions: ['.tsx', '.css', '.scss'] }), module: __assign(__assign({}, webpack_config_common_1.config.module), { rules: __spreadArrays(webpack_config_common_1.config.module.rules, [
            rules_1.nodeRule,
            rules_1.globalStylesheetRule,
            rules_1.stylesheetRile,
            rules_1.imageRule,
            rules_1.fontRule,
            rules_1.htmlRule,
        ]) }), plugins: __spreadArrays(webpack_config_common_1.config.plugins, [
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay5jb25maWcucmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlncy93ZWJwYWNrLmNvbmZpZy5yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRFQUFvRDtBQUNwRCxvRkFBMkQ7QUFHM0QsaUVBQWlEO0FBQ2pELGlDQUF3RztBQUN4Ryx1Q0FBNkM7QUFJN0Msa0JBQWUsc0JBQ1YsOEJBQU0sS0FDVCxNQUFNLEVBQUUsbUJBQW1CLEVBQzNCLEtBQUs7UUFDSCx3QkFBd0I7T0FDckIsOEJBQU0sQ0FBQyxLQUFpQixHQUU3QixPQUFPLHdCQUNGLDhCQUFNLENBQUMsT0FBTyxLQUNqQixVQUFVLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxLQUV2QyxNQUFNLHdCQUNELDhCQUFNLENBQUMsTUFBTSxLQUNoQixLQUFLLGlCQUNBLDhCQUFNLENBQUMsTUFBTSxDQUFDLEtBQUs7WUFDdEIsZ0JBQVE7WUFDUiw0QkFBb0I7WUFDcEIsc0JBQWM7WUFDZCxpQkFBUztZQUNULGdCQUFRO1lBQ1IsZ0JBQVE7ZUFHWixPQUFPLGlCQUNGLDhCQUFNLENBQUMsT0FBTztRQUNqQixJQUFJLDZCQUFpQixDQUFDO1lBQ3BCLEtBQUssRUFBRSxhQUFhO1lBQ3BCLDBHQUEwRztZQUMxRyxVQUFVLEVBQUssT0FBTyxVQUFPO1lBQzdCLHFCQUFxQjtZQUNyQixNQUFNLEVBQUUsSUFBSTtZQUNaLG1CQUFtQjtZQUNuQixNQUFNLEVBQUUsS0FBSztTQUdkLENBQUM7UUFDRixJQUFJLGlDQUFvQixDQUFDO1lBQ3ZCLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsYUFBYSxFQUFFLGlCQUFpQjtTQUVqQyxDQUFDO1FBRUosU0FBUyxFQUFFO1FBQ1QsV0FBVyxFQUFFO1lBQ1gsMEJBQWU7U0FFaEI7UUFDRCxJQUFJLEVBQUUsV0FBVztRQUNqQixJQUFJLEVBQUUsSUFBSTtRQUNWLEdBQUcsRUFBRSxJQUFJO1FBQ1QsT0FBTyxFQUFFLElBQUk7UUFDYixJQUFJLEVBQUUsS0FBSztRQUNYLE1BQU0sRUFBRSxJQUFJO1FBQ1osS0FBSyxFQUFFLFNBQVM7UUFDaEIsYUFBYTtRQUNiLFdBQVc7UUFDWCxrQkFBa0I7UUFDbEIsYUFBYTtRQUNiLDBEQUEwRDtRQUMxRCxNQUFNO1FBQ04sMENBQTBDO1FBQzFDLDBEQUEwRDtRQUMxRCxJQUFJO0tBQ0wsR0FFRixDQUFDIn0=