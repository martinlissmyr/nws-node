var recipe = require("../recipe");

module.exports = recipe.extend({
  pattern: /svt\.se/,
  body: function($) {
    var lead = "<p>" +  this.$("meta[property='og:description']").attr("content") + "</p>";
    var main = this.$(".svtTextBread-Article").html();
    return lead + main;
  }
});