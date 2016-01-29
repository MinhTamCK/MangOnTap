// tests

casper.then(function() {
    casper.test.assertExists('.myob-component-button', 'Should have myob buttons');
    casper.test.assertSelectorHasText('.buttoncomp:first-child a', 'Button 1');

})
    .then(function() {
        phantomcss.screenshot('body', 'myob-buttons');
    })
;
