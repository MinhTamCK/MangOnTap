casper.then(function() {
    casper.test.assertExists('.myob-component-proof-point', 'Should have myob proof point');

    casper.test.assertElementCount('h3', 1,  'Should have one h3');
    casper.test.assertElementCount('h4', 1,  'Should have one h4');

    casper.test.assertExists('img[alt="puppy"]', 'Has alt');
    casper.test.assertExists('img[alt="$"]', 'Has alt');

    casper.test.assertSelectorHasText('a[title="puppy"] .myob-proof-desc', 'Grrr')
    casper.test.assertSelectorHasText('a[title="$"] .myob-proof-desc', 'Some more text.')

})
    .then(function() {
        phantomcss.screenshot('.myob-proof-point', 'myob-proof-point');
    })
;
