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
        transpileOnly: settings_1.isDev,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWdzL2xvYWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4Q0FBaUQ7QUFDakQscURBQXdEO0FBQ3hELHVDQUFtQztBQUV0QixRQUFBLGVBQWUsR0FBRztJQUM3QixNQUFNLEVBQUUsWUFBWTtJQUNwQixPQUFPLEVBQUU7UUFDUCxhQUFhLEVBQUUsQ0FBQztRQUNoQixPQUFPLEVBQUUsSUFBSTtRQUNiLE1BQU0sRUFBRSxJQUFJO1FBQ1osU0FBUyxFQUFFLGdCQUFLO0tBQ2pCO0NBQ0YsQ0FBQztBQUNXLFFBQUEsWUFBWSxHQUFHO0lBQzFCLE1BQU0sRUFBRSxnQkFBZ0I7Q0FDekIsQ0FBQztBQUNXLFFBQUEsa0JBQWtCLEdBQUc7SUFDaEMsTUFBTSxFQUFFLGdCQUFnQjtJQUN4QixPQUFPLEVBQUU7UUFDUCxTQUFTLEVBQUUsSUFBSTtLQUNoQjtDQUNGLENBQUM7QUFDVyxRQUFBLFNBQVMsR0FBRztJQUN2QixNQUFNLEVBQUUsWUFBWTtJQUNwQixPQUFPLEVBQUU7UUFDUCxhQUFhLEVBQUUsQ0FBQztRQUNoQixPQUFPLEVBQUUsS0FBSztRQUNkLFNBQVMsRUFBRSxnQkFBSztLQUNqQjtDQUNGLENBQUM7QUFDVyxRQUFBLFVBQVUsR0FBRztJQUN4QixNQUFNLEVBQUUsYUFBYTtJQUNyQixPQUFPLEVBQUU7UUFDUCxTQUFTLEVBQUUsZ0JBQUs7S0FDakI7Q0FDRixDQUFDO0FBQ1csUUFBQSxhQUFhLEdBQUc7SUFDM0IsTUFBTSxFQUFFLGdCQUFnQjtJQUN4QixPQUFPLEVBQUU7UUFDUCxLQUFLLEVBQUUsU0FBUztRQUNoQixTQUFTLEVBQUUsZ0JBQUs7UUFDaEIsT0FBTyxFQUFFLGNBQU0sT0FBQSxDQUFDLGFBQWEsRUFBRSxFQUFFLGdCQUFnQixFQUFFLENBQUMsRUFBckMsQ0FBcUM7S0FDckQ7Q0FDRixDQUFDO0FBQ1csUUFBQSxVQUFVLEdBQUc7SUFDeEIsTUFBTSxFQUFFLGdEQUFnRDtDQUN6RCxDQUFDO0FBQ1csUUFBQSxZQUFZLEdBQUc7SUFDMUIsTUFBTSxFQUFFLGVBQWU7Q0FDeEIsQ0FBQztBQUNXLFFBQUEsdUJBQXVCLEdBQUc7SUFDckMsTUFBTSxFQUFFLGNBQWM7SUFDdEIsT0FBTyxFQUFFO1FBQ1AsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsbUJBQW1CO2dCQUNuQjtvQkFDRSxLQUFLLEVBQUUsZ0JBQUs7b0JBQ1osT0FBTyxFQUFFLEtBQUs7b0JBQ2QsT0FBTyxFQUFFO3dCQUNQLFFBQVEsRUFBRSxRQUFRO3FCQUNuQjtpQkFDRjthQUNGO1NBQ0Y7S0FDRjtDQUNGLENBQUM7QUFDVyxRQUFBLFVBQVUsR0FBRztJQUN4QixNQUFNLEVBQUUsWUFBWTtJQUNwQixPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsOEJBQThCO1FBQ3BDLEtBQUssRUFBRSxLQUFLO0tBRWI7Q0FDRixDQUFDO0FBQ1csUUFBQSxXQUFXLEdBQUc7SUFDekIsTUFBTSxFQUFFLFlBQVk7SUFDcEIsT0FBTyxFQUFFO1FBQ1AsS0FBSyxFQUFFLEtBQUs7UUFDWixJQUFJLEVBQUUsNkJBQTZCO0tBQ3BDO0NBQ0YsQ0FBQztBQUNXLFFBQUEsUUFBUSxHQUFHO0lBQ3RCLE1BQU0sRUFBRSxXQUFXO0lBQ25CLE9BQU8sRUFBRTtRQUNQLGFBQWEsRUFBRSxnQkFBSztLQUlyQjtDQUNGLENBQUM7QUFFVyxRQUFBLFFBQVEsR0FBRztJQUN0QixNQUFNLEVBQUUsY0FBYztJQUN0QixPQUFPLEVBQUU7UUFDUCxPQUFPLEVBQUU7WUFDUDtnQkFDRSxtQkFBbUI7Z0JBQ25CO29CQUNFLEtBQUssRUFBRSxnQkFBSztvQkFDWixPQUFPLEVBQUUsS0FBSztvQkFDZCxPQUFPLEVBQUU7d0JBQ1AsUUFBUSxFQUFFLFFBQVE7cUJBQ25CO2lCQUNGO2FBQ0Y7U0FDRjtLQUNGO0NBQ0YsQ0FBQztBQUVXLFFBQUEsV0FBVyxHQUFHO0lBQ3pCLE1BQU0sRUFBRSxjQUFjO0lBQ3RCLE9BQU8sRUFBRTtRQUNQLGNBQWMsRUFBRSxJQUFJO1FBQ3BCLE9BQU8sRUFBRSxLQUFLO1FBQ2QsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsbUJBQW1CO2dCQUNuQixFQUFFLE9BQU8sRUFBRSxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxFQUFFO2FBQzdDO1lBQ0QsMEJBQTBCO1lBQzFCLHFCQUFxQjtTQUN0QjtRQUNELE9BQU8sRUFBRTtZQUNQLGtHQUFrRztZQUNsRyxDQUFDLG1DQUFtQyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO1lBQ3ZELENBQUMseUNBQXlDLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7WUFDNUQsd0JBQXdCO1NBQ3pCO0tBQ0Y7Q0FDRixDQUFDIn0=