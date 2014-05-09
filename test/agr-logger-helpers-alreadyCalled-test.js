/** Tests for agr-logger-helpers.alreadyCalled */
'use strict';

var helpers = require('../lib/agr-logger-helpers.js').internal;

exports.alreadyCalled = {
  setUp: function(done) {
    done();
  },
  'no args': function(test) {
    var actual, expected;

    expected = false;
    actual = helpers.alreadyCalled();

    test.expect(1);
    test.equal(actual, expected, 'should return ' + expected);
    test.done();
  },
  'null args': function(test) {
    var data, actual, expected;

    data = null;
    expected = false;
    actual = helpers.alreadyCalled(data, data);

    test.expect(1);
    test.equal(actual, expected, 'should return ' + expected);
    test.done();
  },
  'name with empty array': function(test) {
    var actual, expected, name, stack;

    name = 'myFuncName';
    stack = [];
    expected = false;
    actual = helpers.alreadyCalled(name, stack);

    test.expect(1);
    test.equal(actual, expected, 'should return ' + expected);
    test.done();
  },
  'name that does not exist in array': function(test) {
    var stack, name, actual, expected;

    name = 'myFunctionName';
    stack = ['my', 'func', 'name'];
    expected = false;
    actual = helpers.alreadyCalled(name, stack);

    test.expect(1);
    test.equal(actual, expected, 'should return ' + expected);
    test.done();
  },
  'name that is not at top of array': function(test) {
    var stack, name, actual, expected;

    name = 'myFunctionName';
    stack = [];
    stack.push('myFunctionName');
    stack.push('anotherName');
    stack.push('lastName');
    expected = false;
    actual = helpers.alreadyCalled(name, stack);

    test.expect(1);
    test.equal(actual, expected, 'should return ' + expected);
    test.done();
  },
  'function name that exists at top of array': function(test) {
    var stack, name, actual, expected;

    name = 'myFunctionName';
    stack = [];
    stack.push('my');
    stack.push('func');
    stack.push('name');
    stack.push(name);
    expected = true;
    actual = helpers.alreadyCalled(name, stack);

    test.expect(1);
    test.equal(actual, expected, 'should return ' + expected);
    test.done();
  }
};
