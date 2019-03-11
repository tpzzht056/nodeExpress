import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import mapRouter from './route/mapRoute';

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({limit: '500mb'}));

//跨域
let corsOptions = {
	allowedHeaders: ['Content-Type', 'application/json']
}

app.use(cors(corsOptions));
app.use('/map', mapRouter);

app.use((req, res, next) => {
	res.status(404).send('404未找到');
});

export default app;