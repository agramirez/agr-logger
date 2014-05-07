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

    test.expect(6);
    test.equal(typeof actual, 'object', 
      'should return new logger object without any problems');
    test.equal(typeof actual.expose, 'object', 
      'should have expose property');
    test.equal(typeof actual.expose.options, 'object',
      'should have expose.options property');
    test.equal(typeof actual.expose.options.output, 'object',
      'should have expose.options.method property');
    test.equal(actual.expose.options.output.on, false,
      'options.output.on should be set to false by default');
    test.equal(actual.expose.options.output.method, console.log,
      'options.output.method should be set to console.log by default');

    test.done();
  },
  'null value': function(test) {
    var data, actual;

    data = null;
    actual = new Logger(data);

    test.expect(6);
    test.equal(typeof actual, 'object', 
      'should return new logger object without any problems');
    test.equal(typeof actual.expose, 'object', 
      'should have expose property');
    test.equal(typeof actual.expose.options, 'object',
      'should have expose.options property');
    test.equal(typeof actual.expose.options.output, 'object',
      'should have expose.options.method property');
    test.equal(actual.expose.options.output.on, false,
      'options.output.on should be set to false by default');
    test.equal(actual.expose.options.output.method, console.log,
      'options.output.method should be set to console.log by default');

    test.done();
  },
  'single value with boolean true': function(test) {
    var data, actual;

    data = true;
    actual = new Logger(data);

    test.expect(1);
    test.equal(actual.expose.options.output.on, true,
      'options.on should be set to true');
    test.done();
  },
  'single value with boolean false': function(test) {
    var data, actual;

    data = false;
    actual = new Logger(data);

    test.expect(1);
    test.equal(actual.expose.options.output.on, false,
      'options.output.on should be set to false');
    test.done();
  },
  'single value with logging function': function(test) {
    var data, actual;

    data = function log(msg) { return msg; };
    actual = new Logger(data);

    test.expect(1);
    test.equal(actual.expose.options.output.method, data,
      'options.output.method should be set to the function given');
    test.done();
  },
  'single value with empty object': function(test) {
    var data, actual;

    data = {};
    actual = new Logger(data);

    test.expect(6);
    test.equal(typeof actual, 'object', 
      'should return new logger object without any problems');
    test.equal(typeof actual.expose, 'object', 
      'should have expose property');
    test.equal(typeof actual.expose.options, 'object',
      'should have expose.options property');
    test.equal(typeof actual.expose.options.output, 'object',
      'should have expose.options.method property');
    test.equal(actual.expose.options.output.on, false,
      'options.output.on should be set to false by default');
    test.equal(actual.expose.options.output.method, console.log,
      'options.output.method should be set to console.log by default');
    test.done();
  },
  'single value with on and output properties': function(test) {
    var data, actual;

    data = { 
      output: {
        on: true, 
        method: function (msg) { return msg; }
      }
    };
    actual = new Logger(data);

    test.expect(2);
    test.equal(actual.expose.options.output.on, data.output.on,
      'options.output.on should be set to ' + data.on);
    test.equal(actual.expose.options.output.method, data.output.method,
      'options.output.method should be set to the specified function');

    test.done();
  }
};
