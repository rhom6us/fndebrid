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
    use: [loaders_1.tsLoader]
};
exports.reactTypescriptRule = {
    test: /\.tsx?$/i,
    //include: /node_modules/i,
    use: ['react-hot-loader/webpack', loaders_1.tsLoader]
};
exports.scriptRule = {
    test: /\.(j|t)sx?$/i,
    exclude: /node_modules/,
    use: [loaders_1.babelLoader]
};
exports.nodeRule = {
    test: /\.node$/i,
    use: "node-loader"
};
exports.globalStylesheetRule = {
    test: /\b(global|vars)\.s?css$/i,
    use: __spreadArrays((settings_1.isDev ? [loaders_1.cssHotLoader] : []), [
        MiniCssExtractPlugin.loader,
        loaders_1.cssLoader,
        loaders_1.postcssLoader,
        loaders_1.sassLoader
    ])
};
exports.stylesheetRule = {
    test: /\.s?css$/i,
    exclude: /\b(global|vars)\.s?css$/i,
    use: __spreadArrays((settings_1.isDev ? [loaders_1.cssHotModuleLoader] : []), [
        MiniCssExtractPlugin.loader,
        loaders_1.cssModuleLoader,
        loaders_1.postcssLoader,
        loaders_1.sassLoader
    ])
};
exports.imageRule = {
    test: /\.(png|jpg|gif)$/i,
    use: [loaders_1.imageLoader]
};
exports.fontRule = {
    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
    use: [loaders_1.fontLoader]
};
exports.htmlRule = {
    test: /\.(html)$/i,
    use: ['html-loader']
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlncy9ydWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxxQ0FBb0s7QUFDcEssdUNBQW1DO0FBQ25DLDhEQUFpRTtBQUVwRCxRQUFBLGNBQWMsR0FBRztJQUM1QixJQUFJLEVBQUUsVUFBVTtJQUNoQixPQUFPLEVBQUUsZ0NBQWdDO0lBQ3pDLEdBQUcsRUFBRSxDQUFDLGtCQUFRLENBQUM7Q0FDaEIsQ0FBQTtBQUNZLFFBQUEsbUJBQW1CLEdBQUc7SUFDakMsSUFBSSxFQUFFLFVBQVU7SUFDaEIsMkJBQTJCO0lBQzNCLEdBQUcsRUFBRSxDQUFDLDBCQUEwQixFQUFFLGtCQUFRLENBQUM7Q0FDNUMsQ0FBQTtBQUNZLFFBQUEsVUFBVSxHQUFHO0lBQ3hCLElBQUksRUFBRSxjQUFjO0lBQ3BCLE9BQU8sRUFBRSxjQUFjO0lBQ3ZCLEdBQUcsRUFBRSxDQUFDLHFCQUFXLENBQUM7Q0FDbkIsQ0FBQTtBQUNZLFFBQUEsUUFBUSxHQUFHO0lBQ3RCLElBQUksRUFBRSxVQUFVO0lBQ2hCLEdBQUcsRUFBRSxhQUFhO0NBQ25CLENBQUE7QUFDWSxRQUFBLG9CQUFvQixHQUFHO0lBQ2xDLElBQUksRUFBRSwwQkFBMEI7SUFDaEMsR0FBRyxpQkFDRSxDQUFDLGdCQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsc0JBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDaEMsb0JBQW9CLENBQUMsTUFBTTtRQUMzQixtQkFBUztRQUNULHVCQUFhO1FBQ2Isb0JBQVU7TUFBQztDQUNkLENBQUM7QUFDVyxRQUFBLGNBQWMsR0FBRztJQUM1QixJQUFJLEVBQUUsV0FBVztJQUNqQixPQUFPLEVBQUUsMEJBQTBCO0lBQ25DLEdBQUcsaUJBQ0UsQ0FBQyxnQkFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLDRCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUN0QyxvQkFBb0IsQ0FBQyxNQUFNO1FBQzNCLHlCQUFlO1FBQ2YsdUJBQWE7UUFDYixvQkFBVTtNQUNYO0NBQ0YsQ0FBQTtBQUVZLFFBQUEsU0FBUyxHQUFHO0lBQ3ZCLElBQUksRUFBRSxtQkFBbUI7SUFDekIsR0FBRyxFQUFFLENBQUMscUJBQVcsQ0FBQztDQUNuQixDQUFBO0FBRVksUUFBQSxRQUFRLEdBQUc7SUFDdEIsSUFBSSxFQUFFLGdEQUFnRDtJQUN0RCxHQUFHLEVBQUUsQ0FBQyxvQkFBVSxDQUFDO0NBQ2xCLENBQUE7QUFFWSxRQUFBLFFBQVEsR0FBRztJQUN0QixJQUFJLEVBQUUsWUFBWTtJQUNsQixHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUM7Q0FDckIsQ0FBQSJ9