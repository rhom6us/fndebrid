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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay5yZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWdzL3dlYnBhY2sucmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0RUFBb0Q7QUFDcEQsb0ZBQTJEO0FBQzNELDhDQUF3QjtBQUV4QixtQ0FBa0M7QUFDbEMsaUNBQXdHO0FBQ3hHLHVDQUE2QztBQUk3QyxPQUFPLENBQUMsR0FBRyxDQUFDLDhDQUE0QyxjQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFHLENBQUMsQ0FBQztBQUNqRSxRQUFBLGNBQWMseUJBQ3RCLGVBQU0sS0FDVCxNQUFNLEVBQUUsbUJBQW1CLEVBQzNCLEtBQUs7UUFDSCx3QkFBd0I7T0FDckIsZUFBTSxDQUFDLEtBQWlCLEdBRTdCLE9BQU8sd0JBQ0YsZUFBTSxDQUFDLE9BQU8sS0FDakIsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLEtBRXZFLE1BQU0sd0JBQ0QsZUFBTSxDQUFDLE1BQU0sS0FDaEIsS0FBSyxpQkFDQSxlQUFNLENBQUMsTUFBTSxDQUFDLEtBQUs7WUFDdEIsZ0JBQVE7WUFDUiw0QkFBb0I7WUFDcEIsc0JBQWM7WUFDZCxpQkFBUztZQUNULGdCQUFRO1lBQ1IsZ0JBQVE7ZUFHWixPQUFPLGlCQUNGLGVBQU0sQ0FBQyxPQUFPO1FBQ2pCLElBQUksNkJBQWlCLENBQUM7WUFDcEIsS0FBSyxFQUFFLGFBQWE7WUFDcEIsMEdBQTBHO1lBQzFHLFVBQVUsRUFBSyxPQUFPLFVBQU87WUFDN0IscUJBQXFCO1lBQ3JCLE1BQU0sRUFBRSxJQUFJO1lBQ1osbUJBQW1CO1lBQ25CLE1BQU0sRUFBRSxLQUFLO1NBR2QsQ0FBQztRQUNGLElBQUksaUNBQW9CLENBQUM7WUFDdkIsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixhQUFhLEVBQUUsaUJBQWlCO1NBRWpDLENBQUM7UUFFSixTQUFTLEVBQUU7UUFDVCxXQUFXLEVBQUU7WUFDWCwwQkFBZTtTQUVoQjtRQUNELElBQUksRUFBRSxXQUFXO1FBQ2pCLElBQUksRUFBRSxJQUFJO1FBQ1YsR0FBRyxFQUFFLElBQUk7UUFDVCxPQUFPLEVBQUUsSUFBSTtRQUNiLElBQUksRUFBRSxLQUFLO1FBQ1gsTUFBTSxFQUFFLElBQUk7UUFDWixLQUFLLEVBQUUsU0FBUztRQUNoQixhQUFhO1FBQ2IsV0FBVztRQUNYLGtCQUFrQjtRQUNsQixhQUFhO1FBQ2IsMERBQTBEO1FBQzFELE1BQU07UUFDTiwwQ0FBMEM7UUFDMUMsMERBQTBEO1FBQzFELElBQUk7S0FDTCxJQUVEIn0=