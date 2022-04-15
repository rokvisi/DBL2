import mysql from 'mysql2';

let sql: mysql.Connection | null = null;

if (!sql)
  sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'duombaze',
  });

export function execQuery(query: string) {
  return new Promise((resolve, reject) => {
    sql!.query(query, function parseResult(err, results) {
      if (err) reject(err);
      else resolve(results);
    });
  });
}
