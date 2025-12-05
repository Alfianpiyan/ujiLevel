import mysql from "mysql2/promise";

export default async function connection() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_ujian",
  });

  return conn;
}
