import express, { Request, Response, NextFunction } from 'express';
import wrap from '../use/wrap';
import axios from 'axios';
import { Status } from '../use/base';
import { baseService } from '../service/BaseService';
let router = express.Router();

router.get('/', wrap(async (req: Request, res: Response, next: NextFunction) => {
    let code = req.query.code;
    if (!code) {
        res.status(403).json({
            message: '缺少相应参数，无法进入'
        } as Status);
        return;
    }
}));

export default router;