/** Unit test for agr-logger-helpers.params() function */
'use strict';

var helpers = require('../lib/agr-logger-helpers.js');

exports.params = {
  setUp: function (done) {
    done();
  },
  'no params': function (test) {
    var expected, actual;

    expected = 'undefined';
    actual = helpers.params();

    test.expect(1);
    test.deepEqual(typeof actual, expected, 'should return undefined object');
    test.done();
  },
  'two empty objects as params': function (test) {
    var expected, actual, data = {};

    expected = data;
    actual = helpers.params(data, data);

    test.expect(1);
    test.deepEqual(actual, expected, 'should return empty object');
    test.done();
  },
  'an empty dops param and a populated ops param': function (test) {
    var expected, actual, dops, ops;

    dops = {};
    ops = { some: 'data', and: 'other' };
    expected = dops;
    actual = helpers.params(dops, ops);

    test.expect(1);
    test.deepEqual(actual, expected, 'should return empty object');
    test.done();
  },
  'a dops param with default properties not found in ops': function (test) {
    var expected, actual, dops, ops;

    dops = { myOps: 'one' };
    ops = { otherOps: 'not copied' };
    expected = dops;
    actual = helpers.params(dops, ops);

    test.expect(1);
    test.deepEqual(actual, expected, 
      'should return the dops properties and values');
    test.done();
  },
  'a dops param with default properties found in ops': function (test) {
    var expected, actual, dops, ops;

    dops = { myOps: 'one' };
    ops = { myOps: 'override' };
    expected = ops;
    actual = helpers.params(dops, ops);

    test.expect(1);
    test.deepEqual(actual, expected, 
      'should return the property values in ops and not dops');
    test.done();
  }, 
  'a dops param with some properties found in ops and ops with extra properties': function (test) {
    var expected, actual, dops, ops;

    dops = { myOps: 'one', thirdOps: 'default' };
    ops = { myOps: 'override', otherOps: 'ignore' };
    expected = { myOps: 'override', thirdOps: 'default' };
    actual = helpers.params(dops, ops);

    test.expect(1);
    test.deepEqual(actual, expected, 
      'should return values of ops that match dops properties and ignore ops properties not in dops');
    test.done();
  }
};
