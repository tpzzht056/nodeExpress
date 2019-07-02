"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const config_1 = require("../config");
const winstonLog_1 = __importDefault(require("../use/winstonLog"));
// export let mysqlConn = mysql.createConnection(mysqlConnOptions);
let pool = mysql_1.default.createPool(config_1.mysqlPoolOptions);
/* enum MysqlType{
    SELECT = 'select',
    SAVE = 'save'
} */
function doConnect() {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                winstonLog_1.default.error('[mysql] - [connection error] - ' + err);
                reject(err);
            }
            resolve(conn);
        });
    });
}
exports.doConnect = doConnect;
function doSql(conn, sql, values) {
    return new Promise((resolve, reject) => {
        conn.query(sql, values, (err, result) => {
            if (err) {
                winstonLog_1.default.error('[mysql] - [query error] - ' + err);
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}
exports.doSql = doSql;
function beginTrunsaction(conn) {
    return new Promise((resolve, reject) => {
        conn.beginTransaction((err) => {
            if (err) {
                reject();
            }
            resolve();
        });
    }).catch(err => {
        rollback(conn);
        throw err;
    });
}
exports.beginTrunsaction = beginTrunsaction;
function commit(conn) {
    return new Promise((resolve, reject) => {
        conn.commit(err => {
            if (err) {
                winstonLog_1.default.error('[mysql] - [commit error] - ' + err);
                rollback(conn);
            }
            resolve();
        });
    });
}
exports.commit = commit;
function rollback(conn) {
    conn.rollback(err => {
        if (err)
            winstonLog_1.default.error('[mysql] - [rollback error] - ' + err);
    });
}
exports.rollback = rollback;
async function doOneSql(sql, values) {
    let conn = await doConnect();
    let result = await doSql(conn, sql, values);
    conn.end();
    return result;
}
exports.doOneSql = doOneSql;
async function save(table, data, idKey = 'id') {
    let keys = Object.keys(data);
    let values = keys.map(k => data[k]);
    let insertSql = `insert into ${table}(${keys.join(',')}) values (${values.map(v => '?').join(',')})`;
    if (!data[idKey]) { //没有id的直接添加
        let result = await doOneSql(insertSql, values);
        return result;
    }
    //否则先查询后修改
    let conn = await doConnect();
    let idSql = `select ${idKey} from ${table} where ${idKey} = ?`;
    let idResult = await doSql(conn, idSql, data[idKey]);
    if (idResult && idResult.length > 0) { //如果id是可查询到的，则修改
        let updateSql = `update ${table} set ${keys.filter(k => k !== idKey).map(k => `${k} = ?`).join(',')} where ${idKey} = ?`;
        values.push(data[idKey]);
        let result = await doSql(conn, updateSql, values);
        return result;
    }
    let result = await doSql(conn, insertSql, values);
    conn.end();
    return result;
}
exports.save = save;
async function add(conn, table, data) {
    let keys = Object.keys(data);
    let values = keys.map(k => data[k]);
    let insertSql = `insert into ${table}(${keys.join(',')}) values (${values.map(v => '?').join(',')})`;
    let result = await doSql(conn, insertSql, values);
    return result;
}
exports.add = add;

//# sourceMappingURL=../../maps/dao/mysql.js.map
