var cheerio = require('cheerio');
var _ = require("lodash");
var util = require("./util");

module.exports = {
  extend: function(obj) {
    return _.merge({}, {
      pattern: /.*/,
      cook: function(html) {
        this.$ = cheerio.load(html);
        this.removeAds();

        var json = {
          image: this.image(),
          title: this.title(),
          body: util.clean(this.body())
        };

        if (!json.image) {
          delete(json.image);
        }

        return json;
      },
      removeAds: function() {
        return; 
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