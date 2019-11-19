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
var rules_1 = require("./rules");
var webpack_config_common_1 = __importDefault(require("./webpack.config.common"));
exports.default = __assign(__assign({}, webpack_config_common_1.default), { target: 'electron-renderer', resolve: __assign(__assign({}, webpack_config_common_1.default.resolve), { extensions: __spreadArrays(webpack_config_common_1.default.resolve.extensions, ['.tsx', '.css', '.scss']) }), module: __assign(__assign({}, webpack_config_common_1.default.module), { rules: __spreadArrays(webpack_config_common_1.default.module.rules, [
            rules_1.reactTypescriptRule,
            rules_1.nodeRule,
            rules_1.globalStylesheetRule,
            rules_1.stylesheetRule,
            rules_1.imageRule,
            rules_1.fontRule,
            rules_1.htmlRule,
        ]) }), plugins: __spreadArrays(webpack_config_common_1.default.plugins, [
        new html_webpack_plugin_1.default({
            title: 'Webpack App',
            // template: `!!html-loader?minimize=false&url=false!${path.resolve(rendererSourceDir, 'template.html')}`,
            filename: 'index' + ".html",
            // "chunks": [entry],
            inject: 'head',
            // "compile": true,
            chunks: 'all',
            // excludeChunks: [],
            // "nodeModules": "C:\\dev\\fndebrid\\node_modules",
            meta: {
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
            },
        }),
        new mini_css_extract_plugin_1.default({
            filename: '[id].styles.css',
            chunkFilename: '[id].styles.css',
        }),
    ]) });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay5jb25maWcucmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlncy93ZWJwYWNrLmNvbmZpZy5yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRFQUFvRDtBQUNwRCxvRkFBMkQ7QUFHM0QsaUNBQTZIO0FBQzdILGtGQUE2QztBQUU3QyxrQkFBZSxzQkFDViwrQkFBTSxLQUNULE1BQU0sRUFBRSxtQkFBbUIsRUFDM0IsT0FBTyx3QkFDRiwrQkFBTSxDQUFDLE9BQU8sS0FDakIsVUFBVSxpQkFBTSwrQkFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLE9BRXBFLE1BQU0sd0JBQ0QsK0JBQU0sQ0FBQyxNQUFNLEtBQ2hCLEtBQUssaUJBQ0EsK0JBQU0sQ0FBQyxNQUFNLENBQUMsS0FBSztZQUN0QiwyQkFBbUI7WUFDbkIsZ0JBQVE7WUFDUiw0QkFBb0I7WUFDcEIsc0JBQWM7WUFDZCxpQkFBUztZQUNULGdCQUFRO1lBQ1IsZ0JBQVE7ZUFHWixPQUFPLGlCQUNGLCtCQUFNLENBQUMsT0FBTztRQUNqQixJQUFJLDZCQUFpQixDQUFDO1lBQ3BCLEtBQUssRUFBRSxhQUFhO1lBQ3BCLDBHQUEwRztZQUMxRyxRQUFRLEVBQUssT0FBTyxVQUFPO1lBQzNCLHFCQUFxQjtZQUNyQixNQUFNLEVBQUUsTUFBTTtZQUNkLG1CQUFtQjtZQUNuQixNQUFNLEVBQUUsS0FBSztZQUNiLHFCQUFxQjtZQUNyQixvREFBb0Q7WUFDcEQsSUFBSSxFQUFFO2dCQUNKLFFBQVEsRUFBRSx1REFBdUQ7YUFDbEU7U0FDRixDQUFDO1FBQ0YsSUFBSSxpQ0FBb0IsQ0FBQztZQUN2QixRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLGFBQWEsRUFBRSxpQkFBaUI7U0FFakMsQ0FBQztTQUVvQixDQUFDIn0=