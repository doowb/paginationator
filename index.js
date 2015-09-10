/*!
 * paginationator <https://github.com/doowb/paginationator>
 *
 * Copyright (c) 2015, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

var utils = require('./lib/utils');
var Pages = require('./lib/pages');
var Page = require('./lib/page');

module.exports = function paginationator(arr, options) {
  if (!Array.isArray(arr)) {
    throw new TypeError('expected arr to be an Array');
  }
  options = options || {};
  var limit = options.limit || 10;
  var total = Math.ceil(arr.length / limit);
  var i = 0;

  var pages = new Pages(), page = new Page();
  while (i < total) {
    var start = i * limit;
    var end = start + limit;
    page.items = arr.slice(start, end);
    pages.addPage(page);
    i++;
    page = new Page();
  }
  return pages;
};

module.exports.Pages = Pages;
module.exports.Page = Page;
