var recipe = require("../recipe");

module.exports = recipe.extend({
  pattern: /bbc\.co\.uk\/news/,
  body: function() {
    this.$("script, form").remove();
    this.$("#page-bookmark-links-head, #hypertab").remove();
    this.$("h1, .story-date, .caption, .embedded-hyper, script, .hyperpuff, .story-feature, .videoInStoryB, .comment-introduction").remove();
    return this.$("#main-content .story-body").html();
  }
});