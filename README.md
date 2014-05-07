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
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 Alexander G. Ramirez  
Licensed under the MIT license.
