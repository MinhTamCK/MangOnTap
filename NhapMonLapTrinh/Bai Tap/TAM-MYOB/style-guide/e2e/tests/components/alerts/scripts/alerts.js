// tests
// assumes test-alert-warning has days hidden = 0 and success has 1
// so success should be correctly hidden from Close test after first viewport

casper.then(function() {
    casper.test.assertExists('.alert-warning', 'Should have .alert-warning');
    casper.test.assertExists('[data-store-alert*=test-alert-warning]', 'Should have test-alert-warning');
})
    .then(function() {

        if (casper.exists('[data-store-alert*=test-alert-success]')) {
            phantomcss.screenshot('[data-store-alert*=test-alert-success]', 'alert-success');
        }
    })
    .then(function() {
        phantomcss.screenshot('[data-store-alert*=test-alert-info]', 'alert-info');
    })
    .then(function() {
        phantomcss.screenshot('[data-store-alert*=test-alert-warning]', 'alert-warning');
    })
    .then(function() {
        phantomcss.screenshot('[data-store-alert*=test-alert-danger]', 'alert-danger');
    })
    .then(function() {
        phantomcss.screenshot('[data-store-alert*=test-alert-mobile]', 'alert-mobile');
    });
