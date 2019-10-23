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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var common_1 = __importStar(require("./common"));
var loaders_1 = require("./loaders");
console.log("configuring main with a basepath of '" + path_1.default.resolve('.') + "'");
exports.mainConfig = __assign(__assign({}, common_1.default), { target: "electron-main", entry: path_1.default.resolve(common_1.mainSourceDir, "index.ts"), output: __assign(__assign({}, common_1.default.output), { path: path_1.default.resolve(common_1.mainOutDir) }), resolve: __assign(__assign({}, common_1.default.resolve), { extensions: [".js", ".ts", ".json", ".node"] }), module: {
        rules: [
            {
                test: /\.ts$/i,
                exclude: /node_modules\/(?!@fndebrid\b)/i,
                use: [loaders_1.tsLoader]
            }
        ]
    } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWdzL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBd0I7QUFFeEIsaURBQTZEO0FBQzdELHFDQUFxQztBQUdyQyxPQUFPLENBQUMsR0FBRyxDQUFDLDBDQUF3QyxjQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFHLENBQUMsQ0FBQztBQUU3RCxRQUFBLFVBQVUseUJBQ2xCLGdCQUFNLEtBQ1QsTUFBTSxFQUFFLGVBQWUsRUFDdkIsS0FBSyxFQUFFLGNBQUksQ0FBQyxPQUFPLENBQUMsc0JBQWEsRUFBRSxVQUFVLENBQUMsRUFDOUMsTUFBTSx3QkFDRCxnQkFBTSxDQUFDLE1BQU0sS0FDaEIsSUFBSSxFQUFFLGNBQUksQ0FBQyxPQUFPLENBQUMsbUJBQVUsQ0FBQyxLQUVoQyxPQUFPLHdCQUNGLGdCQUFNLENBQUMsT0FBTyxLQUNqQixVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsS0FFOUMsTUFBTSxFQUFFO1FBQ04sS0FBSyxFQUFFO1lBQ0w7Z0JBQ0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGdDQUFnQztnQkFDekMsR0FBRyxFQUFFLENBQUMsa0JBQVEsQ0FBQzthQUNoQjtTQUNGO0tBQ0YsSUFDRCJ9