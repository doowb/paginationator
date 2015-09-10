'use strict';

var Base = require('base-methods');
var Page = require('./page');
var utils = require('./utils');

function Pages (pages) {
  Base.call(this);
  this.init(pages);
}

Base.extend(Pages);

Pages.prototype.init = function(pages) {
  this.pages = [];

  if (typeof pages !== 'undefined') {
    if (!Array.isArray(pages)) {
      throw new TypeError('expected pages to be an Array');
    }
    pages.forEach(function (page) {
      this.addPage(page);
    }.bind(this));
  }
};

Pages.prototype.addPage = function(page) {
  if (!(page instanceof Page)) {
    page = new Page(page);
  }
  this.pages.push(this.decoratePage(page));
};

Pages.prototype.decoratePage = function(page) {
  var self = this;
  utils.define(page, 'first', {
    enumerable: true,
    get: function () {
      return self.first && self.first.current;
    }
  });

  utils.define(page, 'current', {
    enumerable: true,
    get: function () {
      return this.idx + 1;
    }
  });

  utils.define(page, 'last', {
    enumerable: true,
    get: function () {
      return self.last && self.last.current;
    }
  });

  utils.define(page, 'total', {
    enumerable: true,
    get: function () {
      return self.total;
    }
  });

  var prev = this.last;
  var idx = this.total;
  page.idx = idx;
  if (prev) {
    page.prev = prev.current;
    prev.next = page.current;
  }

  return page;
};

utils.define(Pages.prototype, 'total', {
  get: function () {
    return this.pages.length;
  }
});

utils.define(Pages.prototype, 'first', {
  get: function () {
    return this.total > 0 ? this.pages[0] : null;
  }
});

utils.define(Pages.prototype, 'last', {
  get: function () {
    return this.total > 0 ? this.pages[this.total - 1] : null;
  }
});

module.exports = Pages;
