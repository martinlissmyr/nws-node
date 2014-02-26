var recipe = require("../recipe");

module.exports = recipe.extend({
  pattern: /bbc\.co\.uk\/news/,
  body: function() {
    this.$("script, form").remove();
    this.$("#page-bookmark-links-head, #hypertab").remove();
    this.$("h1, .bbccom_advert_placeholder, .audioInStoryC, .correspondent-portrait, #slideshow_container, .social-links, .media-placeholder, .story-date, .caption, .embedded-hyper, script, .hyperpuff, .story-feature, .videoInStoryB, .byline img, .comment-introduction").remove();
    return this.$("#main-content .story-body").html();
  }
});