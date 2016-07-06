/**
 * test if page images, syles and scripts have been loadet 
 * framework: oscommerce
 * 
 * call this test like
 *    casperjs test --includes=config.js,includes/utils.js check-resources.js --url=http://www.my-shop-site.com/my-page.html
 * 
 * 
 *  Powered by openstream
 *  http://www.openstream.ch
 * 
 *  Released under the GNU General Public License   
 */

require("utils")

var get_url = casper.cli.get("url");
if( typeof test_url == 'undefined' ) { 
  var test_url = typeof get_url != 'undefined' ? get_url : 'http://localhost/o/frohkost/';
} else {
  test_url = typeof get_url != 'undefined' ? get_url : test_url;
}  


// get startpage 
casper.start(test_url, function() {

    this.echo('# loaded ' + this.getCurrentUrl() + ' len:' + this.getPageContent().length);

    // images
    var links = this.evaluate(getLinks, test_page.get_img_selector, false);
    this.echo('# ' + links.length +' images found');
    assertResourceExistsByArray(this, links);
    
    // css
    links = this.evaluate(getLinks, test_page.get_link_selector, true);
    this.echo('# ' + links.length +' styles found');
    assertResourceExistsByArray(this, links);

    // scripts
    links = this.evaluate(getLinks, test_page.get_script_selector, false);
    this.echo('# ' + links.length +' scripts found');
    assertResourceExistsByArray(this, links);
});


casper.run(function() {
    // message
    this.test.done();
});
