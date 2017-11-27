
/*
 * GET users listing.
 */
var service = require("./service/user-service.js");

var GET  = exports.get  = {};
var POST = exports.post = {};

/* GET */
GET['/login'] = function(req, res){
	console.log('req.query', req.query);

	res.render('login');
}
GET['/users'] = function(req, res){
	res.send("respond with a resource");
}


/* POST */
POST['/login'] = function(req, res){
	console.log(req.body);
	
	// db select
	service.login(req.body, function(user){
		// create response content
		var content = "";
		if(user){
//			res.redirect('/main');
			res.writeHead(200, {'Content-Type':'text/plain;charset=UTF-8'});
			res.end("Hello, " + user.displayname);
		} else {
			//TODO: redirect to /login with username.
			res.writeHead(200, {'Content-Type':'text/html;charset=UTF-8'});
			res.end("<script>alert('Fail to login'); history.back();</script>");	
		}
	});
}