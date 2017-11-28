var pool = require('./data');

exports.getEplRank = function(param, cb){
	// db select
	excute("SELECT * from tbl_epl", param, mapper);

	function mapper(err, rows, fields){
		if (err){
			console.log('Error while performing Query.', err);
			cb(err);
		}

		//console.log('The solution is: ', rows);

		cb(err, rows, fields);
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
