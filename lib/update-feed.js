if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

var _ = require("lodash");
var fetch = require("./fetch");
var feed = require("./feed");
var articles = require("./articles");
var articleList = [];
var itemCount = 0;
var totalItems = 0;
var done = null;

function storeArticles() {
  articles.set(articleList, function(data) {
    console.log("Stored articles");
    if (done) {
      done.call();
    }
  }, function(err) {
    console.log(err);
    if (done) {
      done.call();
    }
  });
}

function registerArticle(data) {
  itemCount++;
  if (data) {
    articleList.push(data);
  }
  if (itemCount === totalItems) {
    storeArticles();
  }
  return;
}

function fetchArticle(url) {
  fetch(url, registerArticle, function(error) {
    console.log(error);
    registerArticle();
  });
  return;
}

function fetchAllArticles(feedItems) {
  totalItems = feedItems.length;
  _.each(feedItems, function(feedItem) {
    fetchArticle(feedItem.link);
  });
  return;
}

module.exports = function(callback) {
  done = callback;
  feed.get(fetchAllArticles, function(error) {
    console.log(error);
    if (done) {
      done.call();
    }
  });
}
