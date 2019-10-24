"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_1 = __importDefault(require("webpack"));
var configs_1 = __importDefault(require("./configs"));
webpack_1.default(configs_1.default, function (err, stats) {
    if (err) {
        console.error(err.stack || err);
        if (err.details) {
            console.error(err.details);
        }
        return;
    }
    var info = stats.toJson();
    if (stats.hasErrors()) {
        console.error(info.errors);
    }
    // // if (stats.hasWarnings()) {
    // //   console.warn(info.warnings);
    // // }
    // console.log(stats.toString({
    //   assets: false,
    //   chunks: false,  // Makes the build much quieter
    //   colors: true    // Shows colors in the console
    // }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvREFBOEI7QUFDOUIsc0RBQStCO0FBSS9CLGlCQUFPLENBQUMsaUJBQU0sRUFBRSxVQUFDLEdBQU8sRUFBRSxLQUFLO0lBQzdCLElBQUksR0FBRyxFQUFFO1FBQ1AsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTtZQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzVCO1FBQ0QsT0FBTztLQUNSO0lBRUQsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBRTVCLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ3JCLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzVCO0lBRUQsZ0NBQWdDO0lBQ2hDLG9DQUFvQztJQUNwQyxPQUFPO0lBRVAsK0JBQStCO0lBQy9CLG1CQUFtQjtJQUNuQixvREFBb0Q7SUFDcEQsbURBQW1EO0lBQ25ELE9BQU87QUFDVCxDQUFDLENBQUMsQ0FBQSJ9