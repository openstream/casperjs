/**
 * test search for exact product name
 * plattform: oscommerce
 * 
 * call this test as:
 *   casperjs test --includes=includes/utils.js,config.js product-search-generell.js 
 * 
 * test search for exact product name
 * the test does:
 * - get the startpage
 * - fill in a productname to serach form and send it
 * - then the product link is clicked
 * - on product info page find product  name in h1.productsName exact match
 * 
 *  Powered by openstream©, Swiss Webshop Solutions
 *  http://www.openstream.com
 * 
 *  Released under the GNU General Public License   
 */

// some testdescritpion
var TEST_DESCRIPTION = 'searche for product "' + PRODUCT_TO_FIND_GENERELL + '", see if result link contains product-name';


// tests
console.log('Test: ' + TEST_DESCRIPTION);


// get startpage
casper.start(test_url, function() { 

    // fill and submit search 
    this.fill('form[name="quick_find"]', { 'keywords' : PRODUCT_TO_FIND_GENERELL }, true);
});


casper.then(function() {

  var pID, page_name, test_result = false;
  var links = this.evaluate(getLinks);
  this.echo('[found] ' + links.length + ' links');
  
  // see if ö is preset in any link
  for(var i=0;i< links.length; i++) {  
    var page_name = links[i].substr(links[i].lastIndexOf('/')+1);

    if( TEST_USES_SEO ) {
      
      pID = getProductsIdByUri(page_name);
      test_result = '-p-' + pID + '.html' == page_name.match(/-p-[0-9].+/);
    } else {
      
      pID = 'not searched';
      test_result = page_name.length > TEST_LIST_LINK_MIN_LEN;
    }

    this.test.assertEquals(test_result, true, 'Link Test: ' + page_name + ', id:' + pID + '');
  }

  // first result link is visable:
  this.test.assertVisible('td.productListing-data a','search result link is visable');

  // get next page
  this.click('td.productListing-data a');
});


casper.then(function() {

  // inject jquery
  casper.page.injectJs(PATH_TO_JQUERY);
  
  // access to page elemets via jquery within this.evaluate( ) 
  var prod_titel = this.evaluate(function() {
    
      // currently no global variabels are aviable here, so config selector here:

      // for frokost, paracentroshop, hobbyshop-ritter use:
      var PODUCT_INFO_SELECTOR = 'h1.productsName';  
      
      if(window.document.URL.match(/toptuning/)) {
        // for toptuning use:
        PODUCT_INFO_SELECTOR = 'td.products_name';
      }
            
      var name = $( PODUCT_INFO_SELECTOR ).html();
      return name;
  });

  // text somewhere on page
  this.test.assertTextExist(PRODUCT_TO_FIND_GENERELL,'find product name in result page');
  
  this.echo('[search] ' + PRODUCT_TO_FIND_GENERELL); 
  this.echo('[found]  ' + prod_titel);  
  this.echo('[test] ' + (prod_titel.match(PRODUCT_TO_FIND_GENERELL) !== -1));
  
  // text in h1 element
  this.test.assertEquals( prod_titel != '' && (prod_titel.match(PRODUCT_TO_FIND_GENERELL) !== -1), true, 'find product name in product title');

});


casper.run(function() {
    // make message
    this.test.done();
});
