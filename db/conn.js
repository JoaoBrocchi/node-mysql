import mysql from "mysql"

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "xxxxx",
    user: "xxxx",
    password: "xxxx",
    database: "xxxx"
})

export default pool
