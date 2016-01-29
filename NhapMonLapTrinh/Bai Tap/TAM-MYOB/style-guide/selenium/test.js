var webdriver = require('selenium-webdriver'),
    By = webdriver.By;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get('http://www.google.com/ncr');

driver.call(function* () {
    var query = yield driver.findElement(By.name('q'));
    query.sendKeys('webdriver');

    var submit = yield driver.findElement(By.name('btnG'));
    submit.click();
});

driver.wait(function* () {
    var title = yield driver.getTitle();
    return 'webdriver - Google Search' === title;
}, 5000);

driver.quit();
