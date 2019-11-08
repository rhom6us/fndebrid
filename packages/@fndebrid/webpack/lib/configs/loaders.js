"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var postcssImport = require("postcss-import");
var postcssPresetEnv = require("postcss-preset-env");
var settings_1 = require("./settings");
exports.cssModuleLoader = {
    loader: 'css-loader',
    options: {
        importLoaders: 2,
        modules: true,
        import: true,
        sourceMap: settings_1.isDev,
    },
};
exports.cssHotLoader = {
    loader: 'css-hot-loader',
};
exports.cssHotModuleLoader = {
    loader: 'css-hot-loader',
    options: {
        cssModule: true,
    },
};
exports.cssLoader = {
    loader: 'css-loader',
    options: {
        importLoaders: 2,
        modules: false,
        sourceMap: settings_1.isDev,
    },
};
exports.sassLoader = {
    loader: 'sass-loader',
    options: {
        sourceMap: settings_1.isDev,
    },
};
exports.postcssLoader = {
    loader: 'postcss-loader',
    options: {
        ident: 'postcss',
        sourceMap: settings_1.isDev,
        plugins: function () { return [postcssImport(), postcssPresetEnv()]; },
    },
};
exports.fileLoader = {
    loader: 'file-loader?name=[name]__[hash:base64:5].[ext]',
};
exports.threadLoader = {
    loader: 'thread-loader',
};
exports.electronMainBabelLoader = {
    loader: 'babel-loader',
    options: {
        presets: [
            [
                '@babel/preset-env',
                {
                    debug: settings_1.isDev,
                    modules: false,
                    targets: {
                        electron: '6.0.12',
                    },
                },
            ],
        ],
    },
};
exports.fontLoader = {
    loader: 'url-loader',
    options: {
        name: 'fonts/[name]--[folder].[ext]',
        limit: 10240,
    },
};
exports.imageLoader = {
    loader: 'url-loader',
    options: {
        limit: 10240,
        name: 'imgs/[name]--[folder].[ext]',
    },
};
exports.tsLoader = {
    loader: 'ts-loader',
    options: {
        transpileOnly: true,
        allowTsInNodeModules: false,
    },
};
exports.jsLoader = {
    loader: 'babel-loader',
    options: {
        presets: [
            [
                '@babel/preset-env',
                {
                    debug: settings_1.isDev,
                    modules: false,
                    targets: {
                        electron: '6.0.12',
                    },
                },
            ],
        ],
    },
};
exports.babelLoader = {
    loader: 'babel-loader',
    options: {
        cacheDirectory: true,
        babelrc: false,
        presets: [
            [
                '@babel/preset-env',
                { targets: { browsers: 'last 2 versions' } },
            ],
            '@babel/preset-typescript',
            '@babel/preset-react',
        ],
        plugins: [
            // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            'react-hot-loader/babel',
        ],
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWdzL2xvYWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4Q0FBaUQ7QUFDakQscURBQXdEO0FBQ3hELHVDQUFpQztBQUVwQixRQUFBLGVBQWUsR0FBRztJQUM3QixNQUFNLEVBQUUsWUFBWTtJQUNwQixPQUFPLEVBQUU7UUFDUCxhQUFhLEVBQUUsQ0FBQztRQUNoQixPQUFPLEVBQUUsSUFBSTtRQUNiLE1BQU0sRUFBRSxJQUFJO1FBQ1osU0FBUyxFQUFFLGdCQUFLO0tBQ2pCO0NBQ0YsQ0FBQztBQUNXLFFBQUEsWUFBWSxHQUFHO0lBQzFCLE1BQU0sRUFBRSxnQkFBZ0I7Q0FDekIsQ0FBQztBQUNXLFFBQUEsa0JBQWtCLEdBQUc7SUFDaEMsTUFBTSxFQUFFLGdCQUFnQjtJQUN4QixPQUFPLEVBQUU7UUFDUCxTQUFTLEVBQUUsSUFBSTtLQUNoQjtDQUNGLENBQUM7QUFDVyxRQUFBLFNBQVMsR0FBRztJQUN2QixNQUFNLEVBQUUsWUFBWTtJQUNwQixPQUFPLEVBQUU7UUFDUCxhQUFhLEVBQUUsQ0FBQztRQUNoQixPQUFPLEVBQUUsS0FBSztRQUNkLFNBQVMsRUFBRSxnQkFBSztLQUNqQjtDQUNGLENBQUM7QUFDVyxRQUFBLFVBQVUsR0FBRztJQUN4QixNQUFNLEVBQUUsYUFBYTtJQUNyQixPQUFPLEVBQUU7UUFDUCxTQUFTLEVBQUUsZ0JBQUs7S0FDakI7Q0FDRixDQUFDO0FBQ1csUUFBQSxhQUFhLEdBQUc7SUFDM0IsTUFBTSxFQUFFLGdCQUFnQjtJQUN4QixPQUFPLEVBQUU7UUFDUCxLQUFLLEVBQUUsU0FBUztRQUNoQixTQUFTLEVBQUUsZ0JBQUs7UUFDaEIsT0FBTyxFQUFFLGNBQU0sT0FBQSxDQUFDLGFBQWEsRUFBRSxFQUFFLGdCQUFnQixFQUFFLENBQUMsRUFBckMsQ0FBcUM7S0FDckQ7Q0FDRixDQUFDO0FBQ1csUUFBQSxVQUFVLEdBQUc7SUFDeEIsTUFBTSxFQUFFLGdEQUFnRDtDQUN6RCxDQUFDO0FBQ1csUUFBQSxZQUFZLEdBQUc7SUFDMUIsTUFBTSxFQUFFLGVBQWU7Q0FDeEIsQ0FBQztBQUNXLFFBQUEsdUJBQXVCLEdBQUc7SUFDckMsTUFBTSxFQUFFLGNBQWM7SUFDdEIsT0FBTyxFQUFFO1FBQ1AsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsbUJBQW1CO2dCQUNuQjtvQkFDRSxLQUFLLEVBQUUsZ0JBQUs7b0JBQ1osT0FBTyxFQUFFLEtBQUs7b0JBQ2QsT0FBTyxFQUFFO3dCQUNQLFFBQVEsRUFBRSxRQUFRO3FCQUNuQjtpQkFDRjthQUNGO1NBQ0Y7S0FDRjtDQUNGLENBQUM7QUFDVyxRQUFBLFVBQVUsR0FBRztJQUN4QixNQUFNLEVBQUUsWUFBWTtJQUNwQixPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsOEJBQThCO1FBQ3BDLEtBQUssRUFBRSxLQUFLO0tBRWI7Q0FDRixDQUFDO0FBQ1csUUFBQSxXQUFXLEdBQUc7SUFDekIsTUFBTSxFQUFFLFlBQVk7SUFDcEIsT0FBTyxFQUFFO1FBQ1AsS0FBSyxFQUFFLEtBQUs7UUFDWixJQUFJLEVBQUUsNkJBQTZCO0tBQ3BDO0NBQ0YsQ0FBQztBQUNXLFFBQUEsUUFBUSxHQUFHO0lBQ3RCLE1BQU0sRUFBRSxXQUFXO0lBQ25CLE9BQU8sRUFBRTtRQUNQLGFBQWEsRUFBRSxJQUFJO1FBQ25CLG9CQUFvQixFQUFFLEtBQUs7S0FJNUI7Q0FDRixDQUFDO0FBRVcsUUFBQSxRQUFRLEdBQUc7SUFDdEIsTUFBTSxFQUFFLGNBQWM7SUFDdEIsT0FBTyxFQUFFO1FBQ1AsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsbUJBQW1CO2dCQUNuQjtvQkFDRSxLQUFLLEVBQUUsZ0JBQUs7b0JBQ1osT0FBTyxFQUFFLEtBQUs7b0JBQ2QsT0FBTyxFQUFFO3dCQUNQLFFBQVEsRUFBRSxRQUFRO3FCQUNuQjtpQkFDRjthQUNGO1NBQ0Y7S0FDRjtDQUNGLENBQUM7QUFFVyxRQUFBLFdBQVcsR0FBRztJQUN6QixNQUFNLEVBQUUsY0FBYztJQUN0QixPQUFPLEVBQUU7UUFDUCxjQUFjLEVBQUUsSUFBSTtRQUNwQixPQUFPLEVBQUUsS0FBSztRQUNkLE9BQU8sRUFBRTtZQUNQO2dCQUNFLG1CQUFtQjtnQkFDbkIsRUFBQyxPQUFPLEVBQUUsRUFBQyxRQUFRLEVBQUUsaUJBQWlCLEVBQUMsRUFBQzthQUN6QztZQUNELDBCQUEwQjtZQUMxQixxQkFBcUI7U0FDdEI7UUFDRCxPQUFPLEVBQUU7WUFDUCxrR0FBa0c7WUFDbEcsQ0FBQyxtQ0FBbUMsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQztZQUNyRCxDQUFDLHlDQUF5QyxFQUFFLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDO1lBQzFELHdCQUF3QjtTQUN6QjtLQUNGO0NBQ0YsQ0FBQyJ9