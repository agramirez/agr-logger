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
    var data, actual;

    data = null;
    actual = new Logger();

    test.expect(5);
    test.equal(typeof actual, 'object', 
      'should return new logger object without any problems');
    test.equal(typeof actual.expose, 'object', 
      'should have expose property');
    test.equal(typeof actual.expose.options, 'object',
      'should have expose.options property');
    test.equal(actual.expose.options.on, false,
      'options.on should be set to false by default');
    test.equal(actual.expose.options.output, console.log,
      'options.output should be set to console.log by default');

    test.done();
  },
  'null value': function(test) {
    var data, actual;

    data = null;
    actual = new Logger(data);

    test.expect(5);
    test.equal(typeof actual, 'object', 
      'should return new logger object without any problems');
    test.equal(typeof actual.expose, 'object', 
      'should have expose property');
    test.equal(typeof actual.expose.options, 'object',
      'should have expose.options property');
    test.equal(actual.expose.options.on, false,
      'options.on should be set to false by default');
    test.equal(actual.expose.options.output, console.log,
      'options.output should be set to console.log by default');

    test.done();
  },
  'single value with boolean true': function(test) {
    var data, actual;

    data = true;
    actual = new Logger(data);

    test.expect(5);
    test.equal(typeof actual, 'object', 
      'should return new logger object without any problems');
    test.equal(typeof actual.expose, 'object', 
      'should have expose property');
    test.equal(typeof actual.expose.options, 'object',
      'should have expose.options property');
    test.equal(actual.expose.options.on, true,
      'options.on should be set to true');
    test.equal(actual.expose.options.output, console.log,
      'options.output should be set to console.log by default');

    test.done();
  },
  'single value with boolean false': function(test) {
    var data, actual;

    data = false;
    actual = new Logger(data);

    test.expect(5);
    test.equal(typeof actual, 'object', 
      'should return new logger object without any problems');
    test.equal(typeof actual.expose, 'object', 
      'should have expose property');
    test.equal(typeof actual.expose.options, 'object',
      'should have expose.options property');
    test.equal(actual.expose.options.on, false,
      'options.on should be set to false');
    test.equal(actual.expose.options.output, console.log,
      'options.output should be set to console.log by default');

    test.done();
  },
  'single value with logging function': function(test) {
    var data, actual;

    data = function log(msg) { return msg; };
    actual = new Logger(data);

    test.expect(5);
    test.equal(typeof actual, 'object', 
      'should return new logger object without any problems');
    test.equal(typeof actual.expose, 'object', 
      'should have expose property');
    test.equal(typeof actual.expose.options, 'object',
      'should have expose.options property');
    test.equal(actual.expose.options.on, false,
      'options.on should be set to false by default');
    test.equal(actual.expose.options.output, data,
      'options.output should be set to the function given');

    test.done();
  },
  'single value with empty object': function(test) {
    var data, actual;

    data = {};
    actual = new Logger(data);

    test.expect(5);
    test.equal(typeof actual, 'object', 
      'should return new logger object without any problems');
    test.equal(typeof actual.expose, 'object', 
      'should have expose property');
    test.equal(typeof actual.expose.options, 'object',
      'should have expose.options property');
    test.equal(actual.expose.options.on, false,
      'options.on should be set to false by default');
    test.equal(actual.expose.options.output, console.log,
      'options.output should be set to console.log by default');

    test.done();
  },
  'single value with on and output properties': function(test) {
    var data, actual;

    data = {on: true, output: function (msg) { return msg; }};
    actual = new Logger(data);

    test.expect(5);
    test.equal(typeof actual, 'object', 
      'should return new logger object without any problems');
    test.equal(typeof actual.expose, 'object', 
      'should have expose property');
    test.equal(typeof actual.expose.options, 'object',
      'should have expose.options property');
    test.equal(actual.expose.options.on, data.on,
      'options.on should be set to ' + data.on);
    test.equal(actual.expose.options.output, data.output,
      'options.output should be set to the specified function');

    test.done();
  }
};
