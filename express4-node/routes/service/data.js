// npm install string-template --save (append at package.json)
var db = require('mysql');
//var pool = db.createPool({
//	host     : 'localhost',
//	user     : 'root',
//	password : 'root',
//	port     : 3306,
//	database : 'nodejs',
//	connectionLimit : 2
//});

var pool = db.createPool({
	host     : 'nodejs.cuyco8ttcdqt.ap-northeast-2.rds.amazonaws.com',
	user     : 'root',
	password : 'root',
	port     : 3306,
	database : 'nodejs',
	connectionLimit : 2
});

module.exports = pool;
