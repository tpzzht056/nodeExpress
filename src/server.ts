import express from 'express';
import logger from './use/winstonLog';
import * as expressWinston from 'express-winston';
import cookieParser from 'cookie-parser';
import path from 'path';
import loginRouter from './route/exampleRoute';
import { Status } from './use/base';
import helmet from 'helmet';

let app = express();

app.use(helmet());
app.use(expressWinston.logger({ winstonInstance: logger }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));

//跨域
/* let corsOptions = {
    allowedHeaders: ['Content-Type', 'application/json']
} */

/* app.use(cors(corsOptions)); */
app.use('/login', loginRouter);

app.use((req, res, next) => {
    res.status(404).send('404未找到');
});

app.use((err, req, res, next) => {
    logger.error('err: ', err);
    res.json({ code: err.code || -1, message: err.message || '特殊错误' } as Status);
});

export default app;