import { Request, Response, NextFunction } from "express";
import { RequestHandlerParams } from "express-serve-static-core";

type WrapRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;
type WrapErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => Promise<any>;
type WrapRequestHandlerParams = WrapRequestHandler | WrapErrorRequestHandler;

/**
 * wrap接住报错的扩展
 * 先确定内部参数数量，然后调用fn，如果发现报错没有被接住，则catch它并抛给下一个错误中间件(catch(err))
  */
export default function wrap(fn: WrapRequestHandlerParams) {
    if (fn.length <= 3) {
        return function(req: Request, res: Response, next: NextFunction) {
            return (fn as WrapRequestHandler)(req, res, next).catch(next);
        };
    }
    return function(err, req: Request, res: Response, next: NextFunction) {
        return (fn as WrapErrorRequestHandler)(err, req, res, next).catch(next);
    };
}