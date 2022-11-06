import mysql from "mysql2/promise";

export default async function handler(req, res) {
  const query = req.query.query;

  const connection = await mysql.createConnection({
    host: "database-2.ckjhqgljq1zg.eu-central-1.rds.amazonaws.com",
    user: "admin",
    port: "3306",
    database: "university",
    password: "PopCorn123+",
  });

  try {
    const values = [];
    const [response] = await connection.execute(query, values);
    connection.end();

    res.status(200).json({ dataArray: response });
  } catch (err) {
    console.log("Error quering database!", err);
  }
}
