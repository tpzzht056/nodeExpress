import mysql from 'mysql';
import redis from 'redis';

export let mysqlPoolOptions: mysql.PoolConfig = {
    host: '139.224.82.202',
    port: 3306,
    user: 'root',
    password: 'yuecai@2019',
    database: 'yuecai',
    connectTimeout: 10,
    connectionLimit: 200
};

export let redisOptions: redis.ClientOpts = {
    port: 6379,
    host: 'localhost',
    password: 'heloo2015',
    db: 8
};

