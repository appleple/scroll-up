'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasClass = exports.addCSSToElement = exports.getUniqId = exports.removeClass = exports.addClass = exports.getScrollTop = undefined;

var _crypto = require('crypto');

var getScrollTop = exports.getScrollTop = function getScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
};

var addClass = exports.addClass = function addClass(element, className) {
  if (element.classList) {
    element.classList.add(className);
  } else {
    element.className += ' ' + className;
  }
};

var removeClass = exports.removeClass = function removeClass(element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else {
    element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
};

var getUniqId = exports.getUniqId = function getUniqId() {
  return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
};

var addCSSToElement = exports.addCSSToElement = function addCSSToElement(element, css) {
  var id = getUniqId();
  element.setAttribute('id', id);
  try {
    document.styleSheets[0].insertRule('#' + id + '{' + css + '}');
  } catch (e) {
    if (e.message === 'IndexSizeError') {
      document.styleSheets[0].addRule('#' + id, css, 0);
    }
  }
};

var hasClass = exports.hasClass = function hasClass(el, className) {
  if (el.classList) {
    el.classList.contains(className);
  } else {
    new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  }
};