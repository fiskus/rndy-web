// vim: tabstop=2 shiftwidth=2 expandtab

function getDocument () {
  return document;
}


function createElement (tagName, classNames, opts, children) {
  var element = getDocument().createElement(tagName);

  if (typeof classNames === 'string') {
    element.classList.add(classNames);
  } else {
    (classNames || []).forEach(function (className) {
      element.classList.add(className);
    });
  }

  if (opts) {
    if (opts.text) {
      element.textContent = opts.text;
    }
    delete opts.text;

    if (opts.onClick) {
      element.addEventListener('click', opts.onClick);
    }
    delete opts.onClick;

    if (opts.onSubmit) {
      element.addEventListener('submit', opts.onSubmit);
    }
    delete opts.onSubmit;

    var keys = Object.keys(opts);
    keys.forEach(function (key) {
      element.setAttribute(key, opts[key]);
    });
  }

  children = children || [];
  if (children.length) {
    children.forEach(function (child) {
      element.appendChild(child);
    });
  }

  return element;
}

exports.div = function (classNames, opts, children) {
  return createElement('div', classNames, opts, children);
};

exports.p = function (classNames, opts, children) {
  return createElement('p', classNames, opts, children);
};

exports.form = function (classNames, opts, children) {
  return createElement('form', classNames, opts, children);
};

exports.fieldset = function (classNames, opts, children) {
  return createElement('fieldset', classNames, opts, children);
};

exports.span = function (classNames, opts, children) {
  return createElement('span', classNames, opts, children);
};

exports.label = function (classNames, opts, children) {
  return createElement('label', classNames, opts, children);
};

exports.input = function (classNames, opts, children) {
  return createElement('input', classNames, opts, children);
};

exports.select = function (classNames, opts, children) {
  return createElement('select', classNames, opts, children);
};

exports.option = function (classNames, opts, children) {
  return createElement('option', classNames, opts, children);
};

exports.datalist = function (classNames, opts, children) {
  return createElement('datalist', classNames, opts, children);
};

exports.createElement = createElement;
