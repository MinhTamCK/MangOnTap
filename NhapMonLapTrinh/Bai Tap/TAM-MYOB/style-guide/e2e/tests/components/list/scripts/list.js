// tests

casper.then(function() {
    casper.test.assertExists('.myob-component-list', 'Should have myob list');
    casper.test.assertElementCount('.myob-list-item', 3,  'Should have 3 items');
    casper.test.assertSelectorHasText('.myob-list-item:nth-child(1) .myob-list-desc', 'Item 1 description');
    casper.test.assertExists('.myob-list-item:nth-child(2) img[alt="alt 2"]');
    casper.test.assertSelectorHasText('.myob-list-item:nth-child(3) .myob-list-heading', 'Item 3');

})
    .then(function() {
        phantomcss.screenshot('.myob-component-list', 'myob-list');
    })
;
