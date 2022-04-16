import mysql from "mysql2";

let sql: mysql.Connection | null = null;
if (!sql) {
  sql = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "duombaze",
  });
}

export default sql;
