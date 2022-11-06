import mysql from "mysql2/promise";

export default async function handler(req, res) {
  console.log("Req:", Object.keys(req));
  res.status(200);
  /*const connection = await mysql.createConnection({
    host: "database-2.ckjhqgljq1zg.eu-central-1.rds.amazonaws.com",
    user: "admin",
    port: "3306",
    database: "university",
    password: "PopCorn123+",
  });

  try {
    const query = "SELECT * from student";
    const values = [];
    const [students] = await connection.execute(query, values);
    connection.end();

    res.status(200).json({ students });
  } catch (err) {
    console.log("Error quering database!", err);
  }*/
}
