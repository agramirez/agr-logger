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
    internal.options = _params(dops, {output: {on: ops}});
  } else if (util.isFunction(ops)) {
    internal.options = _params(dops, {output: {method: ops}});
  } else if (util.isObject(ops) && ops != null) {
    internal.options = _params(dops, ops);
  } else {
    internal.options = dops;
  }

  // expose internal objects for testing.
  // note: poke around in there at your own risk!
  external.expose = internal;

  return external;
};

function _log(msg,ops,ref) {
  // make sure properties are not null or undefined
  if (util.inou(internal)) { 
    internal = {}; 
  }
  if (util.inou(internal.output)) { 
    internal.output = {}; 
  }

  // exit function if output is not enabled
  if (internal.output.on) {

    if (util.inou(internal.output.method)) { 
      internal.output.method = console.log;
    }

    // call output method to display message
    if (util.inou(ops)) {
      internal.output.method(msg);
    } else {
      internal.output.method(msg,ops);
    }
  } 

  // return reference
  return ref;
}

function _params(dops, ops) {
  var aops = {};
  _log('start _params');

  // return the default value if ops is null
  if (util.inou(ops)) {
    _log('ops is null or undefined');

    return dops;
  }

  // if ops is not null then iterate through our template to find the
  // values we defined in dops, if any
  for(var p in dops) {
    _log('checking ' + p + ' in dops');
    // check what kind of value we are looking at
    if (util.isObject(dops[p]) && !util.inou(dops[p])) {
      // if we are working with an object, then iterate through it's
      // properties and copy it
      _log('recursive call for dops[' + p + '] = ' + dops[p]);
      aops[p] = _params(dops[p], ops[p]);
    } else if (!util.inou(ops)) {
      // if it is not an object then simply copy its value
      _log('coppying with nvl(' + ops[p] + ', ' + dops[p] + ')');
      aops[p] = util.nvl(ops[p], dops[p]);
    }
  }

  _log('completed copy');
  _log('end _params');

  return aops;
}
