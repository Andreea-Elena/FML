const Sequelize = require("sequelize");
const configuration = require("../configuration.json");


const {
  database
} = configuration.development;

const mysql = require('mysql')

var con = mysql.createConnection({
  host: database.host,
  user: database.username,
  password: database.password
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE IF NOT EXISTS " + database.databasename, function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });


});

const sequelize = new Sequelize(database.databasename, database.username, database.password, {
  dialect: database.dialect,
  host: database.host,
  define: {
    timestamps: false
  }
});

module.exports = sequelize;