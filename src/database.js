const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

connection.connect((error) => {
  if (error) {
    console.error("Erreur de connexion à la base de données:", error);
    return;
  }
  console.log("Connecté à la base de données MySQL");
});

module.exports = connection;
