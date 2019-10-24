"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
exports.mode = process.env.NODE_ENV || 'development';
exports.isDev = exports.mode != 'production';
exports.sourceDir = path_1.default.resolve('.');
exports.app = (_a = exports.sourceDir.match(/electron-(main|renderer)[\\\/]?$/i), _a[1]);
// This will be running from ./packages / electron - (main | renderer).
// Get back up to the root dir
exports.rootDir = path_1.default.join(exports.sourceDir, '../../');
exports.staticSourceDir = path_1.default.join(exports.rootDir, 'static');
exports.outDir = path_1.default.join(exports.rootDir, 'dist', exports.app);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlncy9zZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw4Q0FBd0I7QUFDWCxRQUFBLElBQUksR0FBaUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksYUFBYSxDQUFDO0FBQzNFLFFBQUEsS0FBSyxHQUFHLFlBQUksSUFBSSxZQUFZLENBQUM7QUFDN0IsUUFBQSxTQUFTLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMzQixRQUFBLEdBQUcsSUFBTixLQUFVLGlCQUFTLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxDQUFrQyxTQUFDO0FBRTdHLHVFQUF1RTtBQUN2RSw4QkFBOEI7QUFDakIsUUFBQSxPQUFPLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxpQkFBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBRXpDLFFBQUEsZUFBZSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsZUFBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQy9DLFFBQUEsTUFBTSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsZUFBTyxFQUFFLE1BQU0sRUFBRSxXQUFHLENBQUMsQ0FBQyJ9