// ------------- login if running on 4502

var testUrl = '?';

casper.waitForSelector('#username');

casper.then(function(){
  casper.fillSelectors("form#login", {
    "#username": "admin",
    "#password": "admin"
  });

  casper.click('#submit-button');
});

casper.waitForUrl(testUrl);

//---------------- login end

