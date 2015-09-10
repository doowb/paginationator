'use strict';

var Base = require('base-methods');
var utils = require('./utils');

/**
 * Page constructor
 *
 * ```js
 * var page = new Page();
 * ```
 *
 * @param {Object} `page` optional page object to populate initial values.
 * @api public
 */

function Page (page) {
  Base.call(this, page);
  this.init();
}

Base.extend(Page);

/**
 * Initialize default properties
 */

Page.prototype.init = function() {
  this.idx = (typeof this.idx === 'undefined') ? 0 : this.idx;
  this.total = (typeof this.total === 'undefined') ? 1 : this.total;
  this.current = (typeof this.current === 'undefined') ? this.total : this.current;
};

/**
 * Helper property to determine if this is the first page in a list.
 */

utils.define(Page.prototype, 'isFirst', {
  get: function () {
    return this.idx === 0;
  }
});

/**
 * Helper property to determine if this is the last page in a list.
 */

utils.define(Page.prototype, 'isLast', {
  get: function () {
    return this.idx === (this.total - 1);
  }
});

/**
 * Helper property to determine if this is there is a page before this one in a list.
 */

utils.define(Page.prototype, 'hasPrevious', {
  get: function () {
    return !this.isFirst;
  }
});

/**
 * Helper property to determine if this is there is a page after this one in a list.
 */

utils.define(Page.prototype, 'hasNext', {
  get: function () {
    return !this.isLast;
  }
});

/**
 * Expose `Page`
 */

module.exports = Page;
