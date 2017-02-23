"use strict";
/**
 * NWS Helpers
 * -----------------
 */

var getScrollX = function() { 
  return (document.all) ? document.body.scrollLeft : window.pageXOffset; 
};

var getScrollY = function() { 
  return (document.all) ? document.body.scrollTop : window.pageYOffset; 
};

var doScroll = function(x, y) {
  var scrollx = getScrollX();
  var scrolly = getScrollY();
  if (Math.abs(scrollx - x) <= 1 && Math.abs(scrolly - y) <= 1) {
    window.scrollTo(x, y);
  } else {
    window.scrollTo(parseInt(scrollx+(x-scrollx)/2), parseInt(scrolly+(y-scrolly)/2));
    if (scrollx != getScrollX() || scrolly != getScrollY()) {
      setTimeout(function() { doScroll(x, y) }, 50);
    } else {
      window.scrollTo(x, y);
    }
  }
};

var getObjPos = function(elm, c) {
  var x = 0;
  var y = 0;
  while (elm.offsetParent) { 
    x += elm.offsetLeft; 
    y += elm.offsetTop; 
    elm = elm.offsetParent;
  }
  return ((c == "x") ? x : y);
};


module.exports = {
  scrollTo: function(obj) {
    doScroll(0, getObjPos(obj));
    return false;
  },
  closest: function(elem, selector) {
    while (elem) {
      if (elem.webkitMatchesSelector(selector)) {
        return elem;
      } else {
        elem = elem.parentNode;
      }
    }
    return false;
  }
}
