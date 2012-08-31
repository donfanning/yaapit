
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , bootstrap = require('bootstrap-stylus')
  , stylus = require('stylus')
  , mongoose = require('mongoose');

var app = express();

function compile(str, path) {
  return stylus(str)
  .set('filename', path)
  .use(bootstrap());
}

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compile
  })),
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.post('/', routes.post_index);
app.get('/paste/:token', routes.get_paste);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
