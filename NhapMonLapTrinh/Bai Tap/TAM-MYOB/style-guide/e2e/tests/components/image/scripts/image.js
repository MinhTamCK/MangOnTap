// tests

casper.then(function() {
    casper.test.assertExists('.myob-component-image', 'Should have myob image');
    casper.test.assertElementCount('.myob-component-image img', 1,  'Should have 1 img');
    casper.test.assertExists('img[alt="puppy"]', 'Has alt');
    casper.test.assertExists('img[title="Puppy"]', 'Has title');

})
    .then(function() {
        phantomcss.screenshot('.myob-component-image', 'myob-component-image');
    })
;
