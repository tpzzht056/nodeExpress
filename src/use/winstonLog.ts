import winston, { transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
const { combine, timestamp, prettyPrint, printf } = winston.format;

let logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    format: combine(timestamp(), prettyPrint()),
    transports: [
        new DailyRotateFile({
            filename: path.join('logs/error-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'error'
        }),
        new DailyRotateFile({
            filename: path.join('logs/stdout-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'info'
        }),
        new winston.transports.Console()
    ],
    exceptionHandlers: [
        new transports.File({ filename: 'logs/exception.log' })
    ]
});
logger.exitOnError = false;

export default logger;