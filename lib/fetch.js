var requireDir = require('require-dir');
var url = require("url");
var util = require("./util");
var recipes = requireDir("./recipes");
var _ = require("lodash");

module.exports = {
  respond: function(request, response) {
    var url = getUrlFromPath(request);

    if (!url || url == "") {
      response.status(400).json({ error: "Error trying to parse URL." });
      return;
    }

    var recipe = findRecipe(url);

    if (recipe) {
      util.getHtml(url, function(html) {
        response.status(200).json(recipe.cook(html));
      }, function() {
        response.status(500).json({ error: "Fetching of source failed." });
      });
    } else {
      console.log("Source not supported.");
      response.status(501).json({ error: "Source not supported." });
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
