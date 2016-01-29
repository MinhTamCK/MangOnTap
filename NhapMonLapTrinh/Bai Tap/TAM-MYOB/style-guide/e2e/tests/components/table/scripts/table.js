// tests

casper.then(function() {
    casper.test.assertElementCount('.myob-component-table', 1, 'Should have table');

        casper.test.assertSelectorHasText('.table thead tr th[valign="top"]:first-child', 'Column 1', 'column 1 heading');
        casper.test.assertSelectorHasText('.table tbody tr:nth-child(1) td:nth-child(3)', 'Cell 43', 'cell text');
        casper.test.assertSelectorHasText('.table tbody tr:nth-child(2) td[width="40%"]', 'Lorem', 'lorem');

})
    .then(function() {
        phantomcss.screenshot('.table', 'myob-table');
    })
;
