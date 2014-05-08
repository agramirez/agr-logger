/**
  This module contains the default parameters used in the agr-logger
  module.
*/
'use strict';

/** module properties */
exports.module = {
  /** name of the muldule */
  name: '',
  user: '',
  mode: 'dev',
  env: {
    dev: {
      verb: { err: true, log: true, msg: true, func: true, val: true }
    },
    test: {
      verb: { err: true, log: true, msg: true, func: true}
    },
    prod: {
      verb: { err: true, log: true }
    }
  }
};

/** ouput method and properties */
exports.output = {
  /** determines if output is on or off by default, true is on */
  on: false,
  /** method used to output data, signature is method(msg,options) */
  method: console.log,
  /** options passed into method, used for injecting dependencies */
  options: null
};

/** formats used for message creation. themes, spacing, and stamping */
exports.format = {
  /** used to space custom 'tabs' for console output */
  tabs: {count: 1, size: 2, symbol: ' '},
  /** intended for formatting a date to a string */
  timeStamp: function (date) { return date.toString(); },
  /** color theme for output messages, specify function name and color */
  theme: {
    log: 'grey',
    msg: 'grey',
    val: 'grey',
    func: 'blue',
    start: 'blue',
    end: 'blue',
    err: 'red'
  }
};
