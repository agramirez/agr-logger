/** testing agr-logger-helpers.internal.getLevel function */
'use strict';

var helpers = require('../lib/agr-logger-helpers.js').internal;

exports.getLevel = {
  setUp: function (done) {
    done();
  },
  'no args': function (test) {
    var data, expected, actual;

    data = null;
    expected = 0;
    actual = helpers.getLevel();

    test.expect(1);
    test.equal(actual, expected, 'should return 0');
    test.done();
  },
  'empty array': function (test) {
    var data, expected, actual;

    data = [];
    expected = 0;
    actual = helpers.getLevel(data);

    test.expect(1);
    test.equal(actual, expected, 'should return 0');
    test.done();
  },
  'array with 4 items': function (test) {
    var data, expected, actual;

    data = [1,2,3,4];
    expected = 4;
    actual = helpers.getLevel(data);

    test.expect(1);
    test.equal(actual, expected, 'should return proper numbers');
    test.done();
  }
};
