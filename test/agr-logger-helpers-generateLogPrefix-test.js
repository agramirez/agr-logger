/** Tests for agr-logger-helpers.generateLogPrefix() function */
'use strict';

var helpers = require('../lib/agr-logger-helpers.js').internal;

exports.generateLogPrefix = {
  setUp: function (done) {
    done();
  },
  'no args': function (test) {
    var expected, actual;

    expected = '';
    actual = helpers.generateLogPrefix();
    
    test.expect(1);
    test.equal(actual, expected, 'should return empty string');
    test.done();
  },
  'good args': function (test) {
    var expected, actual, level, mod, time, action, user;

    level = 0;
    mod = 'test';
    user = 'tester';
    time = new Date().toString();
    action = 'TEST';
    expected = mod + ' (' + user + ') ' + '[' + time + ']';
    expected += ' ::' + action + ':: ';
    actual = helpers.generateLogPrefix(level, mod, user, time, action);

    test.expect(1);
    test.equal(actual, expected, 'message should match');
    test.done();
  },
  'missing user': function (test) {
    var expected, actual, level, mod, time, action, user;

    level = 0;
    mod = 'test';
    user = '';
    time = new Date().toString();
    action = 'TEST';
    expected = mod + ' ' + '[' + time + ']';
    expected += ' ::' + action + ':: ';
    actual = helpers.generateLogPrefix(level, mod, user, time, action);

    test.expect(1);
    test.equal(actual, expected, 'message should match');
    test.done();
  },
  'missing action and user': function (test) {
    var expected, actual, level, mod, time, action, user;

    level = 0;
    mod = 'test';
    user = '';
    time = new Date().toString();
    action = '';
    expected = mod + ' ' + '[' + time + '] ';
    actual = helpers.generateLogPrefix(level, mod, user, time, action);

    test.expect(1);
    test.equal(actual, expected, 'message should match');
    test.done();
  },
  'missing action and user with 3 levels deep': function (test) {
    var expected, actual, level, mod, time, action, user;

    level = 3;
    mod = 'test';
    user = '';
    time = new Date().toString();
    action = '';
    expected = '      ' + mod + ' ' + '[' + time + '] ';
    actual = helpers.generateLogPrefix(level, mod, user, time, action);

    test.expect(1);
    test.equal(actual, expected, 'message should match');
    test.done();
  }
};
