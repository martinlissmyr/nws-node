var recipe = require("../recipe");

module.exports = recipe.extend({
  pattern: /bbc\.co\.uk\/news/,
  remove: [
    ".bbccom_advert_placeholder",
    ".audioInStoryC",
    ".correspondent-portrait",
    "#slideshow_container",
    ".social-links",
    ".media-placeholder",
    ".story-date",
    ".embedded-hyper",
    ".hyperpuff",
    ".story-feature",
    ".videoInStoryB",
    ".comment-introduction",
    ".sps-twitter_module",
    "#page-bookmark-links-head",
    "#hypertab",
    ".ns_datapic_stat",
    "[alt='line']",
    ".mini-info-list",
    "#card-priorities",
    "div[style='display: none;']",
    ".story-image-copyright",
    ".off-screen",
    ".media-with-caption__caption"
  ],
  swaps: {
    "div.js-delayed-image-load": {
      tagName: "img",
      attributeSwaps: {
        "data-src": "src"
      }
    }
  },
  supplier: "BBC",
  title: function() {
    var title = this.$("meta[property='og:title']").attr("content");
    if (typeof title === "undefined") {
      return null;
    }
    return title.replace("- BBC News", "")
  },
  body: function() {
    return this.$("#page .story-body__inner").html();
  }
});
