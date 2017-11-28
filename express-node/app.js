
/**
 * Module dependencies.
 */
/*
 * module load type
 * - embedded
 *     http, events, fs, ... (https://nodejs.org/dist/latest-v8.x/docs/api/)
 *     require('fs')
 * - 3rd-party
 *     npm install mysql or @packeage.json
 *     require('mysql')
 * - custom
 *     requrie('./mod')
 *     or requrie('./mod.js') 
 *     
 * module is singleton
 * require('..') can use everywhere
 */
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);

// res.render('template.path', obj_model) --> ${express.views + template.path} + ojb_model
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.favicon());
app.use(express.logger('dev'));

// process method, parameter where ...
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));  // root of static resources

// __global-variable
console.log(__dirname);
console.log(path.join(__dirname, 'public'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*
 * ld spring style(@3.x), https://examples.javacodegeeks.com/enterprise-java/spring/mvc/spring-mvc-handler-mapping-example/ 
 */
app.get('/', routes.index);
//app.get('/users', user.list);

// routes.build(method-url-handler-map, ...)
routes.build(app, user, dashboard);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
