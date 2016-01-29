// tests

casper.then(function() {

    // force phantom to no-touch for desktop

    if (casper.options.viewportSize.width >= 992) {
        casper.evaluate('$("html").addClass("no-touch")');
    }

}).then(function() {

    casper.test.assertElementCount('.myob-component-testimonial-slider.myob-bgd-orange.text-center', 1, 'Should have testimonial');

    casper.test.assertSelectorHasText('.myob-component-testimonial-slider .myob-quotetext', 'Slide this', 'Has testimonial text')
    casper.test.assertSelectorHasText('.myob-component-testimonial-slider .myob-component-button', 'Bet', 'Has button text')
    casper.test.assertSelectorHasText('.myob-component-testimonial-slider .myob-person-name', 'Jaxon', 'Has name')
    casper.test.assertSelectorHasText('.myob-component-testimonial-slider .myob-person', 'Punter', 'Has profession')
})
    .then(function() {
        phantomcss.screenshot('body', 'myob-testimonial-slider unslid');
    })
    .then(function() {
        casper.mouse.move('.myob-component-testimonial-slider');

        casper.wait(600).then(function() {
            phantomcss.screenshot('body', 'myob-testimonial-slider slid');
        })

    })
;
