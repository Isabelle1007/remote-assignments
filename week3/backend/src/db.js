const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || "mysql00.cooo3yiqpu2z.ap-northeast-1.rds.amazonaws.com",
    user: process.env.DB_USER || "Isabelle",
    password: process.env.DB_PASSWORD || "20001007",
    database: process.env.MYSQL_DB || "assignment",
    port: process.env.DB_PORT || 3306
})

module.exports = pool;
