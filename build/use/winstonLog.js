"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importStar(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const path_1 = __importDefault(require("path"));
const { combine, timestamp, prettyPrint, printf } = winston_1.default.format;
let logger = winston_1.default.createLogger({
    levels: winston_1.default.config.syslog.levels,
    format: combine(timestamp(), prettyPrint()),
    transports: [
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join('logs/error-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'error'
        }),
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join('logs/stdout-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'info'
        }),
        new winston_1.default.transports.Console()
    ],
    exceptionHandlers: [
        new winston_1.transports.File({ filename: 'logs/exception.log' })
    ]
});
logger.exitOnError = false;
exports.default = logger;

//# sourceMappingURL=../../maps/use/winstonLog.js.map
