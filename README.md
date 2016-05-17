# CasperJS Frontend Tests

[CasperJS](http://casperjs.org/) is navigation scripting & testing for PhantomJS and SlimerJS.

## Magento

This [test suite](https://github.com/magento-hackathon/hackathon-casperjs) was developed during various Magento hackathons in Germany. The tests located in the tests directory work with a default Magento CE installation with sample data installed. The idea is that if you have a custom project you will duplicate those tests in a separate directory and make the necessary adjustments so that the tests pass with your custom theme, extensions and custom modifications.

## WordPress/WooCommerce

T.J. Fogarty put up a [gist](https://gist.github.com/tjFogarty/46a6bc231dbebe925728) for testing a WordPress search form with CasperJS, which might be a good start for more tests.

``` JavaScript
/*global casper*/

'use strict';

var config = require('../config'),
    page = 'http://' + config.local_url + '/',
    formData = {
      's': 'suppliers' // search term
    };

casper.test.begin('Testing search form', 2, function suite(test) {
  test.comment('Loading ' + page + '...');

  casper.start(page, function() {
    test.assertExists('.c-form--search', 'Test that search form is present');
  });

  casper.then(function() {
    test.comment('Filling out the form...');
    casper.fill('.c-form--search', formData, false);
    casper.thenClick('.c-form--search .c-button');
  });

  casper.then(function() {
    test.assertTextExists('Search results for ' + formData.s, 'Results page contains search query');
  });

  casper.run(function() {
    test.done();
  });
});
```

Code is poetry.
