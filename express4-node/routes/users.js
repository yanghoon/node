var express = require('express');
var router = express.Router();

var service = require("./service/user-service.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


/* GET */
router.get('/login', function(req, res){
	console.log('req.query', req.query);
	res.render('login');
});
router.get('/signup', function(req, res){
	// dummy for ejs render
	res.render('signup', {user:{}});
});
router.get('/signup/:id', function(req, res){
	var id =  req.params.id;

	console.log(req.url, 'id ::', id);
	service.findOne(id, function(err, user, fields){
		console.log(req.url, 'user ::', user);

		if(err || !user){
			res.render('redirect', {message:'회원정보가 존재하지 않습니다.', url: '/users/login'});
			return;
		}

		delete user.password;
		
		res.render('signup', {user: user});
	});
});

/* POST */
router.post('/login', function(req, res){
	console.log(req.body);

	// db select
	service.login(req.body, function(user){
		// create response content
		var content = "";
		if(user){
			res.redirect('/main');
//			res.writeHead(200, {'Content-Type':'text/plain;charset=UTF-8'});
//			res.end("Hello, " + user.displayname);
		} else {
			//TODO: redirect to /login with username.
			res.writeHead(200, {'Content-Type':'text/html;charset=UTF-7'});
			res.end("<script>alert('Fail to login'); history.back();</script>");
		}
	});
});

router.post('/signup', function(req, res){
	service.save(req.body, function(err, rows, fields){
		console.log(err);
		console.log(rows);
		console.log(fields);

		res.render('redirect', {message:'회원가입이 완료되었습니다.', url: '/users/login'});
	})
});


module.exports = router;
