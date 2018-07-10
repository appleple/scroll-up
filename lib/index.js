'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _es6ObjectAssign = require('es6-object-assign');

var _scrollTo = require('scroll-to');

var _scrollTo2 = _interopRequireDefault(_scrollTo);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaults = {
  offset: 200,
  displayStyle: 'block',
  transitionDuration: 0.3,
  transitionTimingFunction: 'ease-in',
  scrollDuration: 0.5
};

var ScrollUp = function ScrollUp(selector, option) {
  _classCallCheck(this, ScrollUp);

  var opt = (0, _es6ObjectAssign.assign)({}, defaults, option);
  var element = typeof selector === 'string' ? document.querySelector(selector) : selector;
  if (!element) {
    return;
  }
  element.style.display = 'none';
  (0, _util.addCSSToElement)(element, 'transition: opacity ' + opt.transitionDuration + 's ' + opt.transitionTimingFunction + ';\n    opacity: 0;');
  var timeout = false;
  window.addEventListener('scroll', function () {
    var scrollTop = (0, _util.getScrollTop)();
    if (scrollTop > opt.offset) {
      element.style.display = opt.displayStyle;
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(function () {
        if (scrollTop > opt.offset) {
          element.style.opacity = '1';
        }
      }, 1);
    } else {
      element.style.opacity = '0';
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(function () {
        if (scrollTop <= opt.offset) {
          element.style.display = 'none';
        }
      }, opt.transitionDuration * 1000);
    }
  });
  element.addEventListener('click', function () {
    (0, _scrollTo2.default)(0, 0, opt.scrollDuration);
  });
};

exports.default = ScrollUp;
module.exports = exports['default'];