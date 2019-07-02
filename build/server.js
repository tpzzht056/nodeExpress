"use strict";
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
const express_1 = __importDefault(require("express"));
const winstonLog_1 = __importDefault(require("./use/winstonLog"));
const expressWinston = __importStar(require("express-winston"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const exampleRoute_1 = __importDefault(require("./route/exampleRoute"));
const helmet_1 = __importDefault(require("helmet"));
let app = express_1.default();
app.use(helmet_1.default());
app.use(expressWinston.logger({ winstonInstance: winstonLog_1.default }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(express_1.default.json({ limit: '10mb' }));
//跨域
/* let corsOptions = {
    allowedHeaders: ['Content-Type', 'application/json']
} */
/* app.use(cors(corsOptions)); */
app.use('/login', exampleRoute_1.default);
app.use((req, res, next) => {
    res.status(404).send('404未找到');
});
app.use((err, req, res, next) => {
    winstonLog_1.default.error('err: ', err);
    res.json({ code: err.code || -1, message: err.message || '特殊错误' });
});
exports.default = app;

//# sourceMappingURL=../maps/server.js.map
