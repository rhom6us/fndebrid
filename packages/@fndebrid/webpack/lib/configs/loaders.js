"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var postcssPresetEnv = require('postcss-preset-env');
var postcssImport = require('postcss-import');
var isDev = process.env.NODE_ENV === "development";
exports.cssModuleLoader = {
    loader: "css-loader",
    options: {
        importLoaders: 2,
        modules: true,
        import: true,
        sourceMap: isDev
    }
};
exports.cssHotLoader = {
    loader: 'css-hot-loader'
};
exports.cssHotModuleLoader = {
    loader: "css-hot-loader",
    options: {
        cssModule: true
    }
};
exports.cssLoader = {
    loader: "css-loader",
    options: {
        importLoaders: 2,
        modules: false,
        sourceMap: isDev
    }
};
exports.sassLoader = {
    loader: "sass-loader",
    options: {
        sourceMap: isDev
    }
};
exports.postcssLoader = {
    loader: 'postcss-loader',
    options: {
        ident: 'postcss',
        sourceMap: isDev,
        plugins: function () { return [postcssImport(), postcssPresetEnv()]; },
    }
};
exports.fileLoader = {
    loader: "file-loader?name=[name]__[hash:base64:5].[ext]"
};
exports.threadLoader = {
    loader: 'thread-loader'
};
exports.electronMainBabelLoader = {
    loader: 'babel-loader',
    options: {
        presets: [
            ["@babel/preset-env", {
                    debug: isDev,
                    modules: false,
                    targets: {
                        electron: "6.0.12"
                    }
                }]
        ],
    }
};
exports.fontLoader = {
    loader: 'url-loader',
    options: {
        name: "fonts/[name]--[folder].[ext]",
        limit: 10240,
    }
};
exports.imageLoader = {
    loader: 'url-loader',
    options: {
        limit: 10240,
        name: "imgs/[name]--[folder].[ext]"
    },
};
exports.tsLoader = {
    loader: "ts-loader",
    options: {
        transpileOnly: true,
        allowTsInNodeModules: false,
    }
};
exports.jsLoader = {
    loader: 'babel-loader',
    options: {
        presets: [
            [
                "@babel/preset-env", {
                    debug: isDev,
                    modules: false,
                    targets: {
                        electron: "6.0.12"
                    }
                }
            ]
        ],
    }
};
exports.babelLoader = {
    loader: "babel-loader",
    options: {
        cacheDirectory: true,
        babelrc: false,
        presets: [
            [
                "@babel/preset-env",
                { targets: { browsers: "last 2 versions" } } // or whatever your project requires
            ],
            "@babel/preset-typescript",
            "@babel/preset-react"
        ],
        plugins: [
            // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
            ["@babel/plugin-proposal-decorators", { legacy: true }],
            ["@babel/plugin-proposal-class-properties", { loose: true }],
            "react-hot-loader/babel"
        ]
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWdzL2xvYWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxJQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ3ZELElBQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBRWhELElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLGFBQWEsQ0FBQztBQUV4QyxRQUFBLGVBQWUsR0FBRztJQUM3QixNQUFNLEVBQUUsWUFBWTtJQUNwQixPQUFPLEVBQUU7UUFDUCxhQUFhLEVBQUUsQ0FBQztRQUNoQixPQUFPLEVBQUUsSUFBSTtRQUNiLE1BQU0sRUFBRSxJQUFJO1FBQ1osU0FBUyxFQUFFLEtBQUs7S0FDakI7Q0FDRixDQUFDO0FBQ1csUUFBQSxZQUFZLEdBQUc7SUFDMUIsTUFBTSxFQUFFLGdCQUFnQjtDQUN6QixDQUFDO0FBQ1csUUFBQSxrQkFBa0IsR0FBRztJQUNoQyxNQUFNLEVBQUUsZ0JBQWdCO0lBQ3hCLE9BQU8sRUFBRTtRQUNQLFNBQVMsRUFBRSxJQUFJO0tBQ2hCO0NBQ0YsQ0FBQztBQUNXLFFBQUEsU0FBUyxHQUFHO0lBQ3ZCLE1BQU0sRUFBRSxZQUFZO0lBQ3BCLE9BQU8sRUFBRTtRQUNQLGFBQWEsRUFBRSxDQUFDO1FBQ2hCLE9BQU8sRUFBRSxLQUFLO1FBQ2QsU0FBUyxFQUFFLEtBQUs7S0FDakI7Q0FDRixDQUFDO0FBQ1csUUFBQSxVQUFVLEdBQUc7SUFDeEIsTUFBTSxFQUFFLGFBQWE7SUFDckIsT0FBTyxFQUFFO1FBQ1AsU0FBUyxFQUFFLEtBQUs7S0FDakI7Q0FDRixDQUFDO0FBQ1csUUFBQSxhQUFhLEdBQUc7SUFDM0IsTUFBTSxFQUFFLGdCQUFnQjtJQUN4QixPQUFPLEVBQUU7UUFDUCxLQUFLLEVBQUUsU0FBUztRQUNoQixTQUFTLEVBQUUsS0FBSztRQUNoQixPQUFPLEVBQUUsY0FBTSxPQUFBLENBQUMsYUFBYSxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFyQyxDQUFxQztLQUNyRDtDQUNGLENBQUM7QUFDVyxRQUFBLFVBQVUsR0FBRztJQUN4QixNQUFNLEVBQUUsZ0RBQWdEO0NBQ3pELENBQUM7QUFDVyxRQUFBLFlBQVksR0FBRztJQUMxQixNQUFNLEVBQUUsZUFBZTtDQUN4QixDQUFDO0FBQ1csUUFBQSx1QkFBdUIsR0FBRztJQUNyQyxNQUFNLEVBQUUsY0FBYztJQUN0QixPQUFPLEVBQUU7UUFDUCxPQUFPLEVBQUU7WUFDUCxDQUFDLG1CQUFtQixFQUFFO29CQUNwQixLQUFLLEVBQUUsS0FBSztvQkFDWixPQUFPLEVBQUUsS0FBSztvQkFDZCxPQUFPLEVBQUU7d0JBQ1AsUUFBUSxFQUFFLFFBQVE7cUJBQ25CO2lCQUNGLENBQUM7U0FDSDtLQUNGO0NBQ0YsQ0FBQztBQUNXLFFBQUEsVUFBVSxHQUFHO0lBQ3hCLE1BQU0sRUFBRSxZQUFZO0lBQ3BCLE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSw4QkFBOEI7UUFDcEMsS0FBSyxFQUFFLEtBQUs7S0FFYjtDQUNGLENBQUM7QUFDVyxRQUFBLFdBQVcsR0FBRztJQUN6QixNQUFNLEVBQUUsWUFBWTtJQUNwQixPQUFPLEVBQUU7UUFDUCxLQUFLLEVBQUUsS0FBSztRQUNaLElBQUksRUFBRSw2QkFBNkI7S0FDcEM7Q0FDRixDQUFBO0FBQ1ksUUFBQSxRQUFRLEdBQUc7SUFDdEIsTUFBTSxFQUFFLFdBQVc7SUFDbkIsT0FBTyxFQUFFO1FBQ1AsYUFBYSxFQUFFLElBQUk7UUFDbkIsb0JBQW9CLEVBQUUsS0FBSztLQUk1QjtDQUNGLENBQUE7QUFFWSxRQUFBLFFBQVEsR0FBRztJQUN0QixNQUFNLEVBQUUsY0FBYztJQUN0QixPQUFPLEVBQUU7UUFDUCxPQUFPLEVBQUU7WUFDUDtnQkFDRSxtQkFBbUIsRUFBRTtvQkFDbkIsS0FBSyxFQUFFLEtBQUs7b0JBQ1osT0FBTyxFQUFFLEtBQUs7b0JBQ2QsT0FBTyxFQUFFO3dCQUNQLFFBQVEsRUFBRSxRQUFRO3FCQUNuQjtpQkFDRjthQUNGO1NBQ0Y7S0FDRjtDQUNGLENBQUM7QUFFVyxRQUFBLFdBQVcsR0FBRztJQUN6QixNQUFNLEVBQUUsY0FBYztJQUN0QixPQUFPLEVBQUU7UUFDUCxjQUFjLEVBQUUsSUFBSTtRQUNwQixPQUFPLEVBQUUsS0FBSztRQUNkLE9BQU8sRUFBRTtZQUNQO2dCQUNFLG1CQUFtQjtnQkFDbkIsRUFBRSxPQUFPLEVBQUUsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLG9DQUFvQzthQUNsRjtZQUNELDBCQUEwQjtZQUMxQixxQkFBcUI7U0FDdEI7UUFDRCxPQUFPLEVBQUU7WUFDUCxrR0FBa0c7WUFDbEcsQ0FBQyxtQ0FBbUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUN2RCxDQUFDLHlDQUF5QyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDO1lBQzVELHdCQUF3QjtTQUN6QjtLQUNGO0NBQ0YsQ0FBQSJ9