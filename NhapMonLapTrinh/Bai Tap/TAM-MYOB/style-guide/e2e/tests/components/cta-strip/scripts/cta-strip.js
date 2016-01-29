// tests

casper.then(function() {
    casper.test.assertExists('.myob-component-cta-strip', 'Should have myob strip');
    casper.test.assertSelectorHasText('a.btn', 'Button 1');

})
    .then(function() {
        phantomcss.screenshot('.myob-component-cta-strip', 'myob-cta-strip');
    })
;
