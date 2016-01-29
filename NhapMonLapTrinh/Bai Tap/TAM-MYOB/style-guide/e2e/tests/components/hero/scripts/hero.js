casper.then(function() {
    casper.test.assertExists('.myob-component-hero', 'Should have hero');

    casper.test.assertSelectorHasText('.myob-component-title', "You're my hero", 'Should have title');
    casper.test.assertSelectorHasText('.myob-desc', "No really", 'Should have description');
    casper.test.assertElementCount('.myob-component-button li', 2, 'Should have two buttons');
    casper.test.assertSelectorHasText('a.btn-default', "Get out", 'Should have primary button text');
    casper.test.assertSelectorHasText('a.myob-btn-secondary', "I'm kidding", 'Should have secondary button text');

})
    .then(function() {
        phantomcss.screenshot('.herocomp', 'hero');
    })
;
