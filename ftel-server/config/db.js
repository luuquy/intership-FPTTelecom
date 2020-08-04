const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123q@",
  database: "myproject",
  port: 3306,
});

module.exports = db;
