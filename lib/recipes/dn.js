var recipe = require("../recipe");

module.exports = recipe.extend({
  pattern: /dn\.se/,
  remove: [
    ".displayAd",
    ".box-advert"
  ],
  title: function() {
    return this.$("meta[name='og:title']").attr("content");
  },
  body: function() {
    return this.$("#contentBody .content-paragraphs article div").html();
  },
  image: function() {
    return this.$("#article-content .photo img").attr("src");
  }
});