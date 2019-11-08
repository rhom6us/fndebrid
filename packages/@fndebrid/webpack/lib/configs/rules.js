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
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var loaders_1 = require("./loaders");
var settings_1 = require("./settings");
//#region code
exports.typescriptRule = {
    test: /\.ts$/i,
    exclude: /node_modules/i,
    use: [loaders_1.tsLoader],
};
exports.reactTypescriptRule = {
    test: /\.tsx?$/i,
    exclude: /node_modules/i,
    use: ['react-hot-loader/webpack', loaders_1.tsLoader],
};
exports.scriptRule = {
    test: /\.(j|t)sx?$/i,
    exclude: /node_modules/,
    use: [loaders_1.babelLoader],
};
exports.nodeRule = {
    test: /\.node$/i,
    use: 'node-loader',
};
//#endregion
//#region styles
exports.globalStylesheetRule = {
    test: /\b(global|vars)\.s?css$/i,
    use: __spreadArrays((settings_1.isDev ? [loaders_1.cssHotLoader] : []), [mini_css_extract_plugin_1.default.loader, loaders_1.cssLoader, loaders_1.postcssLoader, loaders_1.sassLoader]),
};
exports.stylesheetRule = {
    test: /\.s?css$/i,
    exclude: /\b(global|vars)\.s?css$/i,
    use: __spreadArrays((settings_1.isDev ? [loaders_1.cssHotModuleLoader] : []), [
        mini_css_extract_plugin_1.default.loader,
        loaders_1.cssModuleLoader,
        loaders_1.postcssLoader,
        loaders_1.sassLoader,
    ]),
};
//#endregion
//#region assets
exports.imageRule = {
    test: /\.(png|jpg|gif)$/i,
    use: [loaders_1.imageLoader],
};
exports.fontRule = {
    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
    use: [loaders_1.fontLoader],
};
exports.htmlRule = {
    test: /\.(html)$/i,
    use: ['html-loader'],
};
//#endregion
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlncy9ydWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxvRkFBMkQ7QUFDM0QscUNBV21CO0FBQ25CLHVDQUFpQztBQUVqQyxjQUFjO0FBQ0QsUUFBQSxjQUFjLEdBQUc7SUFDNUIsSUFBSSxFQUFFLFFBQVE7SUFDZCxPQUFPLEVBQUUsZUFBZTtJQUN4QixHQUFHLEVBQUUsQ0FBQyxrQkFBUSxDQUFDO0NBQ2hCLENBQUM7QUFDVyxRQUFBLG1CQUFtQixHQUFHO0lBQ2pDLElBQUksRUFBRSxVQUFVO0lBQ2hCLE9BQU8sRUFBRSxlQUFlO0lBQ3hCLEdBQUcsRUFBRSxDQUFDLDBCQUEwQixFQUFFLGtCQUFRLENBQUM7Q0FDNUMsQ0FBQztBQUNXLFFBQUEsVUFBVSxHQUFHO0lBQ3hCLElBQUksRUFBRSxjQUFjO0lBQ3BCLE9BQU8sRUFBRSxjQUFjO0lBQ3ZCLEdBQUcsRUFBRSxDQUFDLHFCQUFXLENBQUM7Q0FDbkIsQ0FBQztBQUNXLFFBQUEsUUFBUSxHQUFHO0lBQ3RCLElBQUksRUFBRSxVQUFVO0lBQ2hCLEdBQUcsRUFBRSxhQUFhO0NBQ25CLENBQUM7QUFDRixZQUFZO0FBRVosZ0JBQWdCO0FBQ0gsUUFBQSxvQkFBb0IsR0FBRztJQUNsQyxJQUFJLEVBQUUsMEJBQTBCO0lBQ2hDLEdBQUcsaUJBQU0sQ0FBQyxnQkFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLHNCQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUUsaUNBQW9CLENBQUMsTUFBTSxFQUFFLG1CQUFTLEVBQUUsdUJBQWEsRUFBRSxvQkFBVSxFQUFDO0NBQzNHLENBQUM7QUFDVyxRQUFBLGNBQWMsR0FBRztJQUM1QixJQUFJLEVBQUUsV0FBVztJQUNqQixPQUFPLEVBQUUsMEJBQTBCO0lBQ25DLEdBQUcsaUJBQ0UsQ0FBQyxnQkFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLDRCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUN0QyxpQ0FBb0IsQ0FBQyxNQUFNO1FBQzNCLHlCQUFlO1FBQ2YsdUJBQWE7UUFDYixvQkFBVTtNQUNYO0NBQ0YsQ0FBQztBQUNGLFlBQVk7QUFFWixnQkFBZ0I7QUFDSCxRQUFBLFNBQVMsR0FBRztJQUN2QixJQUFJLEVBQUUsbUJBQW1CO0lBQ3pCLEdBQUcsRUFBRSxDQUFDLHFCQUFXLENBQUM7Q0FDbkIsQ0FBQztBQUVXLFFBQUEsUUFBUSxHQUFHO0lBQ3RCLElBQUksRUFBRSxnREFBZ0Q7SUFDdEQsR0FBRyxFQUFFLENBQUMsb0JBQVUsQ0FBQztDQUNsQixDQUFDO0FBRVcsUUFBQSxRQUFRLEdBQUc7SUFDdEIsSUFBSSxFQUFFLFlBQVk7SUFDbEIsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDO0NBQ3JCLENBQUM7QUFDRixZQUFZIn0=