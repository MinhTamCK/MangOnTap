(function() {
    "use strict";

    // forever start -l myob.log -a test-runner-server.js

    var express = require('express');
    var path = require('path');

    var bodyParser = require('body-parser')

    var child_process = require('child_process');

    var app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    var http = require('http');
    var url = require('url');

    //--------- serve a file

    var sendFile = function(res, filename) {
        var filepath = path.join(process.cwd(), filename);

        res.sendFile(filepath, function(err) {
            if (err) {
                console.log(err);
                res.status(err.status).end();
            }
            else {
                // console.log('Sent:', filename);
            }
        });
    };

    // --- start express

    http.createServer(app).listen(process.env.PORT || 8083);

    //--- routing

    //------------ files
    app.get(/\.(js|css|png|jpg|html)$/, function(req, res) {
        var uri = url.parse(req.url, true, false);

        sendFile(res, uri.pathname);
    });

    //------------- home page
    app.get('/', function(req, res) {

        sendFile(res, '/index.html');
    });

    //------------- web hook from git

    var testIsRunning = false;

    app.post('/runtests', function(req, res) {

        console.log('Branch', req.body.ref);

        // test for develop branches

        if (/heads\/(develop|fe-develop)/.test(req.body.ref)) {

            if (!testIsRunning) {
                testIsRunning = true;
                console.log('run tests', req.body.ref);

                child_process.exec('style-guide/test/runtests',
                    {
                        cwd: process.env.HOME + '/myob'
                    },
                    function(error, stdout, stderr) {
                        testIsRunning = false;

                        console.log('stdout: ' + stdout);
                        console.log('stderr: ' + stderr);

                        if (error !== null) {
                            console.log('exec error: ' + error);
                        }
                    });
            }
            else {
                console.log('Tests are already running');
            }
        }

        sendFile(res, '/runtests.html');
    });
}());
