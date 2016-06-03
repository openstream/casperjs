/**
 * startpage test for oscommerce
 * 
 * run this test as:
 *   casperjs test startpage-test.js
 * 
 * tests visability of menu, logo, textapearence and on startpage the wellcome message
 * it runs:
 * - get the startpage
 * - find logo, visabil menu an textes
 * - then call a product info page an test ist
 * 
 *  Powered by openstream©, Swiss Webshop Solutions
 *  http://www.openstream.com
 * 
 *  Released under the GNU General Public License   
 */    

/// config here the specific shop data
var page1 = 'http://localhost/
var page2 = 'http://localhost/meine-saftstation-i-16.html';

var WELLCOME_MESSAGE = 'Grüezi und herzlich willkommen!';
var LOGO_IMGAGE_NAME = 'Frohkostheader_rucola.jpg';            
var MENU_SELECTOR = 'ul#nav';
var TEXT_TEST = 'Kaspar Kunz, KUNZ’ Vitalprodukte';
var INFO_PAGE_TEXT = 'Frische Säfte leicht gemacht:';

// casperjs config
casper.options.verbose  = true;
casper.options.logLevel = 'debug';



/// tests


casper.test.begin('startpage tests', 4, function(test) {
  // load page 1
  casper.start(page1, function() {
	
    test.assertVisible(MENU_SELECTOR,'Menü sichtbar');
    
    test.assertResourceExists(LOGO_IMGAGE_NAME, 'Logo Bild [' + LOGO_IMGAGE_NAME + '] verfügbar');
    
    test.assertTextExist(WELLCOME_MESSAGE, 'page body contain "Grüezi und herzlich willkommen!"');
    
    this.echo(TEXT_TEST);

    test.assertTextDoesntExist(TEXT_TEST,'Text ['+TEXT_TEST+'] nicht vorhanden');
    
  }).run(function() {
    
    test.done();
  });
});


casper.test.begin('infopage tests', 3, function(test) {
  // load page 2
  casper.start(page2, function() {
    
    test.assertVisible(MENU_SELECTOR,'Menü sichtbar');
    
    test.assertTextExist(INFO_PAGE_TEXT ,'Text ['+INFO_PAGE_TEXT+'] vorhanden');
    
    test.assertTextExist(TEXT_TEST,'Text ['+TEXT_TEST+'] vorhanden');
    
  }).run(function() {

        test.done();
  });
});
