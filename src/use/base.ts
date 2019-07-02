import { Request } from "express";
import _ from "lodash";
import stringRandom = require("string-random");

export interface Status{
    code?: number,  //额外的返回码，如果使用的是restful的，不需要这个字段，请更换一个
    message: string,    //返回信息，跟返回码对应的信息
    [data: string]: any //其他信息返回，一般指返回数据，不可定
}

/**
 * 根据请求来确定全url，即协议、主机、源url构成的
 * @param req 请求
 */
export function getFullUrl(req: Request) {//此处强制走https协议
    return 'https://' + req.hostname + req.originalUrl;
}

export function getOrdernum() {
    let date = new Date();
    return _.padStart(String(date.getFullYear()), 4, '0') + _.padStart(String(date.getMonth() + 1), 2, '0') + _.padStart(String(date.getDate()), 2, '0') + stringRandom(8);
}

export function genCsrfToken() {
    return stringRandom(32);
}