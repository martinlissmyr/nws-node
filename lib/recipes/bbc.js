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
    "h1"
  ],
  supplier: "BBC",
  image: function() {
    return "";
  },
  body: function() {
    return this.$("#main-content .story-body").html();
  }
});
