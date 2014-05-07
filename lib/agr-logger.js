/**
 * agr-logger v0.1.1
 * https://github.com/agramirez/agr-logger
 *
 * Copyright (c) 2014 Alexander G. Ramirez
 * Licensed under the MIT license.
 */

'use strict';
var util = require('agr-util');

/**
  @description Constructor for the agr-logger module.  Can be instantiated with default parameters.

  @param {Object|Boolean|Function} [ops] Object containing input parameters for the module.  If it is an object it will be searched for the input parameters.  If it is a boolean it will be assumed to correspond to the ops.on paramter.  If it is a function it will be treated as the ops.output parameter.
  @param {Boolean} [ops.on=false] Determines if output should be on or not.
  @param {Function} [ops.output=console.log] The function used to output data.  It should support a single string as input.

  @returns An instatiated agr-util object.
*/
module.exports = function (ops) {
  var external = {}, internal = {}, dops = {on: false, output: console.log};

  // setupt defaults based on input parameters
  internal.options = {};
  if (util.isFunction(ops)) {
    internal.options = {
      on: dops.on, 
      output: ops
    };
  } else if (util.isBoolean(ops)) {
    internal.options = {
      on: ops, output: 
      dops.output
    };
  } else if (!util.isnou(ops)) {
    internal.options = {
      on: util.nvl(ops.on, dops.on), 
      output: util.nvl(ops.output, dops.output)
    };
  } else {
    internal.options = {
      on: dops.on, 
      output: dops.output
    };
  }
  
  // expose internal objects for testing.
  // note: poke around in there at your own risk!
  external.expose = internal;

  return external;
};
