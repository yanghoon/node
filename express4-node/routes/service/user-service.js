var pool = require('./data');

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

exports.findOne = function(id, cb){
	// db select
	excute("SELECT * from users where id=?", [id], mapper);

	function mapper(err, rows, fields){
		if (err){
			console.log('Error while performing Query.', err);
			cb(err);
		}

		console.log('The solution is: ', rows);

		cb(err, rows && rows[0]);
	}
}

exports.save = function(user, cb){
	if(!user.id){
		// create user
		var sql = "INSERT INTO users (username, password, displayname, created) VALUES (?, ?, ?, now())";
		excute(sql, [user.username, user.password, user.displayname], mapper);
	} else {
		// update user
//		var fields = "username,displayname".split(",");
//		for(var i in fields){
//			var key = fields[i];
//			fields[i] = key + '='
//		}
		
		var sql = "UPDATE users set username=?, displayname=?, updated=now() where id=?";
		excute(sql, [user.username, user.displayname, user.id], mapper);
	}

	function mapper(err, rows, fields){
		if (err){
			console.log('Error while performing Query.', err);
			cb();
		}

		console.log('The solution is: ', rows);

		cb(rows && rows[0]);
	}
}

/*
 * https://www.npmjs.com/package/mysql#pooling-connections
 *
 * db.createPool({...});
 * db.getConnection(function(err, conn){
 *   conn.query(function(...){
 *     ...
 *     conn.release();
 *   );
 * });
 */
function excute(sql, param, mapper){
	pool.getConnection(connected(sql, param, mapper));

	function connected(sql, param, mapper){
		return function(err, conn){
			var SQL = sql;
			var PARAM = param;
			var MAPPER = mapper;
			console.log(SQL, PARAM);

			conn.query(SQL, PARAM, function(err, rows, fields){
				MAPPER(err, rows, fields);
				conn.release();
			});
		};
	};
}


function excute2(sql, param, mapper){
	var connected = (function(sql, param, mapper){
		return function(err, conn){
			console.log(sql, param);
			conn.query(sql, param, function(err, rows, fields){
				mapper.apply(err, rows, fields);
				conn.release();
			});
		};
	}).apply(arguments);

	pool.getConnection(connected);
}

//pool.acquire(function(err, conn){
//	if(err){
//		cb(err, []);
//	} else {
//		conn.query(sql, [param.username, parma.password], function(err1, rows){
//			cb(err1, rows);
//			pool.release(conn);
//		});
//	}
//})
