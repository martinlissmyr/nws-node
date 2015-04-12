var express = require('express');
var http = require('http');
var path = require('path');
var fetch = require("./lib/fetch");
var feed = require("./lib/feed");
var device = require("express-device");
var errorHandler = require("errorhandler");
var logger = require("morgan");

var app = module.exports = express();
var APP_VERSION = 9;

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

if (app.get("env") == "development") {
  app.use(errorHandler({ dumpExceptions: true, showStack: true }));
  app.use(logger("dev"));
}

app.get("/fetch/(*)", function(request, response) {
  fetch.respond(request, response);
});

app.get("/feed", function(request, response) {
  feed.respond(request, response);
});

app.get("/manifest.mf", function(request, response) {
  response.setHeader("content-type", "text/cache-manifest");
  response.render("manifest", { version: APP_VERSION });
});

app.get('/', function(request, response){
  response.render("index", { version: APP_VERSION });
});

var server = app.listen(app.get("port"), function () {
  console.log("Express server listening on port " + server.address().port);
});
