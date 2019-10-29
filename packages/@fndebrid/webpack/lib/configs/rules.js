"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var loaders_1 = require("./loaders");
var settings_1 = require("./settings");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
exports.typescriptRule = {
    test: /\.tsx?$/i,
    exclude: /node_modules\/(?!@fndebrid\b)/i,
    use: [loaders_1.tsLoader],
};
exports.reactTypescriptRule = {
    test: /\.tsx?$/i,
    //include: /node_modules/i,
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
exports.globalStylesheetRule = {
    test: /\b(global|vars)\.s?css$/i,
    use: __spreadArrays((settings_1.isDev ? [loaders_1.cssHotLoader] : []), [MiniCssExtractPlugin.loader, loaders_1.cssLoader, loaders_1.postcssLoader, loaders_1.sassLoader]),
};
exports.stylesheetRule = {
    test: /\.s?css$/i,
    exclude: /\b(global|vars)\.s?css$/i,
    use: __spreadArrays((settings_1.isDev ? [loaders_1.cssHotModuleLoader] : []), [
        MiniCssExtractPlugin.loader,
        loaders_1.cssModuleLoader,
        loaders_1.postcssLoader,
        loaders_1.sassLoader,
    ]),
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlncy9ydWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxxQ0FXbUI7QUFDbkIsdUNBQWlDO0FBQ2pDLDhEQUFpRTtBQUVwRCxRQUFBLGNBQWMsR0FBRztJQUM1QixJQUFJLEVBQUUsVUFBVTtJQUNoQixPQUFPLEVBQUUsZ0NBQWdDO0lBQ3pDLEdBQUcsRUFBRSxDQUFDLGtCQUFRLENBQUM7Q0FDaEIsQ0FBQztBQUNXLFFBQUEsbUJBQW1CLEdBQUc7SUFDakMsSUFBSSxFQUFFLFVBQVU7SUFDaEIsMkJBQTJCO0lBQzNCLEdBQUcsRUFBRSxDQUFDLDBCQUEwQixFQUFFLGtCQUFRLENBQUM7Q0FDNUMsQ0FBQztBQUNXLFFBQUEsVUFBVSxHQUFHO0lBQ3hCLElBQUksRUFBRSxjQUFjO0lBQ3BCLE9BQU8sRUFBRSxjQUFjO0lBQ3ZCLEdBQUcsRUFBRSxDQUFDLHFCQUFXLENBQUM7Q0FDbkIsQ0FBQztBQUNXLFFBQUEsUUFBUSxHQUFHO0lBQ3RCLElBQUksRUFBRSxVQUFVO0lBQ2hCLEdBQUcsRUFBRSxhQUFhO0NBQ25CLENBQUM7QUFDVyxRQUFBLG9CQUFvQixHQUFHO0lBQ2xDLElBQUksRUFBRSwwQkFBMEI7SUFDaEMsR0FBRyxpQkFBTSxDQUFDLGdCQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsc0JBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRSxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsbUJBQVMsRUFBRSx1QkFBYSxFQUFFLG9CQUFVLEVBQUM7Q0FDM0csQ0FBQztBQUNXLFFBQUEsY0FBYyxHQUFHO0lBQzVCLElBQUksRUFBRSxXQUFXO0lBQ2pCLE9BQU8sRUFBRSwwQkFBMEI7SUFDbkMsR0FBRyxpQkFDRSxDQUFDLGdCQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsNEJBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3RDLG9CQUFvQixDQUFDLE1BQU07UUFDM0IseUJBQWU7UUFDZix1QkFBYTtRQUNiLG9CQUFVO01BQ1g7Q0FDRixDQUFDO0FBRVcsUUFBQSxTQUFTLEdBQUc7SUFDdkIsSUFBSSxFQUFFLG1CQUFtQjtJQUN6QixHQUFHLEVBQUUsQ0FBQyxxQkFBVyxDQUFDO0NBQ25CLENBQUM7QUFFVyxRQUFBLFFBQVEsR0FBRztJQUN0QixJQUFJLEVBQUUsZ0RBQWdEO0lBQ3RELEdBQUcsRUFBRSxDQUFDLG9CQUFVLENBQUM7Q0FDbEIsQ0FBQztBQUVXLFFBQUEsUUFBUSxHQUFHO0lBQ3RCLElBQUksRUFBRSxZQUFZO0lBQ2xCLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztDQUNyQixDQUFDIn0=