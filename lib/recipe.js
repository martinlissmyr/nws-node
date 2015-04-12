var cheerio = require('cheerio');
var _ = require("lodash");
var util = require("./util");
var sanitizeHtml = require("sanitize-html");

module.exports = {
  extend: function(obj) {
    return _.merge({}, {
      pattern: /.*/,
      supplier: "",
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
        json.body = sanitizeHtml(this.body(), {
          allowedTags: [
            "p",
            "blockquote",
            "a",
            "ul",
            "ol",
            "li",
            "img",
            "span"
          ],
          transformTags: {
            "figcaption": function() {
              return {
                tagName: "p",
                attribs: {
                    class: "caption"
                }
              };
            }
          },
          allowedAttributes: {
            a: ["href"],
            img: ["src"],
            p: ["class"]
          },
          allowedClasses: {
            p: ["caption"]
          },
          allowedSchemes: [
            "http",
            "https"
          ],
          exclusiveFilter: function(snippet) {
            if (snippet.tag === "a" && snippet.attribs.href) {
              return snippet.attribs.href.indexOf("#") === 0;
            }
          }
        });

        json.supplier = this.supplier;

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
