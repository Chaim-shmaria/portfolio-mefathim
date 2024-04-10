require("dotenv").config();

const mysql = require("mysql");
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect((err: any) => {
  if (err) {
    console.log(`Error connecting to MySQL: \n${err.message}`);
    return;
  }
  console.log("Database connected ✅");
});

export default db;
