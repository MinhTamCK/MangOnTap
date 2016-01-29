// tests

casper.then(function() {
    casper.test.assertExists('.myob-component-text', 'Should have myob text');
    casper.test.assertElementCount('.myob-component-text', 1,  'Should have 1 myob-component-text');
    casper.test.assertSelectorHasText('.myob-component-text', 'This is some text.');

})
    .then(function() {
        phantomcss.screenshot('.myob-component-text', 'myob-text');
    })
;
