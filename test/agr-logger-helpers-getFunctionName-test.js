/** Tests for the agr-logger-helpers.getFunctionName function */
//'use strict';

var helpers = require('../lib/agr-logger-helpers.js').internal;

exports.getFunctionName = {
  setUp: function (done) {
    done();
  },
  'no args': function (test) {
    var expected, actual;

    expected = '';
    actual = helpers.getFunctionName();

    test.expect(1);
    test.equal(actual, expected, 'should return empty string');
    test.done();
  },
  'a named function variable': function (test) {
    var expected, actual, data;

    data = function myFuncName() { return false; };
    expected = 'myFuncName';
    actual = helpers.getFunctionName(data);

    test.expect(1);
    test.equal(actual, expected, 'should return the function name');
    test.done();
  },
  'a named function reference': function (test) {
    var expected, actual;

    function myFuncName() { return false; }
    
    expected = 'myFuncName';
    actual = helpers.getFunctionName(myFuncName);

    test.expect(1);
    test.equal(actual, expected, 'should return the function name');
    test.done();
  },
  'a this function reference': function (test) {
    var expected, actual;

    function myInternalFunc() {
      actual = helpers.getFunctionName(this); 
    }
    myInternalFunc();
    expected = '';

    test.expect(1);
    test.equal(actual, expected, 'should return an empty string');
    test.done();
  },
  'an anonymous function': function (test) {
    var expected, actual;

    expected = '';
    actual = helpers.getFunctionName(function (x) { return x*x; });

    test.expect(1);
    test.equal(actual, expected, 'should return an empty string');
    test.done();
  },
  'a named anonymous function': function (test) {
    var expected, actual;

    expected = 'myName';
    actual = helpers.getFunctionName(function myName(x) { return x*x; });

    test.expect(1);
    test.equal(actual, expected, 'should return the function name');
    test.done();
  },
  'a text string': function (test) {
    var expected, actual, data;

    data = 'some data';
    expected = '';
    actual = helpers.getFunctionName(data);

    test.expect(1);
    test.equal(actual, expected, 'should return an empty string');
    test.done();
  },
  'an object': function (test) {
    var expected, actual, data;

    data = {some: function () {return this;}};
    expected = '';
    actual = helpers.getFunctionName(data);

    test.expect(1);
    test.equal(actual, expected, 'should return an empty string');
    test.done();
  },
  'a boolean': function (test) {
    var expected, actual, data;

    data = false;
    expected = '';
    actual = helpers.getFunctionName(data);

    test.expect(1);
    test.equal(actual, expected, 'should return an empty string');
    test.done();
  },
  'an array': function (test) {
    var expected, actual, data;

    data = [123,23,11];
    expected = '';
    actual = helpers.getFunctionName(data);

    test.expect(1);
    test.equal(actual, expected, 'should return an empty string');
    test.done();
  }
};
