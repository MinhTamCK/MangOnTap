casper.then(function() {
    casper.test.assertExists('.myob-component-tile', 'Should have myob tile');

    casper.test.assertExists('.panel.myob-margin-medium', 'Has panel');
    casper.test.assertExists('.panel-heading.myob-bgd-orange', 'Has heading');
    casper.test.assertExists('.panel-body', 'Has body');

    casper.test.assertExists('.panel-body img[alt="tile 1"]', 'Has alt');

    casper.test.assertSelectorHasText('.panel-heading', 'Tile 1');
    casper.test.assertSelectorHasText('.panel-body', 'Tile 1 text');

})
    .then(function() {
        phantomcss.screenshot('.myob-component-tile', 'myob-component-tile');
    })
;
