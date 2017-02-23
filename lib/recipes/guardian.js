var recipe = require("../recipe");

module.exports = recipe.extend({
  pattern: /theguardian\.com/,
  remove: [
    ".content__meta-container",
    ".block-share",
    ".submeta",
    ".caption",
    ".content__header"
  ],
  supplier: "Guardian",
  body: function() {
    var lead = "<p>" +  this.$("meta[property='og:description']").attr("content") + "</p>";
    var main = this.$("#article .content__main").html();
    return lead + main;
  }
});
