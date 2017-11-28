
var express = require('express');
var router = express.Router();

var service = require("../service/user-service.js");

router.get('/', function(req, res){
    res.render('main');
});

module.exports = router;
