var recipe = require("../recipe");

module.exports = recipe.extend({
  pattern: /svt\.se/,
  supplier: "SVT",
  remove: [
    ".nyh_share",
    ".svp_ui-tabfocus",
    ".svp_ui",
    ".svp_splash__video-live",
    ".svp_splash__inner",
    ".svp_ui-error",
    ".nyh_video-no-js__button-outer"
  ],
  "swaps": {
    "h4": {
      tagName: "h2"
    }
  },
  body: function($) {
    var lead = "<p>" +  this.$("meta[property='og:description']").attr("content") + "</p>";
    var main = this.$(".nyh_article__main").html();

    return (lead ? lead : "") + (main ? main : "");
  }
});
