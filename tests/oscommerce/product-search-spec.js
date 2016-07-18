/**
 * test shop product search for exatct match
 * framework: oscommerce
 * 
 * call this test like
 *   casperjs test --includes=config.js product-search-spec.js
 * 
 *  Powered by openstream©, Swiss Webshop Solutions
 *  http://www.openstream.com
 * 
 *  Released under the GNU General Public License   
 */    


// get startpage fill search form and submit it
casper.start(test_url, function() { 

    this.fill(product.selector_search_form, { 'keywords' : product.name_find_part }, true);
});


// on result list find product and click 'details'
casper.then(function() {

  // inject config
  casper.page.injectJs('config.js');

  // link is visable
  //this.test.assertVisible('td.productListing-data a', 'search result link is visable');
  this.test.assertVisible( this.evaluate(function () {return product.selector_search_result_vis; }) , 'search result link is visable');
  
  // in result list, access page elemets via this.evaluate querySelector
  var product_name = this.evaluate( function() { return eval(product.selector_search_result); } );

  // test
  this.test.assertEquals(product_name.match(product.name_find_part)[0], product.name_find_part , 'search result list contains product name');

  // get next page
  this.click(product.selector_search_result_vis);
});


// get product info page
casper.then(function() {

  casper.page.injectJs('config.js');

  var product_name =  this.evaluate(function() { return eval(product.selector_info_name); });
  //var product_name =  this.evaluate(test_cmd);
    
  this.test.assertEquals(product_name.match(product.name_find_part)[0], product.name_find_part , 'product name in product title exists');
});


casper.run(function() {
    // show resutls
    this.test.done();
});
