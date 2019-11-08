"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
exports.isDev = process.env.NODE_ENV !== 'production';
exports.sourceDir = path_1.default.resolve('.');
// This will be running from "./packages/@fndebrid/electron-main/" or the like.
// Get back up to the root dir
exports.rootDir = path_1.default.join(exports.sourceDir, '../../../');
exports.staticSourceDir = path_1.default.join(exports.rootDir, 'static');
exports.outDir = path_1.default.join(exports.rootDir, 'dist');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlncy9zZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhDQUF3QjtBQUtYLFFBQUEsS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLFlBQVksQ0FBQztBQUM5QyxRQUFBLFNBQVMsR0FBRyxjQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBRTNDLCtFQUErRTtBQUMvRSw4QkFBOEI7QUFDakIsUUFBQSxPQUFPLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxpQkFBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBRTVDLFFBQUEsZUFBZSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsZUFBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQy9DLFFBQUEsTUFBTSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsZUFBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDIn0=