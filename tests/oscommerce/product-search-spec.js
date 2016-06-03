/**
 * test with shop specific test data
 * plattform: oscommerce
 * 
 * call this test like
 *   casperjs test --includes=includes/utils.js,config.js product-search-spec.js
 * 
 * test search for exact product name
 * it runs:
 * - get the startpage
 * - fill in a productname to serach form and send it
 * - validate seo syntax of result links, then the product link is clicked
 * - on product info page in h1.productsName the exact match to product is assert
 * 
 *  Powered by openstream©, Swiss Webshop Solutions
 *  http://www.openstream.com
 * 
 *  Released under the GNU General Public License   
 */    

// some testdescrition
var TEST_DESCRIPTION = 'searche for product "' + PRODUCT_TO_FIND_SPEC + '", see if result link contains product-name';


/// tests
console.log('Test: ' + TEST_DESCRIPTION);


// get startpage
casper.start(test_url, function() { 

    // fill and submit search 
    this.fill('form[name="quick_find"]', { 'keywords' : PRODUCT_TO_FIND_SPEC }, true);
});


casper.then(function() {

  var pID, page_name, test_result = false;
  
  var links = this.evaluate(getLinks);
  this.echo('[found] ' + links.length + ' links');
  
  // SEO link like -p-432.html
  for(var i=0;i< links.length; i++){ 
    
    var page_name = links[i].substr(links[i].lastIndexOf('/')+1);

    if( TEST_USES_SEO ) {
      pID = getProductsIdByUri(page_name);
      test_result = '-p-' + pID + '.html' == page_name.match(/-p-[0-9].+/);
    } else {
      pID = 'not searched';
      test_result = page_name.length > TEST_LIST_LINK_MIN_LEN;
    }
    
    this.test.assertEquals(test_result, true, 'Link Test: ' + page_name +', id:' + pID + '');
  }

  // first result link is visable:
  this.test.assertVisible('td.productListing-data a','search result link is visable');

  // get next page
  this.click('td.productListing-data a');
});


casper.then(function() {

  // inject jquery
  casper.page.injectJs(PATH_TO_JQUERY);

  // to access page elemets via jquery this.evaluate( is needet
  var prod_titel = this.evaluate(function() {
      // no global varbels visable in here ..
      // for frokost, paracentroshop, hobbyshop-ritter use:
      var PODUCT_INFO_SELECTOR = 'h1.productsName';  
      
      // for toptuning use:
      if(window.document.URL.match(/toptuning/)) {        
        PODUCT_INFO_SELECTOR = 'td.products_name h1';        
      }

      // for "..on® pr.." empty is returned, so the char ® fails
      // but others like ä.è seems to do well   
      return $(PODUCT_INFO_SELECTOR).html();
  });

  this.echo('[search] ' + PRODUCT_TO_FIND_SPEC); this.echo('[found]  ' + prod_titel);  this.echo('[test] ' + ( prod_titel === PRODUCT_TO_FIND_SPEC));
  
  // text in h1 title element
  this.test.assertEquals(PRODUCT_TO_FIND_SPEC, prod_titel, 'find product name in product title');

  // text somewhere on page:
  this.test.assertTextExist(PRODUCT_TO_FIND_SPEC,'find product name in result page');
});


casper.run(function() {
    // make an colored result
    this.test.done();
});
