var express = require("express");
var http = require("http");
var path = require("path");
var errorHandler = require("errorhandler");
var logger = require("morgan");
var hbs = require("hbs");

var articles = require("./lib/articles");
var fetch = require("./lib/fetch");
var app = module.exports = express();
var APP_VERSION = 12;

if (process.env.NODE_ENV !== "production") {
  app.use(errorHandler({ dumpExceptions: true, showStack: true }));
  app.use(logger("dev"));
}

app.set("port", process.env.PORT || 3000);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "templates"));
hbs.registerHelper("toJSON", function(obj) {
    return JSON.stringify(obj, null, 2);
});
app.use(express.static(path.join(__dirname, 'public')));

app.get("/manifest.mf", function(request, response) {
  response.setHeader("content-type", "text/cache-manifest");
  response.render("manifest", { version: APP_VERSION });
});

app.get('/', function(request, response) {
  articles.get(function(data) {
    response.render("index", { version: APP_VERSION, articles: data });
  });
});

app.get('/test', function(request, response) {
  if (!request.query.url) {
    response.send("Nothing here");
  } else {
    articles.get(function(articles) {
      fetch(request.query.url, function(article) {
        response.render("test", { articles: articles, article: article });
      }, function(error) {
        console.log(error);
        response.send("An error has occured");
      });
    });
  }
});

var server = app.listen(app.get("port"), function () {
  console.log("Express server listening on port " + server.address().port);
});
