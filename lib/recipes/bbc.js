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
  ],
  image: function() {
    var $img = this.$("#main-content .caption img");
    if ($img.length > 0) {
      return $img.attr("src");
    } else {
      this.$("meta[property='og:image']").attr("content");
    }
  },
  body: function() {
    return this.$("#main-content .story-body").html();
  }
});
