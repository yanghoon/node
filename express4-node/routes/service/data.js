// npm install string-template --save (append at package.json)
var db = require('mysql');
var pool = db.createPool({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	port     : 3306,
	database : 'nodejs',
	connectionLimit : 2
});

module.exports = pool;
