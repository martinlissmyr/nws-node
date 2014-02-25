var express = require('express');
var http = require('http');
var path = require('path');
var fetch = require("./lib/fetch");
var app = module.exports = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.use(express.logger('dev'));
  //app.use("/stylesheets", express.static("./tmp/stylesheets"));
  //app.use("/javascripts", express.static("./assets/javascripts"));
});

app.get("/fetch/(*)", function(request, response) {
  fetch.respond(request, response);
});

app.get('/*', function(request, response){
  response.render("index", {});
});

app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
