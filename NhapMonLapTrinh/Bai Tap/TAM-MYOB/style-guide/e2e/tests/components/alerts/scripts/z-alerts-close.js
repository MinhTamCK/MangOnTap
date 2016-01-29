// run last as it hides the sucess alert, breaking screenshots

// tests closing alert
// assumes test-alert-warning has days hidden = 0 and success has 1

casper.then(function() {
    casper.test.assertVisible('[data-store-alert*=test-alert-warning]', 'test-alert-warning should be visible');
})
.then(function(){
  // close it
  this.mouse.click('[data-store-alert*=test-alert-warning] button');
  this.mouse.click('[data-store-alert*=test-alert-success] button');
})
.then(function() {
    casper.test.assertNotVisible('[data-store-alert*=test-alert-warning]', 'test-alert-warning should not be visible');
    casper.test.assertNotVisible('[data-store-alert*=test-alert-success]', 'test-alert-success should not be visible');
})
.then(function() {
    casper.reload();
})
.then(function() {
    casper.test.assertVisible('[data-store-alert*=test-alert-warning]', 'test-alert-warning should be visible');
    casper.test.assertNotVisible('[data-store-alert*=test-alert-success]', 'test-alert-success should not be visible');
})
;
