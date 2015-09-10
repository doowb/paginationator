'use strict';

var lazy = require('lazy-cache')(require);
lazy('define-property', 'define');

module.exports = lazy;
