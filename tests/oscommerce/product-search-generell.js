/**
 * test product search for product name part 
 * framework: oscommerce
 * 
 * call this test as:
 *   casperjs test --includes=config.js product-search-generell.js 
 * 
 * 
 *  Powered by openstream©, Swiss Webshop Solutions
 *  http://www.openstream.com
 * 
 *  Released under the GNU General Public License   
 */


// get startpage
casper.start(test_url, function() { 

    // fill and submit search 
    this.fill(product.selector_search_form, { 'keywords' : product.name_find_part }, true);
});


// result page
casper.then(function() {

  // inject config
  casper.page.injectJs('config.js');

  //this.test.assertVisible('td.productListing-data a' , 'search result link is visable');
  // list visable
  this.test.assertVisible( this.evaluate(function () {return product.selector_search_result_vis;}) , 'search result link is visable');

  // in result list, access page elemets via this.evaluate querySelector
  var product_name = this.evaluate( function() { return eval(product.selector_search_result); } );

  // name matches part
  this.test.assertEquals(product_name.match(product.name_find_part)[0], product.name_find_part , 'search result list contains product name');

  // get product info
  this.click(product.selector_search_result_vis);
});


// product info
casper.then(function() {

  casper.page.injectJs('config.js');

  var product_name =  this.evaluate(function() { return eval(product.selector_info_name); });

  this.test.assertEquals(product_name.match(product.name_find_part)[0], product.name_find_part , 'product name in product title exists');
});



casper.run(function() {
    // make message
    this.test.done();
});
