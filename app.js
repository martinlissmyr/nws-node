var express = require('express');
var http = require('http');
var path = require('path');
var fetch = require("./lib/fetch");
var feed = require("./lib/feed");
var device = require("express-device");

var app = module.exports = express();
var APP_VERSION = 6;

app.use(device.capture());

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.use(express.logger('dev'));
});

app.get("/fetch/(*)", function(request, response) {
  fetch.respond(request, response);
});

app.get("/feed", function(request, response) {
  feed.respond(request, response);
});

app.get("/manifest.mf", function(request, response) {
  response.setHeader("content-type", "text/cache-manifest");
  response.render("manifest", { version: APP_VERSION, device: request.device.type });
});

app.get('/', function(request, response){
  response.render("index", { version: APP_VERSION, device: request.device.type });
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
