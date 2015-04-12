/**
 * NWS App
 * -----------------
 */

 var Nws = (function($) {
  'use strict';
  var listScroll;
  var articleScroll;
  var listTemplate = Handlebars.compile(document.getElementById("list-template").innerHTML);
  var articleTemplate = Handlebars.compile(document.getElementById("article-template").innerHTML);

  var getFeed = function(callback) {
    $.getJSON("feed", function(json) {
      var items = {items: json};
      document.getElementById("snippet-list").innerHTML = listTemplate(items);
      if (typeof callback !== "undefined") {
        callback.call();
      }
    });
  };

  var onArticleClick = function(e) {
    e.preventDefault(); 
    e.stopPropagation();
    if (e.srcElement.nodeName != "A") {
      var parentElm = $.closest(e.srcElement, "li");
      var snippet = parentElm.querySelector(".snippet");
      var article = parentElm.querySelector("article");
      $.addClass("hidden", article);
      $.removeClass("hidden", snippet);
      snippet.style.opacity = "0.3";
      $.scrollTo(parentElm);
    }
  };

  var getArticle = function(url, container) {
    var article = container.parentNode.querySelector("article"); 
    var exists = article;

    if (container.className === "snippet") {
      if (!exists) {
        article = document.createElement("article");
        container.parentNode.appendChild(article);
      }

      $.addClass("hidden", container);
      article.addEventListener("click", onArticleClick, false);
    } else if (articleScroll) {
      article = document.querySelector("#article");
      articleScroll.scrollTo(0, 0, 0);
    }

    if (exists) {
      $.removeClass("hidden", article);
    } else {
      article.innerHTML = "<div class=\"loader\"><span class=\"loader-thing\"><span class=\"step\"></span><span class=\"step\"></span><span class=\"step\"></span></span> Laddar...</div>";
      $.getJSON("fetch/" + url, function(json) {
        article.innerHTML = articleTemplate(json);
        if (articleScroll) {
          setTimeout(function () { articleScroll.refresh() }, 50);
        }
      });
    }
  }

  var init = function() {
    getFeed();

    document.getElementById("snippet-list").addEventListener('click', function(e) { 
      e.preventDefault();
      var url = e.srcElement.dataset["url"] || e.srcElement.parentNode.dataset["url"];
      if (url) {
        var elm = document.querySelector('[data-url="' + url + '"]');

        getArticle(url, elm);
        $.scrollTo(elm.parentNode);
      }

    }, false);
  }();

})(Helpers);
