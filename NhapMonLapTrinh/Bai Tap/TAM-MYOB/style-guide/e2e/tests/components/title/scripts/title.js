casper.then(function() {
    casper.test.assertElementCount('.myob-component-title', 3, 'Should have myob title');
    casper.test.assertSelectorHasText('h2.myob-component-title', 'Title 1');
    casper.test.assertSelectorHasText('h3.myob-component-title', 'Title 2');
    casper.test.assertSelectorHasText('h4.myob-no-margin-top.myob-component-title', 'Title 3');

})
    .then(function() {
        phantomcss.screenshot('.myob-component-title', 'myob-component-title');
    })
;
