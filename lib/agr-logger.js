/**
 * agr-logger v0.1.1
 * https://github.com/agramirez/agr-logger
 *
 * Copyright (c) 2014 Alexander G. Ramirez
 * Licensed under the MIT license.
 */

'use strict';
var util = require('agr-util');
var defOps = require('./agr-logger-defaults.js');
var external = {}, internal = {}, dops = defOps;
var helpers = require('./agr-logger-helpers.js');

/**
  @description Constructor for the agr-logger module.  Can be instantiated with default parameters.

  @param {Object|Boolean|Function} [ops] Object containing input parameters for the module.  If it is an object it will be searched for the input parameters.  If it is a boolean it will be assumed to correspond to the ops.on paramter.  If it is a function it will be treated as the ops.output parameter.
  @param {Boolean} [ops.on=false] Determines if output should be on or not.
  @param {Function} [ops.output=_log] The function used to output data.  It should support a single string as input.

  @returns An instatiated agr-util object.
*/
module.exports = function (ops) {
  // setupt defaults based on input parameters
  if (util.isBoolean(ops)) {
    internal.options = helpers.params(dops, {output: {on: ops}});
  } else if (util.isFunction(ops)) {
    internal.options = helpers.params(dops, {output: {method: ops}});
  } else if (util.isObject(ops) && ops != null) {
    internal.options = helpers.params(dops, ops);
  } else {
    internal.options = dops;
  }

  // setup local variables to make them easier to access
  var output = internal.options.output,
      env = internal.options.env,
      format = format;

  // expose public functions
  external.log = function (msg) {
    if (output.on === true && env.dev === true) {
      helpers.log(msg, output.ops);
    }

    return this;
  };

  // expose internal objects for testing.
  // note: poke around in there at your own risk!
  external.expose = internal;

  return external;
};
