import mysql from 'mysql';
import { mysqlPoolOptions } from '../config';
import logger from '../use/winstonLog';
import { resolve } from 'url';
import { connect } from 'tls';

// export let mysqlConn = mysql.createConnection(mysqlConnOptions);
let pool = mysql.createPool(mysqlPoolOptions);

/* enum MysqlType{
    SELECT = 'select',
    SAVE = 'save'
} */

export function doConnect() {
    return new Promise<mysql.PoolConnection>((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                logger.error('[mysql] - [connection error] - ' + err);
                reject(err);
            }
            resolve(conn);
        });
    });
}

export function doSql(conn: mysql.PoolConnection, sql: string, values?) {
    return new Promise<any>((resolve, reject) => {
        conn.query(sql, values, (err, result) => {
            if (err) {
                logger.error('[mysql] - [query error] - ' + err);
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

export function beginTrunsaction(conn: mysql.PoolConnection) {
    return new Promise<any>((resolve, reject) => {
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

export function commit(conn: mysql.PoolConnection) {
    return new Promise<any>((resolve, reject) => {
        conn.commit(err => {
            if (err) {
                logger.error('[mysql] - [commit error] - ' + err);
                rollback(conn);
            }
            resolve();
        });
    });
}

export function rollback(conn: mysql.PoolConnection) {
    conn.rollback(err => {
        if (err) logger.error('[mysql] - [rollback error] - ' + err);
    });
}

export async function doOneSql(sql: string, values?) {
    let conn = await doConnect();
    let result = await doSql(conn, sql, values);
    conn.end();
    return result;
}

export async function save(table: string, data: Object, idKey: string = 'id') {
    let keys = Object.keys(data); let values = keys.map(k => data[k]);
    let insertSql = `insert into ${table}(${keys.join(',')}) values (${values.map(v => '?').join(',')})`;
    if (!data[idKey]) {//没有id的直接添加
        let result = await doOneSql(insertSql, values);
        return result;
    }

    //否则先查询后修改
    let conn = await doConnect();
    let idSql = `select ${idKey} from ${table} where ${idKey} = ?`;
    let idResult = await doSql(conn, idSql, data[idKey]);
    if (idResult && idResult.length > 0) {//如果id是可查询到的，则修改
        let updateSql = `update ${table} set ${keys.filter(k => k !== idKey).map(k => `${k} = ?`).join(',')} where ${idKey} = ?`;
        values.push(data[idKey]);
        let result = await doSql(conn, updateSql, values);
        return result;
    }
    let result = await doSql(conn, insertSql, values);
    conn.end();
    return result;
}

export async function add(conn: mysql.PoolConnection, table: string, data: Object) {
    let keys = Object.keys(data); let values = keys.map(k => data[k]);
    let insertSql = `insert into ${table}(${keys.join(',')}) values (${values.map(v => '?').join(',')})`;
    let result = await doSql(conn, insertSql, values);
    return result;
}