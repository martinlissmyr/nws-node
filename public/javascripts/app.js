/**
 * NWS App
 * -----------------
 */

 var Nws = (function($) {
  'use strict';
  var iPhone = navigator.userAgent.indexOf("iPhone") > 0;
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

  var onClick = function(e) {
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
    var exists,
        article = exists = container.parentNode.querySelector("article");

    if (!exists) {
      article = document.createElement("article");
      container.parentNode.appendChild(article);
    }

    if (container.className === "snippet") {
      $.addClass("hidden", container);
      article.addEventListener("click", onClick, false);
    } else if (articleScroll) {
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
    if (iPhone) {
      getFeed();
    } else {
      document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
      getFeed(function() {
        listScroll = new iScroll('list-wrapper', { hScrollbar: false, vScrollbar: false });
        articleScroll = new iScroll('article-wrapper');
        $.trigger("click", document.querySelector("#snippet-list li:first-child .snippet"));
      });
    }

    document.getElementById("snippet-list").addEventListener('click', function(e) { 
      e.preventDefault();
      var url = e.srcElement.dataset["url"] || e.srcElement.parentNode.dataset["url"];
      if (url) {
        var elm = document.querySelector('[data-url="' + url + '"]');

        if (iPhone) {
          getArticle(url, elm);
          $.scrollTo(elm.parentNode);
        } else {
          getArticle(url, document);
          elm.parentNode.className = "viewed";
          listScroll.scrollToElement(elm.parentNode, 400);
        }
      }

    }, false);
  }();

})(Helpers);