casper.then(function() {
    casper.test.assertExists('.myob-component-lightbox', 'Should have lightbox');
    casper.test.assertExists('.lightboxcomp .myob-default-modal', 'Should have modal');
    casper.test.assertExists('img[alt="blossoms"]', 'Should have image');
})
    .then(function() {
        // open the modal
        this.mouse.click('.myob-lightbox-icon');
    })
    .then(function() {
        casper.test.assertExists('body.modal-open', 'Should be open');
        this.wait(1000); // fadein time
    })
    .then(function() {
        phantomcss.screenshot('body', 'lightbox');
    })
    .then(function() {
        // close the modal
        this.mouse.click(10, 10);
        this.waitWhileSelector('body.model-open');
        this.wait(1000); // fadeout time
    })
    .then(function() {
        casper.test.assertDoesntExist('body.modal-open', 'Should not be open');
    })
;
