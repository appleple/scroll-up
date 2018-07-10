import { assign } from 'es6-object-assign';
import scrollTo from 'scroll-to';
import { getScrollTop, addCSSToElement } from './util';

const defaults = {
  offset: 200,
  displayStyle: 'block',
  transitionDuration: 0.3,
  transitionTimingFunction: 'ease-in',
  scrollDuration: 0.5
};

export default class ScrollUp {
  constructor(selector, option) {
    const opt = assign({}, defaults, option);
    const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (!element) {
      return;
    }
    element.style.display = 'none';
    addCSSToElement(element, `transition: opacity ${opt.transitionDuration}s ${opt.transitionTimingFunction};
    opacity: 0;`);
    let timeout = false;
    window.addEventListener('scroll', () => {
      const scrollTop = getScrollTop();
      if (scrollTop > opt.offset) {
        element.style.display = opt.displayStyle;
        if (timeout) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
          if (scrollTop > opt.offset) {
            element.style.opacity = '1';
          }
        }, 1);
      } else {
        element.style.opacity = '0';
        if (timeout) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
          if (scrollTop <= opt.offset) {
            element.style.display = 'none';
          }
        }, opt.transitionDuration * 1000);
      }
    });
    element.addEventListener('click', () => {
      scrollTo(0, 0, opt.scrollDuration);
    });
  }
}
