export const getScrollTop = () => {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
};

export const addClass = (element, className) => {
  if (element.classList) {
    element.classList.add(className);
  } else {
    element.className += ` ${className}`;
  }
};

export const removeClass = (element, className) => {
  if (element.classList) {
    element.classList.remove(className);
  } else {
    element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
};

export const getUniqId = () => {
  return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
};

export const addCSSToElement = (element, css) => {
  const id = getUniqId();
  element.setAttribute('id', id);
  try {
    document.styleSheets[0].insertRule(`#${id}{${css}}`);
  } catch (e) {
    if (e.message === 'IndexSizeError') {
      document.styleSheets[0].addRule(`#${id}`, css, 0);
    }
  }
};

export const hasClass = (el, className) => {
  if (el.classList) {
    el.classList.contains(className);
  } else {
    new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  }
}
