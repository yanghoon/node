/**
 * npm install generic-pool@2.5 --save
 */
var gpool = require('generic-pool');
var db    = require('mysql');

var pool = gpool({
	name: "",
	create: function(cb){
		var conn = db.createConnection({
			host     : 'localhost',
			user     : 'root',
			password : 'root',
			port     : 3306,
			database : 'nodejs',
			connectionLimit : 2
		});
		
		conn.connect(function(err){
			return cb(err, conn);
		})
	},
	diestory: function(conn){
		if(conn) conn.end();
	},
	max:15,
	min:10,
	log:true,
	idleTimeoutMillis: 600 * 1000
	
});


procesr.on('uncatughtException', (err) => {
	console.log('uncatughtException', err);
});

procesr.on('exit', (code) => {
	pool.drain(() => {pool.destoryAllNew();})
});
/*
 * module.exports = {}
 * exports        = module.exports;
 * ex) exports = {...} -> module.exports = {}
 */
module.exports = pool