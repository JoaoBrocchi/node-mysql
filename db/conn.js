import mysql from "mysql"

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "1234",
    database: "nodemysql1"
})

export default pool