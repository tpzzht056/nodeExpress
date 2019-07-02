import mysql from 'mysql';
import redis from 'redis';

export let mysqlPoolOptions: mysql.PoolConfig = {
    host: 'a',
    port: 3306,
    user: 'root',
    password: 'n',
    database: 'db',
    connectTimeout: 10,
    connectionLimit: 200
};

export let redisOptions: redis.ClientOpts = {
    port: 6379,
    host: 'localhost',
    password: 'dsfsdf',
    db: 10
};

