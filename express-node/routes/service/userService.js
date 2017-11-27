// npm install string-template --save (append at package.json)
var fmt = require("string-template");
var db = require('mysql');
var conn = db.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	port     : 3306,
	database : 'nodejs'
});

exports.login = function(param, cb){
	// db select
	excute("SELECT * from users where username=? and password=?", [param.username, param.password], mapper);

	function mapper(err, rows, fields){
		if (err){
			console.log('Error while performing Query.', err);
			cb();
		}

		console.log('The solution is: ', rows);

		cb(rows && rows[0]);
	}
}

function excute(sql, param, mapper){
	conn.connect(connected(sql, param, mapper));

	function connected(sql, param, mapper){
		return function(){
			var SQL = sql;
			var PARAM = param;
			var MAPPER = mapper;
			console.log(SQL, PARAM);
			
			conn.query(SQL, PARAM, function(err, rows, fields){
				MAPPER(err, rows, fields);
				
				conn.end();
			});
		};
	};
}