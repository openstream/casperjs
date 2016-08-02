/**
 * get all links from a page and create a bash script contains tests for each found page
 * framework: oscommerce
 * 
 * call this test like
 *   casperjs test --includes=config.js customer-create.js -url=http://www.page-to-test-com/my-page.html 
 * 
 * 
 *  Powered by openstream
 *  http://www.openstream.ch
 * 
 *  Released under the GNU General Public License   
 */

require("utils")

var get_url = casper.cli.get("url");
var test_url = typeof get_url != 'undefined' ? get_url : ( typeof test_url != 'undefined' ? test_url : 'http://localhost/');

var links = [];


casper.start(test_url, function() {

  var selector = test_page.get_links_selector;

  var file_data = '';
    var a = this.evaluate(getLinks,selector,true);
    this.echo('# ' + a.length +' pages found for selector "' + selector + '"');
    for(var i=0;i< a.length; i++){ 
      this.echo('# ' + (i+1)+ ': ' + a[i]);
      file_data += 'casperjs test --includes=config.js,includes/utils.js check-resources-crawler.js --url='+  a[i] + ";\nsleep 2;\n";
    }
    require('fs').write("test.sh", file_data, 'w');
    
    for(var i=0; i< a.length && i < 2 ; i++){     
      this.echo((i+1) + ': ' + a[i]);
    }
    this.test.assertEquals( (a.length > 0 ), true, 'links found' );
    links = a;
    this.echo("\n\n the testfile test.sh has been written. start it with\n sh test.sh\n\n");
});


casper.run(function() {

    this.test.done();
});
