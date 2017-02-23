var recipe = require("../recipe");

module.exports = recipe.extend({
  pattern: /dn\.se/,
  remove: [
    ".displayAd",
    ".box-advert",
    ".article-toolbar",
    ".tag-metadata",
    ".article-disclaimer__section",
    ".byline",
    ".article__meta",
    ".widget",
    ".factbox"
  ],
  supplier: "DN",
  title: function() {
    var title = this.$("meta[property='og:title']").attr("content");
    if (typeof title === "undefined") {
      return null;
    }
    return title.replace("- DN.SE", "")
  },
  body: function() {
    return this.$(".article__body").html();
  },
  image: function() {
    var src = this.$("meta[property='og:image']").attr("content");
    if (src.indexOf("dn_black") >= 0) {
      return null;
    } else {
      return src;
    }
  }
});
