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
exports.default = __assign(__assign({}, webpack_config_common_1.config), { target: 'electron-renderer', resolve: __assign(__assign({}, webpack_config_common_1.config.resolve), { extensions: __spreadArrays(webpack_config_common_1.config.resolve.extensions, [
            '.tsx', '.css', '.scss'
        ]) }), module: __assign(__assign({}, webpack_config_common_1.config.module), { rules: __spreadArrays(webpack_config_common_1.config.module.rules, [
            rules_1.reactTypescriptRule,
            rules_1.nodeRule,
            rules_1.globalStylesheetRule,
            rules_1.stylesheetRule,
            rules_1.imageRule,
            rules_1.fontRule,
            rules_1.htmlRule,
        ]) }), plugins: __spreadArrays(webpack_config_common_1.config.plugins, [
        new html_webpack_plugin_1.default({
            title: "Webpack App",
            // template: `!!html-loader?minimize=false&url=false!${path.resolve(rendererSourceDir, 'template.html')}`,
            "filename": "index" + ".html",
            // "chunks": [entry],
            inject: 'head',
            // "compile": true,
            chunks: "all",
            // excludeChunks: [],
            // "nodeModules": "C:\\dev\\fndebrid\\node_modules",
            meta: {
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
            }
        }),
        new mini_css_extract_plugin_1.default({
            filename: '[id].styles.css',
            chunkFilename: '[id].styles.css',
        }),
    ]) });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay5jb25maWcucmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlncy93ZWJwYWNrLmNvbmZpZy5yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRFQUFvRDtBQUNwRCxvRkFBMkQ7QUFHM0QsaUVBQWlEO0FBQ2pELGlDQUF5STtBQUt6SSxrQkFBZSxzQkFDViw4QkFBTSxLQUNULE1BQU0sRUFBRSxtQkFBbUIsRUFDM0IsT0FBTyx3QkFDRiw4QkFBTSxDQUFDLE9BQU8sS0FDakIsVUFBVSxpQkFDTCw4QkFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVO1lBQzVCLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTztlQUczQixNQUFNLHdCQUNELDhCQUFNLENBQUMsTUFBTSxLQUNoQixLQUFLLGlCQUNBLDhCQUFNLENBQUMsTUFBTSxDQUFDLEtBQUs7WUFDdEIsMkJBQW1CO1lBQ25CLGdCQUFRO1lBQ1IsNEJBQW9CO1lBQ3BCLHNCQUFjO1lBQ2QsaUJBQVM7WUFDVCxnQkFBUTtZQUNSLGdCQUFRO2VBR1osT0FBTyxpQkFDRiw4QkFBTSxDQUFDLE9BQU87UUFDakIsSUFBSSw2QkFBaUIsQ0FBQztZQUNwQixLQUFLLEVBQUUsYUFBYTtZQUNwQiwwR0FBMEc7WUFDMUcsVUFBVSxFQUFLLE9BQU8sVUFBTztZQUM3QixxQkFBcUI7WUFDckIsTUFBTSxFQUFFLE1BQU07WUFDZCxtQkFBbUI7WUFDbkIsTUFBTSxFQUFFLEtBQUs7WUFDYixxQkFBcUI7WUFDckIsb0RBQW9EO1lBQ3BELElBQUksRUFBRTtnQkFDSixRQUFRLEVBQUUsdURBQXVEO2FBQ2xFO1NBQ0YsQ0FBQztRQUNGLElBQUksaUNBQW9CLENBQUM7WUFDdkIsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixhQUFhLEVBQUUsaUJBQWlCO1NBRWpDLENBQUM7U0FFTCxDQUFDIn0=