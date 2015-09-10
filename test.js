/*!
 * paginationator <https://github.com/doowb/paginationator>
 *
 * Copyright (c) 2015 .
 * Licensed under the MIT license.
 */

'use strict';

/* deps:mocha */
var assert = require('assert');
var should = require('should');

var paginationator = require('./');
var Pages = paginationator.Pages;
var Page = paginationator.Page;

describe('paginationator', function () {
  it('should paginate array using defaults', function () {
    var pages = paginationator([
      {name: 'item-1-1'}, {name: 'item-1-2'}, {name: 'item-1-3'}, {name: 'item-1-4'}, {name: 'item-1-5'}, {name: 'item-1-6'}, {name: 'item-1-7'}, {name: 'item-1-8'}, {name: 'item-1-9'}, {name: 'item-1-10'},
      {name: 'item-2-1'}, {name: 'item-2-2'}, {name: 'item-2-3'}, {name: 'item-2-4'}, {name: 'item-2-5'}, {name: 'item-2-6'}, {name: 'item-2-7'}, {name: 'item-2-8'}, {name: 'item-2-9'}, {name: 'item-2-10'},
      {name: 'item-3-1'}, {name: 'item-3-2'}, {name: 'item-3-3'}, {name: 'item-3-4'}, {name: 'item-3-5'}, {name: 'item-3-6'}, {name: 'item-3-7'}, {name: 'item-3-8'}, {name: 'item-3-9'}, {name: 'item-3-10'},
      {name: 'item-4-1'}, {name: 'item-4-2'}, {name: 'item-4-3'}, {name: 'item-4-4'}, {name: 'item-4-5'}, {name: 'item-4-6'}, {name: 'item-4-7'}, {name: 'item-4-8'}, {name: 'item-4-9'}, {name: 'item-4-10'},
    ]);
    pages.should.deepEqual({
      pages: [
        {current: 1, first: 1, idx: 0, last: 4, next: 2, total: 4, items: [{name: 'item-1-1'}, {name: 'item-1-2'}, {name: 'item-1-3'}, {name: 'item-1-4'}, {name: 'item-1-5'}, {name: 'item-1-6'}, {name: 'item-1-7'}, {name: 'item-1-8'}, {name: 'item-1-9'}, {name: 'item-1-10'}]},
        {current: 2, first: 1, idx: 1, last: 4, next: 3, prev: 1, total: 4, items: [{name: 'item-2-1'}, {name: 'item-2-2'}, {name: 'item-2-3'}, {name: 'item-2-4'}, {name: 'item-2-5'}, {name: 'item-2-6'}, {name: 'item-2-7'}, {name: 'item-2-8'}, {name: 'item-2-9'}, {name: 'item-2-10'}]},
        {current: 3, first: 1, idx: 2, last: 4, next: 4, prev: 2, total: 4, items: [{name: 'item-3-1'}, {name: 'item-3-2'}, {name: 'item-3-3'}, {name: 'item-3-4'}, {name: 'item-3-5'}, {name: 'item-3-6'}, {name: 'item-3-7'}, {name: 'item-3-8'}, {name: 'item-3-9'}, {name: 'item-3-10'}]},
        {current: 4, first: 1, idx: 3, last: 4, prev: 3, total: 4, items: [{name: 'item-4-1'}, {name: 'item-4-2'}, {name: 'item-4-3'}, {name: 'item-4-4'}, {name: 'item-4-5'}, {name: 'item-4-6'}, {name: 'item-4-7'}, {name: 'item-4-8'}, {name: 'item-4-9'}, {name: 'item-4-10'}]}
      ]
    });
  });

  describe('Page', function () {
    it('should create a new instance of Page with defaults', function () {
      var page = new Page();
      page.should.deepEqual({idx: 0, total: 1, current: 1});
    });

    it('should create a new instance of Page with provided page', function () {
      var page = new Page({idx: 5, total: 10, current: 6});
      page.should.deepEqual({idx: 5, total: 10, current: 6});
    });

    it('should calculate correct positional values when first', function () {
      var page = new Page({idx: 0, total: 10, current: 1});
      page.isFirst.should.equal(true);
      page.hasPrevious.should.equal(false);
      page.hasNext.should.equal(true);
      page.isLast.should.equal(false);
    });

    it('should calculate correct positional values when last', function () {
      var page = new Page({idx: 9, total: 10, current: 10});
      page.isFirst.should.equal(false);
      page.hasPrevious.should.equal(true);
      page.hasNext.should.equal(false);
      page.isLast.should.equal(true);
    });

    it('should calculate correct positional values when in the middle', function () {
      var page = new Page({idx: 5, total: 10, current: 6});
      page.isFirst.should.equal(false);
      page.hasPrevious.should.equal(true);
      page.hasNext.should.equal(true);
      page.isLast.should.equal(false);
    });
  });

  describe('Pages', function () {
    it('should create a new instance of Pages', function () {
      var pages = new Pages();
      pages.should.deepEqual({pages: []});
    });

    it('should create a new instance of Pages with provided pages', function () {
      var pages = new Pages([
        {name: 'page-1'},
        {name: 'page-2'},
        {name: 'page-3'},
        {name: 'page-4'}
      ]);
      pages.should.deepEqual({
        pages: [
          {current: 1, first: 1, idx: 0, last: 4, next: 2, total: 4, name: 'page-1'},
          {current: 2, first: 1, idx: 1, last: 4, next: 3, prev: 1, total: 4, name: 'page-2'},
          {current: 3, first: 1, idx: 2, last: 4, next: 4, prev: 2, total: 4, name: 'page-3'},
          {current: 4, first: 1, idx: 3, last: 4, prev: 3, total: 4, name: 'page-4'}
        ]
      });
    });

    it('should update page information when new pages are added', function () {
      var pages = new Pages([
        {name: 'page-1'},
        {name: 'page-2'},
        {name: 'page-3'},
        {name: 'page-4'}
      ]);
      pages.addPage({name: 'page-5'});

      pages.should.deepEqual({
        pages: [
          {current: 1, first: 1, idx: 0, last: 5, next: 2, total: 5, name: 'page-1'},
          {current: 2, first: 1, idx: 1, last: 5, next: 3, prev: 1, total: 5, name: 'page-2'},
          {current: 3, first: 1, idx: 2, last: 5, next: 4, prev: 2, total: 5, name: 'page-3'},
          {current: 4, first: 1, idx: 3, last: 5, next: 5, prev: 3, total: 5, name: 'page-4'},
          {current: 5, first: 1, idx: 4, last: 5, prev: 4, total: 5, name: 'page-5'}
        ]
      });
    });
  });
});
