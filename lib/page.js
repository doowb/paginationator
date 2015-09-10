'use strict';

var Base = require('base-methods');
var utils = require('./utils');

function Page (page) {
  Base.call(this, page);
  this.init();
}

Base.extend(Page);

Page.prototype.init = function() {
  this.idx = (typeof this.idx === 'undefined') ? 0 : this.idx;
  this.total = (typeof this.total === 'undefined') ? 1 : this.total;
  this.current = (typeof this.current === 'undefined') ? this.total : this.current;
};

utils.define(Page.prototype, 'isFirst', {
  get: function () {
    return this.idx === 0;
  }
});

utils.define(Page.prototype, 'isLast', {
  get: function () {
    return this.idx === (this.total - 1);
  }
});

utils.define(Page.prototype, 'hasPrevious', {
  get: function () {
    return !this.isFirst;
  }
});

utils.define(Page.prototype, 'hasNext', {
  get: function () {
    return !this.isLast;
  }
});

module.exports = Page;
