/** Tests for agr-logger-helpers.start() function */
'use strict';

var helpers = require('../lib/agr-logger-helpers.js');

exports.start = {
  setUp: function (done) {
    done();
  },
  'no args': function (test) {
    var expected, actual;

    expected = '::START:: anonymous';
    actual = helpers.start();
    
    test.expect(1);
    test.equal(actual, expected, 'should return string with START');
    test.done();
  },
  'good args': function (test) {
    var expected, actual, name, mod, time, stack, user;

    name = 'tester1';
    mod = 'test';
    user = 'tester';
    time = new Date().toString();
    stack = [];
    expected = mod + ' (' + user + ') ' + '[' + time + ']';
    expected += ' ::START:: tester1';
    actual = helpers.start(name, mod, user, time, stack);

    test.expect(1);
    test.equal(actual, expected, 'message should match');
    test.done();
  },
  'missing user': function (test) {
    var expected, actual, name, mod, time, stack, user;

    name = 'tester1';
    mod = 'test';
    user = '';
    time = new Date().toString();
    stack = [];
    expected = mod + ' ' + '[' + time + ']';
    expected += ' ::START:: tester1';
    actual = helpers.start(name, mod, user, time, stack);

    test.expect(1);
    test.equal(actual, expected, 'message should match');
    test.done();
  },
  'missing time': function (test) {
    var expected, actual, name, mod, time, stack, user;

    name = 'tester1';
    mod = 'test';
    user = 'user1';
    time = '';
    stack = [];
    expected = mod + ' (' + user + ') [' + time + ']';
    expected += ' ::START:: tester1';
    actual = helpers.start(name, mod, user, time, stack);

    test.expect(1);
    test.equal(actual, expected, 'message should match');
    test.done();
  }
};
