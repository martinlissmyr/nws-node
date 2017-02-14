const zlib = require("zlib");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

var memjs = require("memjs");
var mc = memjs.Client.create();

function get(callback) {
  mc.get("articles", function(err, data) {
    if (err) {
      console.log(err);
    } else {
      zlib.unzip(data, function(_, uncompressedData) {
        callback.call(null, JSON.parse(uncompressedData));
      });
    }
  });
}

function set(articles, callback, fail) {
  var data = JSON.stringify(articles);
  zlib.gzip(data, function(_, compressedData) {
    mc.set("articles", compressedData, function(err) {
      if (err) {
        fail.call(null, err);
      } else {
        callback.call();
      }
    });
  });
}

module.exports = {
  get: get,
  set: set
}
