/** unit tests for agr-logger-helpers.log() */
'use strict';

var helpers = require('../lib/agr-logger-helpers.js'),
    outputData = [],
    outputSimplex = function (msg) { 
      outputData.push(msg); 
    },
    outputComplex = function (msg, ops) { 
      outputData.push({ msg: msg, ops: ops }); 
    };

exports.log = {
  setUp: function (done) {
    done();
  },
  'no args': function (test) {
    helpers.log();
    
    test.expect(1);
    test.ok('execute without breaking');
    test.done(); 
  },
  'passing it empty object': function (test) {
    var data = {};

    helpers.log(data);

    test.expect(1);
    test.ok('executes without breaking');
    test.done();
  },
  'passing it an object with internal defined': function (test) {
    var data = {internal: {}};

    helpers.log(data);

    test.expect(1);
    test.ok('executes without breaking');
    test.done();
  },
  'passing it an object with output method, but output.on undefined': function (test) {
    var data, pre, post;

    pre = outputData.length; 
    data = { 
      msg: 'should not appear', 
      internal: { 
        output: {
          method: outputSimplex 
        }
      } 
    };
    helpers.log(data);
    post = outputData.length;

    test.expect(2);
    test.ok('executes without breaking');
    test.equal(pre, post, 'does not output any message');
    test.done();
  },
  'passing it an object with output method, but output.on set to false': function (test) {
    var data, pre, post;

    pre = outputData.length; 
    data = { 
      msg: 'should not appear', 
      internal: { 
        output: {
          method: function (msg) {
            console.log('');
            console.log(msg);
            console.log('');
          },
          on: false
        }
      } 
    };
    helpers.log(data);
    post = outputData.length;

    test.expect(2);
    test.ok('executes without breaking');
    test.equal(pre, post, 'does not output any message');
    test.done();
  },
  'passing it an object with output method and output.on set to true': function (test) {
    var data, pre, post;

    pre = outputData.length; 
    data = { 
      msg: 'should definitely appear', 
      internal: { 
        output: {
          method: outputSimplex,
          on: true
        }
      } 
    };
    helpers.log(data);
    post = outputData.length;

    test.expect(3);
    test.ok('executes without breaking');
    test.equal(post, pre+1, 'outputs a message');
    test.equal(outputData[pre], data.msg, 'output message same as expected');
    test.done();
  },
  'passing in an empty string': function (test) {
    var data = '';

    helpers.log(data);

    test.expect(1);
    test.ok('executes without breaking');
    test.done();
  },
  'passing it an object with complex output method and output.on set to true': function (test) {
    var data, pre, post;

    pre = outputData.length; 
    data = { 
      msg: 'should definitely appear',
      ops: { my: 'data' },
      internal: { 
        output: {
          method: outputComplex,
          on: true
        }
      } 
    };
    helpers.log(data);
    post = outputData.length;

    test.expect(4);
    test.ok('executes without breaking');
    test.equal(post, pre+1, 'outputs a message');
    test.equal(outputData[pre].msg, data.msg, 
      'output message same as expected');
    test.deepEqual(outputData[pre].ops, data.ops, 
      'ops are passed to output method and can be accessed');
    test.done();
  },
};
