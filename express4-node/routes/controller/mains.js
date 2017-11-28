
var express = require('express');
var router = express.Router();

var service = require("../service/epl-service.js");

router.get('/', function(req, res){
    service.getEplRank({}, function(err, rows, fields){
      res.render('main', {epl:rows, col:fields, title: 'EPL Rank'});
    })
});

module.exports = router;
