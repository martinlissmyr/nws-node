var recipe = require("../recipe");

module.exports = recipe.extend({
  pattern: /dn\.se/,
  remove: [
    ".displayAd",
    ".box-advert"
  ],
  supplier: "DN",
  title: function() {
    return this.$("meta[property='og:title']").attr("content").replace(" - DN.SE", "");
  },
  body: function() {
    return this.$("#contentBody .content-paragraphs article div").html();
  },
  image: function() {
    return this.$("#article-content .photo img").attr("src");
  }
});
