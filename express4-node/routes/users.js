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

// 사용자 추가화면
router.get('/signup', function(req, res){
	// dummy for ejs render
	var model = {
		title: 'Sign Up',
		user: {},
		url: ''
	};
	res.render('user', model);
});

// 사용자 추가
router.post('/', function(req, res){
	service.save(req.body, function(err, rows, fields){
		console.log(err);
		console.log(rows);
		console.log(fields);

		res.render('redirect', {message:'회원가입이 완료되었습니다.', url: '/users/login'});
	})
});

// 사용자 정보 조회
router.get('/:id', function(req, res){
	var id =  req.params.id;

	console.log(req.url, 'id ::', id);
	service.findOne(id, function(err, user, fields){
		console.log(req.url, 'user ::', user);

		if(err || !user){
			res.render('redirect', {message:'회원정보가 존재하지 않습니다.', url: '/users/login'});
			return;
		}
		
		var model = {
			title: 'Update User Info',
			user: user,
			url: id + "/update"
		};
		res.render('user', model);
	});
});

// 사용자 정보 수정
router.post('/:id/update', function(req, res){
	console.log(req.params, req.body);

	req.body.id = req.params.id;
	service.save(req.body, function(err, user, fields){
		console.log(req.url, 'user ::', user);

		if(err){
			res.render('redirect', {message:'회원정보가 존재하지 않습니다.', url: '/users/login'});
			return;
		}

		res.render('redirect', {message:'회원 정보가 수정되었습니다.', url: "/users/"+req.params.id});
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


module.exports = router;
