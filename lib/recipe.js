var cheerio = require('cheerio');
var _ = require("lodash");
var util = require("./util");

module.exports = {
  extend: function(obj) {
    return _.merge({}, {
      pattern: /.*/,
      cook: function(html) {
        var json = {};

        this.$ = cheerio.load(html);

        json.title = this.title() || "Could not fetch title";

        var img = this.image();
        if (img) {
          json.image = img;
        }

        // Clean before getting body text but after title and image
        this.removeJunk(); 
        json.body = util.clean(this.body());

        return json;
      },
      remove: [],
      removeJunk: function() {
        if (this.remove.length > 0) {
          this.$(this.remove.join(", ")).remove();
        }
      },
      image: function() {
        return this.$("meta[property='og:image']").attr("content");
      },
      title: function() {
        return this.$("meta[property='og:title']").attr("content");
      },
      body: function() {
        return "";
      }
    }, obj);
  }
};