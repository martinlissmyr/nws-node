var recipe = require("../recipe");

var removeSelectors = [
  "h1",
  ".bbccom_advert_placeholder",
  ".audioInStoryC",
  ".correspondent-portrait",
  "#slideshow_container",
  ".social-links",
  ".media-placeholder",
  ".story-date",
  ".caption",
  ".embedded-hyper",
  "script",
  ".hyperpuff",
  ".story-feature",
  ".videoInStoryB",
  ".byline img",
  ".comment-introduction",
  "link",
  ".sps-twitter_module",
  "script",
  "form",
  "#page-bookmark-links-head",
  "#hypertab"
]

module.exports = recipe.extend({
  pattern: /bbc\.co\.uk\/news/,
  image: function() {
    var $img = this.$("#main-content .caption img");
    if ($img.length > 0) {
      return $img.attr("src");
    } else {
      this.$("meta[property='og:image']").attr("content");
    }
  },
  body: function() {
    this.$(removeSelectors.join(", ")).remove();
    return this.$("#main-content .story-body").html();
  }
});