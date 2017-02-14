var requireDir = require('require-dir');
var url = require("url");
var util = require("./util");
var recipes = requireDir("./recipes");
var _ = require("lodash");

var fetch = function(url, callback, fail) {
  if (!url || url == "") {
    fail.call(null, "Error trying to parse URL.");
    return;
  }

  var recipe = findRecipe(url);

  if (recipe) {
    util.getHtml(url, function(html) {
      var data = recipe.cook(html, url);
      if (data) {
        callback.call(null, data);
      } else {
        fail.call(null, "Could not parse " + url);
      }
    }, function() {
      fail.call(null, "Fetching of source failed.");
    });
  } else {
    fail.call(null, "Source not supported.");
  }

  return;
};


var findRecipe = function(url) {
  return _.find(recipes, function(recipe) {
    return recipe.pattern.test(url);
  });
};

var getUrlFromPath = function(request) {
  var parsedPath = request.params[0];
  var query = url.parse(request.url).search;
  return parsedPath + (query ? query : "");
};

module.exports = fetch;
