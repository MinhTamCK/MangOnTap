casper.then(function() {
    casper.test.assertExists('.myob-component-accordion', 'Should have accordion');
    casper.test.assertElementCount('#myob-accordion', 0, 'Should have no simple id');
    casper.test.assertElementCount('.myob-component-accordion', 2, 'Should have two accordions');
    casper.test.assertSelectorDoesntHaveText('body', 'accordian', ' Should spell accordion correctly');

    casper.test.assertElementCount('h4 a.collapsed', 4, 'Should all be closed initially');

    casper.test.assertSelectorHasText('.accordioncomp:nth-child(1) .panel:nth-child(1) h4 a', 'Heading 1', ' Should have heading');

    casper.test.assertExists('.accordioncomp:nth-child(1) .panel:nth-child(1) h4 a.collapsed', 'Should be collapsed');
})
    .then(function() {
        // open it
        this.mouse.click('.accordioncomp:nth-child(1) .panel:nth-child(1) h4 a');
        this.wait(500);
    })
    .then(function() {
        casper.test.assertDoesntExist('.accordioncomp:nth-child(1) .panel:nth-child(1) h4 a.collapsed', 'Should not be collapsed');

    })
    .then(function() {
        // close it
        this.mouse.click('.accordioncomp:nth-child(1) .panel:nth-child(1) h4 a');
        this.wait(500);
    })
    .then(function() {

        casper.test.assertExists('.accordioncomp:nth-child(1) .panel:nth-child(1) h4 a.collapsed', 'Should be collapsed');

    })
    .then(function() {
        // open 2nd for sceenshot
        this.mouse.click('.accordioncomp:nth-child(2) .panel:nth-child(1) h4 a');
        this.wait(500);
    })
    .then(function() {

        phantomcss.screenshot('body', 'accordion');
})
;
