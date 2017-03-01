var cheerio = require('cheerio');
var _ = require("lodash");
var util = require("./util");
var sanitizeHtml = require("sanitize-html");

module.exports = {
  extend: function(obj) {
    return _.merge({}, {
      pattern: /.*/,
      supplier: "",
      cook: function(html, url) {
        var json = {
          url: url
        };

        var $ = this.$ = cheerio.load(html);

        json.title = this.title();

        if (!json.title) {
          return null;
        }

        var img = this.image();
        if (img) {
          json.image = img;
        }

        _.each(this.swaps, function(to, from) {
          var tags = $(from);
          tags.each(function(i, tag) {
            var oldTag = $(tag);
            var newTagHtml = "";

            newTagHtml += "<" + to.tagName;
            _.each(to.attributeSwaps, function(to, from) {
              newTagHtml += " " + to + "='" + oldTag.attr(from) + "'";
            });
            newTagHtml += "></" + to.tagName + ">";

            var newTag = $.parseHTML(newTagHtml);
            $(newTag).text(oldTag.text());
            oldTag.replaceWith(newTag);
          });
        });

        // Clean before getting body text but after title and image
        this.removeJunk(); 
        var body = this.body();
        if (!body) {
          return null;
        }

        json.body = sanitizeHtml(body, {
          allowedTags: [
            "p",
            "blockquote",
            "h2",
            "a",
            "ul",
            "ol",
            "li",
            "img",
            "span",
            "picture"
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
      swaps: {},
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
