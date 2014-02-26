var util = require("./util");
var feeds = require("../settings/feeds.json");
var pathsBlacklist = require("../settings/paths-blacklist.json");
var titlesBlacklist = require("../settings/titles-blacklist.json");

var YQLQuery = function() {
  var query = [];
  query.push("select title,link,description,pubDate from rss where url in(");
  query.push("'" + feeds.join("','") + "'");
  query.push(")");
  query.push(" and link not like '%" + pathsBlacklist.join("%' and link not like '%") + "%' ");
  query.push(" and title not like '%" + titlesBlacklist.join("%' and title not like '%") + "%' ");
  query.push(" | unique(field='link') | unique(field='title') | sort(field='pubDate', descending='true')");

  return query.join("");
}

var YQLEndpoint = function() {
  return "http://query.yahooapis.com/v1/public/yql?q=" + encodeURIComponent(YQLQuery()) + "&format=json";
};

module.exports = {
  respond: function(request, response) {

    util.getJSON(YQLEndpoint(), function(responseCode, data) {
      var list = [];
      for (var i in data.query.results.item) {
        list.push(data.query.results.item[i]);
      }
      response.json(200, list);
    });

    return;
  }
};