const mysql = require('mysql2')

const DB_PORT = 3306
const DB_HOSR = "mysql00.cooo3yiqpu2z.ap-northeast-1.rds.amazonaws.com"
const DB_USER = "Isabelle"
const DB_PASSWORD = "20001007"
const MYSQL_DB = "assignment"

const pool = mysql.createPool({
    // host: process.env.DB_HOST,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env.MYSQL_DB,
    // waitForConnections: true,
    // connectionLimit: 10,
    // maxIdle: 10,
    // idleTimeout: 60000,
    // queueLimit: 0,
    // port: process.env.DB_PORT
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: MYSQL_DB,
    waitForConnections: true,
    port: DB_PORT
});

module.exports = pool;
