// tests

casper.then(function() {
    casper.test.assertExists('.myob-component-brand-logos', 'Should have myob brand logos');
    casper.test.assertExists('.myob-brand-logos-heading', 'Should have logos heading');
    casper.test.assertExists('.myob-brand-logos-list', 'Should have logos list');
    casper.test.assertSelectorHasText('.myob-brand-logos-heading', 'Logo List 1');
})
    .then(function() {
        phantomcss.screenshot('.myob-component-brand-logos', 'myob-brand-logos');
    })
;
