var runner = {};

var fs = require('fs');
var config = require(fs.absolute(fs.workingDirectory + '/e2e/config/config.js'));

runner.run = function(casper, phantomcss, component) {

    //------------------------- config

    var testServer = config.testServer;
    var testsFolder = '/e2e/tests/components/' + component;
    var testUrls = [testServer + '/content/myob/Tests/' + component + '.html'];


    casper.test.begin(component + ' tests', function() {

        phantomcss.init({
            rebase: casper.cli.get("rebase"),
            casper: casper,
            libraryRoot: fs.absolute(fs.workingDirectory + '/e2e/libs'),
            screenshotRoot: fs.absolute(fs.workingDirectory + testsFolder + '/screenshots'),
            failedComparisonsRoot: fs.absolute(fs.workingDirectory + testsFolder + '/failures'),
            addLabelToFailedImage: false,
            mismatchTolerance: 0.05
        });

        // browser console
        casper.on('remote.message', function(msg) {
            this.echo('remote.message: ' + msg);
        })

        casper.on('error', function(err) {
            this.die("PhantomJS has errored: " + err);
        });

        casper.on('resource.error', function(err) {
            casper.log('Resource load error: ' + err, 'warning');
        });

        //-------------------------- setup

        // load scripts
        var scripts = fs.list(fs.workingDirectory + testsFolder + '/scripts');

        //-------------------------- test scenario

        // start

        casper.start().eachThen(testUrls, function(item) {
            var url = item.data;

            this.each(config.viewports, function(casper, viewport) {


                this.then(function() {
                    // store for test scripts
                    casper.options.viewportSize = viewport;

                    console.log(viewport.width + ' x ' + viewport.height);
                });

                this.then(function() {
                    this.viewport(viewport.width, viewport.height);
                });

                this.thenOpen(url, function() {
                    this.waitForUrl(url);
                });

                this.then(function() {

                    // inject test scripts

                    for (var i = 0; i < scripts.length; i++) {
                        if (/\.js$/.test(scripts[i])) {
                            phantom.injectJs(fs.workingDirectory + testsFolder + '/scripts/' + scripts[i]);
                        }
                    }

                });
            });
        });


        // compare screenshots

        casper.then(function() {
            phantomcss.compareAll();
        });

        // casper run

        casper.run(function() {
            console.log('\nDone.');
            // phantomcss.getExitStatus() // pass or fail?
            casper.test.done();
        });
    });
};

module.exports = runner;
