casper.then(function() {
    casper.test.assertExists('.myob-component-video', 'Should have myob video');
    casper.test.assertExists('.myob-component-video iframe', 'Should have myob video iframe');
    casper.test.assertExists('.myob-component-video iframe[src="https://www.youtube.com/embed/a38oYlrREYI"]', 'Should have video url');
})
    .then(function() {
        // just a blank screen - video doesn't show in phantom
        phantomcss.screenshot('.myob-component-video', 'myob-component-video');
    })
;
