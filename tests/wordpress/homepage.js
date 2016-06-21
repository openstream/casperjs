page = 'http://hostpoint.openstream.ch/wordpress/demo/',

casper.test.begin('Testing homepage', function suite(test) {

    // Start page
    casper.start(page, function () {

        test.assertHttpStatus(200);
        test.assertTitle('Openstream Demo – Eine weitere WordPress-Seite');
        test.assertExists('body.home');
        test.assertExists('header#masthead h1 a[href="' + page + '"]');
        test.assertExists('header > h2');
        test.assertExists('aside#secondary #categories-2 > ul > li');
        test.assertExists('footer#colophon > div > span');
    })

    .run(function () {
        test.done();
    });
});
