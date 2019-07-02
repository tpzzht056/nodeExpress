"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = __importStar(require("../dao/mysql"));
class BaseService {
    async save(table, data, idKey = 'id') {
        let result = await mysql.save(table, data, idKey);
        return result;
    }
}
exports.BaseService = BaseService;
let baseService = new BaseService();
exports.baseService = baseService;

//# sourceMappingURL=../../maps/service/BaseService.js.map
