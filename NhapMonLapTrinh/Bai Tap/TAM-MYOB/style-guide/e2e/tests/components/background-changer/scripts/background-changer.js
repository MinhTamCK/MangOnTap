casper.then(function() {
    casper.test.assertExists('.myob-component-background-changer.myob-large-height.myob-border-top.myob-border-bottom', 'Should have background-changer');
    casper.test.assertExists('.myob-component-background-changer.myob-small-height[style*="cho.jpg"]', 'Should have background image');
})
    .then(function() {

        phantomcss.screenshot('.backgroundchangercomp:nth-child(1)', 'background 1');
        phantomcss.screenshot('.backgroundchangercomp:nth-child(2)', 'background 2');
    })
;
