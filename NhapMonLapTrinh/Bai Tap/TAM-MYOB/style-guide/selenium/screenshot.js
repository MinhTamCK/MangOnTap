"use strict";

let webdriver = require('selenium-webdriver');
let By = webdriver.By;
let Promise = require('bluebird');
let fs = Promise.promisifyAll(require("fs"));

let driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();


function saveScreenshot(data, filename) {

    return fs.writeFileAsync(filename, data.replace(/^data:image\/png;base64,/, ""), 'base64')
        .then(function() {}, function(err) {
            console.log(err);
        });

}

driver.manage().window().setSize(768, 1024 + (1024-952));

driver.get('http://www.google.com/ncr');

driver.call(function* () {
    let query = yield driver.findElement({
        name: 'q'
    });
    query.sendKeys('webdriver');

    let submit = yield driver.findElement({
        name: 'btnG'
    });

    submit.click();
});

driver.wait(function* () {
    let title = yield driver.getTitle();
    return 'webdriver - Google Search' === title;
}, 5000);

driver.call(function* () {

    return saveScreenshot(yield driver.takeScreenshot(), "selenium-screenshot.png")

});

driver.quit();
