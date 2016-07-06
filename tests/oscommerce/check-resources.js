/**
 * test page images, syles and scripts have been loadet
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

// get startpage 
casper.start(test_url, function() {

    // images
    var links = this.evaluate(getLinks, test_page.get_img_selector, false);
    this.echo('# ' + links.length +' images found');
    
    for(var i=0;i< links.length; i++){     
      var s = links[i].substr(links[i].lastIndexOf('/')+1);
      this.test.assertResourceExists(s , 'resource exists: ' + links[i]);
    }

    // css
    links = this.evaluate(getLinks, test_page.get_link_selector, true);
    this.echo('# ' + links.length +' styles found');
    
    for(var i=0;i< links.length; i++){     
      var s = links[i].substr(links[i].lastIndexOf('/')+1);
      this.test.assertResourceExists(s , 'resource exists: ' + links[i]);
    }

    // scripts
    links = this.evaluate(getLinks, test_page.get_script_selector, false);
    this.echo('# ' + links.length +' scripts found');
    
    for(var i=0;i< links.length; i++){     
      var s = links[i].substr(links[i].lastIndexOf('/')+1);
      this.test.assertResourceExists(s , 'resource exists: ' + links[i]);
    }
});


casper.run(function() {
    // message
    this.test.done();
});
