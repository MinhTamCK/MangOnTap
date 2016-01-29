// tests

casper.then(function() {
    casper.test.assertElementCount('.myob-component-pricing-box', 2, 'Should have 2 pricing boxes');
    casper.test.assertElementCount('.myob-recommended', 1, 'Should have 1 most popular');

    casper.test.assertSelectorHasText('.pricingboxcomp:nth-child(1) .myob-pricing-box-heading h3.myob-component-title', 'Product 1');
    casper.test.assertSelectorHasText('.pricingboxcomp:nth-child(1) .myob-pricing-box-heading p.myob-price .myob-currency', '$');
    casper.test.assertSelectorHasText('.pricingboxcomp:nth-child(1) .myob-pricing-box-heading p.myob-price', '19.95');
    casper.test.assertSelectorHasText('.pricingboxcomp:nth-child(1) .myob-pricing-box-heading p.myob-price .myob-per-month', '/mo');
    casper.test.assertSelectorHasText('.pricingboxcomp:nth-child(1) .myob-pricing-box-heading p.myob-product-desc', 'Components');
    casper.test.assertSelectorHasText('.pricingboxcomp:nth-child(1) .myob-pricing-box-body .myob-feature-list li', 'Pricing Box');
    casper.test.assertSelectorHasText('.pricingboxcomp:nth-child(1) .myob-pricing-box-body .myob-component-button a', 'Get one');
    casper.test.assertSelectorHasText('.pricingboxcomp:nth-child(1) .myob-pricing-box-body .myob-outro a', 'Get one more');

    casper.test.assertSelectorHasText('.pricingboxcomp:nth-child(2) .myob-most-popular', 'So much text');
    casper.test.assertSelectorHasText('.pricingboxcomp:nth-child(2) .myob-pricing-box-heading h3.myob-component-title', 'Product 2');
    casper.test.assertSelectorHasText('.pricingboxcomp:nth-child(2) .myob-pricing-box-heading p.myob-price .myob-currency', '$');
    casper.test.assertSelectorHasText('.pricingboxcomp:nth-child(2) .myob-pricing-box-heading p.myob-price', '0.018');
    casper.test.assertSelectorHasText('.pricingboxcomp:nth-child(2) .myob-pricing-box-heading p.myob-price .myob-per-month', 'per month');
    casper.test.assertSelectorHasText('.pricingboxcomp:nth-child(2) .myob-pricing-box-heading p.myob-product-desc', 'alphabet');
    casper.test.assertElementCount('.pricingboxcomp:nth-child(2) .myob-pricing-box-body .myob-feature-list li', 0, 'No features');
    casper.test.assertSelectorHasText('.pricingboxcomp:nth-child(2) .myob-pricing-box-body .myob-component-button a', 'consonants');
    casper.test.assertSelectorHasText('.pricingboxcomp:nth-child(2) .myob-pricing-box-body .myob-outro a', 'vowels');

})
    .then(function() {
        phantomcss.screenshot('body', 'myob-pricing');
    })
;
