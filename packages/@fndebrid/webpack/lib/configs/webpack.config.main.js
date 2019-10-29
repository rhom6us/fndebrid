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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var rules_1 = require("./rules");
var webpack_config_common_1 = require("./webpack.config.common");
exports.default = __assign(__assign({}, webpack_config_common_1.config), { target: 'electron-main', stats: {
        warningsFilter: [/Can't resolve '(utf-8-validate|bufferutil)'/i, /export .* was not found in/i],
    }, module: __assign(__assign({}, webpack_config_common_1.config.module), { rules: __spreadArrays([rules_1.typescriptRule], webpack_config_common_1.config.module.rules) }) });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay5jb25maWcubWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWdzL3dlYnBhY2suY29uZmlnLm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxpQ0FBeUM7QUFDekMsaUVBQWlEO0FBRWpELGtCQUFlLHNCQUNWLDhCQUFNLEtBQ1QsTUFBTSxFQUFFLGVBQWUsRUFDdkIsS0FBSyxFQUFFO1FBQ0wsY0FBYyxFQUFFLENBQUMsOENBQThDLEVBQUUsNkJBQTZCLENBQUM7S0FDaEcsRUFDRCxNQUFNLHdCQUNELDhCQUFNLENBQUMsTUFBTSxLQUNoQixLQUFLLGtCQUFHLHNCQUFjLEdBQUssOEJBQU0sQ0FBQyxNQUFPLENBQUMsS0FBSyxPQUV6QixDQUFDIn0=