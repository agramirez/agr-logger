/**
  Tests for the the agr-logger constructor primary functionality.  
*/
'use strict';

var Logger = require('../lib/agr-logger.js');

exports.constructor = {
  setUp: function(done) {
    done();
  },
  'no args': function(test) {
    var data, actual, expected;

    data = null;
    actual = 'object';
    expected = typeof new Logger();

    test.expect(1);
    test.equal(actual, expected, 'should work without any problems');
    test.done();
  }
};
