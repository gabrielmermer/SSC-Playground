require('dotenv').config()
const mysql = require('mysql');

const config = mysql.createConnection({
	host: "100.93.227.35",
	port: 3306,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: "ssc"
});

config.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});

module.exports = {config}
