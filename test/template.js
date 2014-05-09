/** Tests for agr-logger-helpers.FunctionName */
'use strict';

var helpers = require('../lib/agr-logger-helpers.js').internal;

exports.constructor = {
  setUp: function(done) {
    done();
  },
  'no args': function(test) {
    var data, actual, expected;

    data = null;
    actual = 'object';
    expected = helpers.FunctionName();

    test.expect(1);
    test.equal(actual, expected, 'should work without any problems');
    test.done();
  },
  'null args': function(test) {
    var data, actual, expected;

    data = null;
    actual = 'object';
    expected = helpers.FunctionName(data);

    test.expect(1);
    test.equal(actual, expected, 'should work without any problems');
    test.done();
  },
  'single object args': function(test) {
    var data, actual, expected;

    data = {some: 'data'};
    actual = 'object';
    expected = helpers.FunctionName(data);

    test.expect(1);
    test.equal(actual, expected, 'should work without any problems');
    test.done();
  },
  'single array args': function(test) {
    var data, actual, expected;

    data = [1,23,45,1];
    actual = 'object';
    expected = helpers.FunctionName(data);

    test.expect(1);
    test.equal(actual, expected, 'should work without any problems');
    test.done();
  },
  'single string args': function(test) {
    var data, actual, expected;

    data = 'some text';
    actual = 'object';
    expected = helpers.FunctionName(data);

    test.expect(1);
    test.equal(actual, expected, 'should work without any problems');
    test.done();
  },
  'single number args': function(test) {
    var data, actual, expected;

    data = 12345;
    actual = 'object';
    expected = helpers.FunctionName(data);

    test.expect(1);
    test.equal(actual, expected, 'should work without any problems');
    test.done();
  },
  'single boolan args': function(test) {
    var data, actual, expected;

    data = true;
    actual = 'object';
    expected = helpers.FunctionName(data);

    test.expect(1);
    test.equal(actual, expected, 'should work without any problems');
    test.done();
  }
};
