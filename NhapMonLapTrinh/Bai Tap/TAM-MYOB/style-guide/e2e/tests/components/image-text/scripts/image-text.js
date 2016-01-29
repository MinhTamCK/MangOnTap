casper.then(function() {
    casper.test.assertExists('.myob-component-text-image', 'Should have myob image-text');

    casper.test.assertExists('.myob-image-block', 'Has image-block');
    casper.test.assertExists('.myob-text-block', 'Has text-block');

    casper.test.assertExists('img[alt="puppy"]', 'Has alt');

    casper.test.assertSelectorHasText('.myob-text-block', 'Puppy!')

})
    .then(function() {
        phantomcss.screenshot('.myob-component-text-image', 'myob-image-text');
    })
;
