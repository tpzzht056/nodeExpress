"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * wrap接住报错的扩展
 * 先确定内部参数数量，然后调用fn，如果发现报错没有被接住，则catch它并抛给下一个错误中间件(catch(err))
  */
function wrap(fn) {
    if (fn.length <= 3) {
        return function (req, res, next) {
            return fn(req, res, next).catch(next);
        };
    }
    return function (err, req, res, next) {
        return fn(err, req, res, next).catch(next);
    };
}
exports.default = wrap;

//# sourceMappingURL=../../maps/use/wrap.js.map
