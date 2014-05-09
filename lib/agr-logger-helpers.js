/**
 * agr-logger v0.1.1
 * https://github.com/agramirez/agr-logger
 *
 * Copyright (c) 2014 Alexander G. Ramirez
 * Licensed under the MIT license.
 *
 * module agr/logger/internals
 */
var util = require('agr-util'),
    internal = {output: {on: false}},
    stack = [],
    tab = '';
/**
  @description Generates a string which can be used instead of a tab.
               It can generate this tab string with any symbol, but,
               by default it uses blank spaces.
  @param {Number} [ops.count=1] Number of tabs to simulate.
  @param {Number} [ops.size=2] The number of symbols used in each tab.
  @param {String} [ops.start=''] A starting string to which new symbols will be added.
  @param {String} [ops.symbol=' '] The symbol used to create the tabs.

  @returns {String} String with the specified number of symbols.
*/
function tabs(ops) {
  log('start tabs', null, internal);

  var result,
      symRequired = 0,
      symCurrent = 0,
      aops = {},
      dops = {count: 1, size: 2, start: '', symbol: ' '};

  // determine what kind of input parameter we are receiving
  if (util.isObject(ops)) {
    // if it's an object copy params
    log('ops is an object', null, internal);
    aops = params(dops, ops);
  } else if (util.isNumber(ops)) {
    // if it's a number then assume it is the number of tabs we want
    log('ops is a number', null, internal);
    aops = params(dops, {count: ops});
  } else if (util.isString(ops)) {
    // if it's a string then assum it is our start string
    log('ops is a string', null, internal);
    aops = params(dops, {start: ops});
  } else {
    // if all else fail just use the defaults
    log('ops is not an object, a number, or a string', null, internal);
    aops = params(dops, {});
  }

  // first count how many symbols we need
  symRequired = aops.size * aops.count;
  symCurrent = aops.start.length;

  log('symRequired = ' + symRequired, null, internal);
  log('symCurrent = ' + symCurrent, null, internal);

  // since we already have a string that is as big, or bigger, than
  // what we need, we will just return the string.
  // this is useful for performance reasons
  if (symCurrent < symRequired) {
    result = aops.start;

    log('symCurrent >= symRequired');

    for(var i = symCurrent; i < symRequired; i++) {
      log('step ' + i + ' adding [' + aops.symbol + ']', null, internal);
      result += aops.symbol;
    }
  } else if (symCurrent > symRequired) {
    log('symCurrent > symRequired', null, internal);
    
    result = aops.start.substring(0, symRequired);
  } else {
    result = aops.start;

    log('symCurrent == symRequired', null, internal);
  }

  log('aops.start = [' + aops.start + ']', null, internal);
  log('result = [' + result + ']', null, internal);
  log('end tabs', null, internal);

  return result;
}


function func(ref, mod, user, time) {
  log('start ref',null,internal);

  var name = '', 
      anon = 'anonymous',
      noName = '',
      undef = 'undefined';

  log('ref = [' + ref + ']', null, internal);

  // check what type of reference we have and extract the name accordingly
  if (util.isFunction(ref)) {
    log('ref is function', null, internal);

    name = getFunctionName(ref);

    // check if the function is anonymous (i.e. has no name)
    if (name === noName) {
      log('ref is anonymous function');

      name = anon;
    }
  } else if (util.isString(ref)) {
    log('ref is string', null, internal);

    name = ref;
  } else {
    log('ref is undefined', null, internal);

    name = undef;
  }

  // determine if we have already called this function
  if (alreadyCalled(name, stack)) {
    return start(name, mod, user, time);
  } else {
    return end(name, mod, user, time);
  }
}

function alreadyCalled(name, stack) {
  log('start _alreadyCalled', null, internal);
  var current;

  // if the array is null or empty, just return false
  if (util.inoe(stack)) {
    return false;
  }

  // get the current name at the top of the stack
  current = stack.pop();

  log('  current = [' + current + ']', null, internal);
  log('  name = [' + name + ']', null, internal);

  // if the current function name on the stack
  // matches the input name, then yes, we have
  // already called it
  if (current === name) {
    log('  current === name', null, internal);
    log('end _alreadyCalled', null, internal);
    return true;
  }

  log('end _alreadCalled', null, internal);
  // otherwise no
  return false;
}

