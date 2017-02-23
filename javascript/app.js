"use strict";

/**
 * NWS App
 * -----------------
 */

var itemTemplate = require("../templates/item.hbs");
var storeName = "history";
var readItems = JSON.parse(localStorage.getItem(storeName)) || [];

var addReadItem = function(url) {
  readItems.unshift(url);
  localStorage.setItem(storeName, JSON.stringify(readItems));
};

var Nws = (function($) {
  var snippets = document.querySelectorAll("[data-role=snippet]");

  snippets.forEach(function(snippet) {
    if (readItems.includes(snippet.dataset.url)) {
      snippet.classList.add("read");
    }
  });

  document.getElementById("article-list").addEventListener('click', function(e) { 
    e.preventDefault();
    
    var listItem = $.closest(e.srcElement, "li");
    var article = listItem.querySelector("[data-role=article]"); 
    var snippet = listItem.querySelector("[data-role=snippet]");
    var articleData = JSON.parse(listItem.dataset.articleData);

    article.innerHTML = itemTemplate(articleData);
    article.classList.toggle("hidden");
    snippet.classList.toggle("hidden");

    addReadItem(articleData.url);
    snippet.classList.add("read");

    $.scrollTo(listItem);
  }, false);

})(require("./helpers.js"));
