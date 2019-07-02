"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const stringRandom = require("string-random");
/**
 * 根据请求来确定全url，即协议、主机、源url构成的
 * @param req 请求
 */
function getFullUrl(req) {
    return 'https://' + req.hostname + req.originalUrl;
}
exports.getFullUrl = getFullUrl;
function getOrdernum() {
    let date = new Date();
    return lodash_1.default.padStart(String(date.getFullYear()), 4, '0') + lodash_1.default.padStart(String(date.getMonth() + 1), 2, '0') + lodash_1.default.padStart(String(date.getDate()), 2, '0') + stringRandom(8);
}
exports.getOrdernum = getOrdernum;
function genCsrfToken() {
    return stringRandom(32);
}
exports.genCsrfToken = genCsrfToken;

//# sourceMappingURL=../../maps/use/base.js.map
