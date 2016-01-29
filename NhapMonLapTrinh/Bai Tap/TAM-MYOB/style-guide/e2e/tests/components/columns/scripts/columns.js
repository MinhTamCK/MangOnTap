casper.then(function() {

    casper.test.assertElementCount('.columncontrolcomp:nth-child(1) .col-md-offset-2', 1, 'Has single column');

    casper.test.assertElementCount('.columncontrolcomp:nth-child(2) .col-sm-6', 2, 'Has 50/50 column');

    casper.test.assertElementCount('.columncontrolcomp:nth-child(3) .col-sm-4', 1, 'Has 25/75 column');
    casper.test.assertElementCount('.columncontrolcomp:nth-child(3) .col-sm-4+.col-sm-8', 1, 'Has 25/75 column');

    casper.test.assertElementCount('.columncontrolcomp:nth-child(4) .col-sm-8', 1, 'Has 75/25 column');
    casper.test.assertElementCount('.columncontrolcomp:nth-child(4) .col-sm-8+.col-sm-4', 1, 'Has 75/25 column');

    casper.test.assertElementCount('.columncontrolcomp:nth-child(5) .col-sm-4', 3, 'Has 3 column');

    casper.test.assertElementCount('.columncontrolcomp:nth-child(6) .col-sm-3', 4, 'Has 4 column');

})
    .then(function() {
        // actually just a blank page
        phantomcss.screenshot('body', 'myob-component-column');
    })
;
