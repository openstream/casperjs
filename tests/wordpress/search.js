//'use strict';

//var config = require('../config'),
//    page = 'http://' + config.local_url + '/',
    page = 'http://hostpoint.openstream.ch/wordpress/demo/',
    formData = {
      's': 'WordPress' // search term
    };

casper.test.begin('Testing search form', 2, function suite(test) {
  test.comment('Loading ' + page + '...');

  casper.start(page, function() {
    test.assertExists('form.search-form input.search-field', 'Test that search form is present');
  });

  casper.then(function() {
    test.comment('Filling out the form...');
    casper.fill('form.search-form', formData, false);
    casper.thenClick('form.search-form button.search-submit');
  });

  casper.then(function() {
    test.assertTextExists('Suchergebnisse für: ' + formData.s, 'Results page contains search query');
  });

  casper.run(function() {
    test.done();
  });
});
