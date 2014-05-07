# agr-logger

A logging utility for displaying messages from javascript code to an output source (i.e. the console, a file, etc.).  The specific output source is injected to the agr-logger module via a single function.  

The agr-logger's main job is to produce nicely formatted output that carries relevant information.

## Getting Started
Install the module with: `npm install agr-logger` -not available yet-

```javascript
var Logger = require('agr-logger');
var fs = require('fs');
var log = Logger({
  module: 'myMod',
  output: {
    on: true,
    method: function (msg, options) {
      options.fs.appendFile(options.fileName, msg);
    },
    options: {
      fs: fs,
      fileName: 'myFile.log'
    }
  },
  format: {
    depth: 1,
    theme: {log: 'grey', val: 'grey', err: 'red'},
    tabs: {count: 1, size: 2, symbol: ' '},
    timeStamp: function (date) { return date.toString(); }
  }
});


// displays a message to the output file
// output: myMod [1/1/14 12:00:00 AM] :::MSG::: some message
log.msg('some message');

// displays a message to the output file
// output: myMod [1/1/14 12:00:00 AM] :::LOG::: some message
log.log('some message');

// displays a message to the output file
// output: myMod [1/1/14 12:00:00 AM] :::ERR::: some message
log.err('some message');

function divide(a,b) {
  // log function start
  log.start(this);
  var result;

  try {
    // log multiple values at once
    log.val({a:a,b:b});

    result = a / b;
  } catch(ex) {
    // log an exception
    log.err(ex);
  }

  // log a single value
  log.val('result', result);

  // log the end of the function
  log.end(this);
}

divide(2,4);
divide(2,0);
```

## Documentation

## Examples

### Logging on different environments

While we might want very verbose data when loggin in dev it is generally not
a good idea to do the same in production.  this if true for security and
performance reasons.  the logging library is quite expedient in its execution,
but it can still be a drain on performance if a lot of data is being logged.

For this reason it is a good idea to alter the verbosity of logging in different
environments.  The agr-logging utility easily allows you to do this by defining
a set of environments where the code will be executed.  Additionaly the entire
logging functionality can be turned on or off at the global level.

#### Turn logging On/Off
By default logging is turned OFF and the expected environment is set to PROD.  
To turn on all logging the output.on property must be set to TRUE when 
instatiating the logger, or, the .on() method must be called explicitly.

Examples
--------
```
  var Logger = require('agr-logger');
  var log = new Logger({
    module: {
      mode: 'DEV' // sets the environment mode to DEV instead of PROD
    }
    output: {
      on: true // turns ouput on, without it no messages will logged
    }
  });

  // this will be logged
  // output: [1/1/2014 12:00 AM] hello world
  log.log('hello world!');

  // this will not be logged
  log.off().log('good bye world!').on();

  // this will be logged
  // output: moduleName (userName) [1/1/2014 12:00 AM] :::MSG::: hello again
  log.msg('hello again'); // will be logged
```

#### Turn logging calls On/Off
Changing the verbosity of the logging output means chaging which method calls
actually get output when called.  For example, in production we may want to only
log errors, so, only calls to the .err or .exception functions should be 
outpu.  Any .log, .msg, or .val calls should not be logged.

To change the verbosity we must defined the environment in module.environments 
for which we want to specify non-default behavior.  Then we can turn each 
individual logging function on or off by specifying the function name and then
a boolean value indicating whether the output should be on (true) or off (false)
.  Additionally, we can also specify the default verbosity using the
module.verbosity object.

Examples
--------
```
  var Logger = require('agr-logger');
  var log = Logger({
    module: {
      name: 'myMod',
      user: function (ops) { // can be an explicit string as well
        // do something to find user name
        
        // reutrn a string
        return username;
      }
    },
    // set the environments we can run under
    // by default we use dev
    // this can be changed in the agr-logger-defaults.js file
    env: {
      dev: {
        // test must be a function to test for the local environment
        test: function (ops) {
          // do something to determine if we are running in this environment

          // return true or false, true for YES we are, and false for NO
          return result;
        },
        // defines which functions should produce output
        // true for show output, false for no output
        // default is off unless otherwise stated
        verb: {
          log: true,
          err: true,
          func: true,
          start: true,
          end: true,
          msg: true,
          val: true,
        }
      }
    },
    ops: {
      // whatever you want
    }
  });
```

## Notes

### Changing default values
Changing default values and acceptable properties can be done through the
agr-logger-defaults.js module.  This module defines the properties that the
agr-logger module expects.  Removing any existing properties will definitely
break stuff, but, adding new properties will not.

However, if you need to pass dependencies when using custom function calls, 
for the output method for example, it is recommended action is to pass them in
through the ops property.  you can put whatever you want in there and it will
be passed as a parameter to all custom method calls that can be defined.

Example
-------
```
  var Logger = require('agr-logger');
  var fs = require('fs');

  // recommended
  var logger = Logger({
    output: {
      method: function (msg, ops) {
        ops.fs.appendFile(ops.file, msg);
      }
    },
    ops: {
      file: 'file.txt',
      fs: fs
    }
  });

  // not recommended, but possible
  var logger = Logger({
    output: {
      method: function (msg) {
        // all input parameters get the _internal
        // property assigned to them
        _internal.myCustomProp.fs.appendFile(
          _internal.myCustomProp.file, msg);
      }
    },
    myCustomProp: {
      file: 'file.txt',
      fs: fs
    }
  });

  
```

### msg vs log
Log is less verbose and has higher precedence, by default, than msg.  Log should
be used to output simple messages that apply irrespective of the environment
where the logging is happening (i.e. prod, dev, test, etc.).  msg should be
used in more restrictive environments like prod or stage.  This is just a 
recommendation though and both functions can be explicitly turned on or off
based on the environment.

See xxx and xxx for more details.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 Alexander G. Ramirez  
Licensed under the MIT license.
