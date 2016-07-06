/**
 * test customer create account, login and logoff
 * framework: oscommerce
 * 
 * call this test like
 *   casperjs test --includes=config.js customer-create.js
 * 
 * 
 *  Powered by openstream
 *  http://www.openstream.ch
 * 
 *  Released under the GNU General Public License   
 */


// get startpage and click "my account"
casper.start(test_url, function() { 

  // inject config
  casper.page.injectJs('config.js');
  
  this.test.assertExists(this.evaluate(function() {return customer.selector_my_account;}), 'my-account link present');
  
  // click it
  this.click(customer.selector_my_account);
});


// get create account link and click it
casper.then(function() {

  casper.page.injectJs('config.js');

  this.test.assertExists(this.evaluate(function() {return customer.selector_create_account;}), 'create-account link present');
  
  // click it
  this.click(customer.selector_create_account);
});


// fill form and submit
casper.then(function() {

  this.fill(customer.selector_form_create, {
    'gender': customer.gender,
    'firstname': customer.firstname,
    'lastname': customer.lastname,
    'email_address': customer.email_address,    
    // only toptuning:     'email_address_repeat': customer.email_address,    
    'company': customer.company,
    'street_address': customer.street_address,
    'postcode': customer.postcode,
    'city': customer.city,
    'telephone': customer.telephone,
    'fax': customer.fax,
    'password': customer.password,
    'confirmation': customer.password,
    'newsletter': customer.newsletter,
    'country': customer.country_id
  }, true);
  
  // get a screenshot
  this.capture('customer-create-account-filled.png');
  
  this.echo('creating customer "' + customer.email_address + '", this may need some time ...');
});


// first redirect
casper.then(function() { 
// 
});

// next redirect
casper.then(function() { 
//
});


// get create accout result page
casper.then(function() { 
  
  this.test.assertTextExist(customer.message_account_create_success,'account create success message found');
  
  // get a screenshot
  this.capture('customer-create-account-done.png');
  
  // log off
  this.click(customer.selector_logoff);
});


// logged off
casper.then(function() { 
  
  this.test.assertTextExist(customer.message_account_logoff,'logged off success message found');
  
  // log in again
  this.click(customer.selector_my_account);
});


// login page
casper.then(function() { 
  
  this.test.assertTextExist(customer.message_account_login,'login message found');
  
  this.fill(customer.selector_form_login, {
    'email_address': customer.email_address,
    'password': customer.password
  }, true);
  
  // get a screenshot
  this.capture('customer-account-log-in.png');
});

// first redirect
casper.then(function() { 
// 
});



// logged in
casper.then(function() { 

  // get a screenshot
  this.capture('customer-account-logged-in.png');
  
  this.test.assertTextExist(customer.message_account_logged_in,'logged in message found');
  
  // finally log out
  this.click(customer.selector_logoff);
});


// logged off
casper.then(function() { 
  
  this.test.assertTextExist(customer.message_account_logoff,'logged off success message found');  
});



casper.run(function() {
    // show results
    this.test.done();
});
