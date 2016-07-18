/**
 * test page images, syles and scripts have been loadet and loggs failures to file
 * framework: oscommerce
 * 
 * call this test like
 *   casperjs test --includes=config.js,includes/utils.js check-resources.js
 * 
 * 
 *  Powered by openstream
 *  http://www.openstream.ch
 * 
 *  Released under the GNU General Public License   
 */

require("utils")

var get_url = casper.cli.get("url");
var test_url = typeof get_url != 'undefined' ? get_url.toString() :  typeof test_url != 'undefined' ? test_url : 'http://localhost/o/frohkost/';

casper.echo('open:' + test_url);


// get startpage 
casper.start(test_url, function() { 
  
    this.echo('# loaded ' + this.getCurrentUrl() + ' len:' + this.getPageContent().length);

    // images
    var links = this.evaluate(getLinks, test_page.get_img_selector, false);
    this.echo('# ' + links.length +' images found for selector: '+test_page.get_img_selector);
    assertResourceExistsByArray(this, links);
    
    // css
    links = this.evaluate(getLinks, test_page.get_link_selector, true);
    this.echo('# ' + links.length +' styles found for selector: '+test_page.get_link_selector);
    assertResourceExistsByArray(this, links);

    // scripts
    links = this.evaluate(getLinks, test_page.get_script_selector, false, ['google']);
    this.echo('# ' + links.length +' scripts found for selector: '+test_page.get_script_selector);
    assertResourceExistsByArray(this, links);


});


casper.on('step.error', function(err) {
  // wirte error message to log file
  require('fs').write("errors-check-resources.txt", err + "\n", 'a');
  this.echo('Failure has been logged');
});

casper.run(function() {
    // message
    this.test.done();
});