function getLevel(stack) {
  log('start _alreadCalled', null, internal);
  var level = 0;

  // get the level by finding the size of the array
  if (util.isArray(stack)) {
    level = stack.length;
  
    log('  stack is array', null, internal);
  }

  log('level = [' + level + ']', null, internal);
  log('end _alreadCalled', null, internal);

  return level;
}

/**
  @description Creates a prefix string and appends it to
               the message specified.
  @param {String} msg Message to append after the prefix.
  @param {String} mod Module name to append at the start of the prefix.
  @param {String} user User name of the user executing the module.
  @param {String} action Name of the action being executed (i.e. log, start, etc.)

  @returns {String} Complete string representing the prefix and the message.
*/
function generateLogPrefix(level, mod, user, time, action) {
  log('start generateLogPrefix');
  var spacing, result;

  spacing = tabs({count: util.nvl(level, 0), start: tab});

  log('  level = [' + level + ']', null, internal);
  log('  spacing = [' + spacing + ']', null, internal);

  // create the start message
  result = spacing; 
  result += util.inow(mod) ? '' : mod + ' ';
  result += util.inow(user) ? '' : '(' + user + ') ';
  result += util.inow(time) ? '' : '[' + time + '] ';
  result += util.inow(action) ? '' : '::' + action + ':: ';
  //result += util.inow(msg) ? '' : msg;
  
  // update the global tab
  tab = spacing;

  log('end generateLogPrefix');
  internal.output.on = false;

  return result;
}

function start(name, mod, user, time, stack) {
  log('start start', null, internal);
  var result, level;

  // get the level
  level = getLevel(stack);

  // push the function into the stack
  stack.push(name);

  // create the start message
  result = generateLogPrefix(level, mod, user, time, 'START');
  result += name;

  log('end start', null, internal);
  return result;
}

/** 
  @description Gets the function name from a function object
  @param {Function} ref Function who's name we will extract
  @returns {String} Name of the function, or an empty string if the function is anonymous
*/
function getFunctionName(ref) {
  // debug
  internal.output.on = false;
  log('start _getFunctionName', null, internal);
  var name;
  
  // debug
  log('  ref = [' + ref + ']', null, internal);

  if (typeof ref === 'function') {
    // debug
    log('ref is function', null, internal);

    name = ref.toString();
    name = name.substr('function '.length);
    name = name.substr(0, name.indexOf('('));
  } else {
    // debug
    log('ref is not function');

    name = '';
  }
  
  // debug
  log('name = [' + name + ']', null, internal);
  log('end _getFunctionName', null, internal);
  internal.output.on = false;

  return name;
}

/**
  @description Removes a function from the stack and generates an end message.
  @param {String} name Name of the function.
  @param {String} mod Name of the module.
  @param {String} user Name of the user executing the module.
  @param {String} time Date and time stamp used for the log message.
*/
function end(name, mod, user, time, stack) { 
  log('start end', null, internal);
  var result, level;

  // get the level
  level = getLevel(stack);
  
  // pop the function from the stack
  stack.pop();

  // create the start message
  result = generateLogPrefix(level, mod, user, time, 'END');
  result += name;
  
  log('end end', null, internal);
  return result;
}

/**
*/
function params(dops, ops) {
  var aops = {};
  log('start _params');

  // return the default value if ops is null
  if (util.inou(ops)) {
    log('ops is null or undefined');

    return dops;
  }

  // if ops is not null then iterate through our template to find the
  // values we defined in dops, if any
  for(var p in dops) {
    log('checking ' + p + ' in dops');
    // check what kind of value we are looking at
    if (util.isObject(dops[p]) && !util.inou(dops[p])) {
      // if we are working with an object, then iterate through it's
      // properties and copy it
      log('recursive call for dops[' + p + '] = ' + dops[p]);
      aops[p] = params(dops[p], ops[p]);
    } else if (!util.inou(ops)) {
      // if it is not an object then simply copy its value
      log('coppying with nvl(' + ops[p] + ', ' + dops[p] + ')');
      aops[p] = util.nvl(ops[p], dops[p]);
    }
  }

  log('completed copy');
  log('end _params');

  return aops;
}

/**
*/
function log(msg,ops,internal) {
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
}

// export external functions
exports.tabs = tabs;
exports.params = params;
exports.log = log;
exports.func = func;
exports.start = start;
exports.end = end;

// export internal function
exports.internal = {
  generateLogPrefix: generateLogPrefix,
  alreadyCalled: alreadyCalled,
  getLevel: getLevel,
  getFunctionName: getFunctionName
};
