var fs = require('fs');
var phantomcss = require(fs.absolute(fs.workingDirectory + '/e2e/phantomcss.js'));
var runner = require(fs.absolute(fs.workingDirectory + '/e2e/scripts/component-tests.js'));

runner.run(casper, phantomcss, 'alerts');

