// tests

casper.then(function() {
    casper.test.assertElementCount('.myob-component-testimonial', 3, 'Should have testimonials');

    casper.test.assertSelectorHasText('.testimonialcomp:nth-child(1) .myob-testimonial-text', 'Excellent', 'Has testimonial text')
    casper.test.assertSelectorHasText('.testimonialcomp:nth-child(1) .myob-profession', 'Photographer', 'Has profession text')
    casper.test.assertSelectorHasText('.testimonialcomp:nth-child(1) .myob-profession', 'Pete', 'Has name text')
    casper.test.assertSelectorHasText('.testimonialcomp:nth-child(2) .myob-link', 'Woof', 'Has link text')



})
    .then(function() {
        phantomcss.screenshot('body', 'myob-testimonial');
    })
;
