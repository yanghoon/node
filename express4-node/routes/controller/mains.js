var express = require('express');
var router = express.Router();
var multiparty = require("multiparty");
var path = require("path");

var service = require("../service/epl-service.js");

router.get('/', function(req, res) {
	console.log('session ::', req.session.id);

	service.getEplRank([], function(err, rows, fields) {
		res.render('main', {
			epl : rows,
			col : fields,
			title : 'EPL Rank'
		});
	})
});

router.post('/search', function(req, res) {
	var keyword = req.body.keyword || '';
	keyboard = keyword.split('%').join('');
	service.getEplRank([ '%' + keyword + '%' ], function(err, rows, fields) {
		if (err) {
			// 500 + <script>
		} else if (rows && rows.length == 0) {
			// 200 + <script>
		}
		var data = {
			epl : rows
		};
		res.json(data);
	})
});

router.get('/team/:id', function(req, res) {
	var id = req.params.id;
	service.getTeam([ id ], function(err, rows, fields) {
		if (err) {
			// 500 + <script>
		} else if (rows && rows.length == 0) {
			// 200 + <script>
		}
		
		var team = rows[0];
		if(team.homepage)
			res.redirect(team.homepage);
		else
			res.render('redirect', {message:'No homepage.', url:'/main'});
	})
});

router.post('/upload', function(req, res, next){
	var opt = {
		maxFields:10,
		uploadDir: __dirname + "../../public/upload"
	};
	var form = new multiparty.Form(opt);
	form.on('', function(){
		
	});
});

module.exports = router;
