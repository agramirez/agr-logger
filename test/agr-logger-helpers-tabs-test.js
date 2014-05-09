/** Testing agr-logger-helpers.tabs function. */
'use strict';

var helpers = require('../lib/agr-logger-helpers.js');

exports.tabs = {
  setUp: function (done) {
    done();
  }, 
  'no args': function (test) {
    var expected, actual;

    expected = '  ';
    actual = helpers.tabs();

    test.expect(1);
    test.equal(actual, expected, 'should return a tab with two spaces');
    test.done();
  },
  'empty object': function (test) {
    var data, expected, actual;

    data = {};
    expected = '  ';
    actual = helpers.tabs(data);

    test.expect(1);
    test.equal(actual, expected, 'should return a tab with two spaces');
    test.done();
  },
  'specify 2 tabs': function (test) {
    var data, expected, actual;

    data = {count: 2};
    expected = '    ';
    actual = helpers.tabs(data);

    test.expect(1);
    test.equal(actual, expected, 'should return two tabs');
    test.done();
  },
  'tab size 4': function (test) {
    var data, expected, actual;

    data = {size: 4};
    expected = '    ';
    actual = helpers.tabs(data);

    test.expect(1);
    test.equal(actual, expected, 'should return a string with 4 spaces');
    test.done();
  },
  'symbol changed to colon': function (test) {
    var data, expected, actual;

    data = {symbol: ':'};
    expected = '::';
    actual = helpers.tabs(data);

    test.expect(1);
    test.equal(actual, expected, 'should return two colons');
    test.done();
  },
  'start string is same as tab': function (test) {
    var data, expected, actual;

    data = {start: '  '};
    expected = '  ';
    actual = helpers.tabs(data);

    test.expect(1);
    test.equal(actual, expected, 'should return a tab with two spaces');
    test.done();
  },
  'start is less than tab': function (test) {
    var data, expected, actual;

    data = {count: 2, start: '  '};
    expected = '    ';
    actual = helpers.tabs(data);

    test.expect(1);
    test.equal(actual, expected, 'should return a tab with four spaces');
    test.done();
  },
  'start is greater than tab': function (test) {
    var data, expected, actual;

    data = {start: '    '};
    expected = '  ';
    actual = helpers.tabs(data);

    test.expect(1);
    test.equal(actual, expected, 'should return a tab with two spaces');
    test.done();
  },
  'object with all properties different than default': function (test) {
    var data, expected, actual;

    data = {count: 2, size: 3, symbol: ':', start: '::'};
    expected = '::::::';
    actual = helpers.tabs(data);

    test.expect(1);
    test.equal(actual, expected, 'should return a tab with two spaces');
    test.done();
  }
};
