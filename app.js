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

app.get('/', function(request, response) {
  articles.get(function(data) {
    response.render("index", { version: APP_VERSION, articles: data });
  });
});

app.get('/test', function(request, response) {
  articles.get(function(articles) {
    var articleList = request.query.source ? articles.filter(function(article) {
      return article.supplier === request.query.source;
    }) : articles;

    if (request.query.url) {
      fetch(request.query.url, function(article) {
        response.render("test", { articles: articleList, article: article, source: request.query.source });
      }, function(error) {
        console.log(error);
        response.send("An error has occured");
      });
    } else {
      response.render("test", { articles: articleList, source: request.query.source });
    }
  });

});

var server = app.listen(app.get("port"), function () {
  console.log("Express server listening on port " + server.address().port);
});
