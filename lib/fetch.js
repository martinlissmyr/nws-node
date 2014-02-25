var requireDir = require('require-dir');
var url = require("url");
var util = require("./util");
var recipes = requireDir("./recipes");
var _ = require("lodash");

module.exports = {
  respond: function(request, response) {
    var url = getUrlFromPath(request);

    if (!url || url == "") {
      response.json(400, { error: "Error trying to parse URL." });
      return;
    }

    var recipe = findRecipe(url);

    if (recipe) {
      util.getHtml(url, function(html) {
        response.json(200, recipe.cook(html));
      }, function() {
        response.json(500, { error: "Fetching of source failed." });
      });
    } else {
      response.json(501, { error: "Source not supported." });
    }

    return;
  }
}

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
