"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wrap_1 = __importDefault(require("../use/wrap"));
let router = express_1.default.Router();
router.get('/', wrap_1.default(async (req, res, next) => {
    let code = req.query.code;
    if (!code) {
        res.status(403).json({
            message: '缺少相应参数，无法进入'
        });
        return;
    }
}));
exports.default = router;

//# sourceMappingURL=../../maps/route/exampleRoute.js.map
