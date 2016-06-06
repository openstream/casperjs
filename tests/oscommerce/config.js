/**
 * configuration for test
 * plattform: oscommerce
 * 
 * include this configuration like this:
 *   casperjs test --includes=utils.js,config.js  test1.js test2.js ..
 * 
 *  Powered by openstream©, Swiss Webshop Solutions
 *  http://www.openstream.com
 * 
 *  Released under the GNU General Public License   
 */

// base url for test
var test_url = 'http://localhost/';


// product name to find for search spec test (exact match)
var PRODUCT_TO_FIND_SPEC = '6 Stück Ersatzkohlefilter mit Gehäuse';
//toptuning: var PRODUCT_TO_FIND_SPEC = '4 in 1 Drehzahlmesser inkl. Öldruck, Öltemperatur und Wassertemp';

// product name to find for search generell test (not exact match)
var PRODUCT_TO_FIND_GENERELL = 'für';

// selector for title on product info page in info-block
var PODUCT_INFO_TITLESELECTOR = 'h1.productsName'; 

// get a string for unique email config values (prevents test fails cause customer-email allready exists
var unique_ts = (new Date().getMonth()+1) + '.' + (new Date().getDay()+1) + '.' + new Date().getHours() + '.' + new Date().getMinutes() + '.' + new Date().getSeconds();

// customer data for account tests
var customer = new Object();
customer.customers_id = -1;
customer.gender = 'm';
customer.firstname = 'Test Firstname';
customer.lastname = 'Test Lastname';
customer.dob = '';
customer.email_address = 'test-' + unique_ts + '@domain.tld';
customer.default_address_id = '';
customer.telephone = '0123456789';
customer.fax = '9876543210';
customer.password = '';
customer.newsletter = 1;
customer.guest_account = 0;
customer.company = 'Openstream';
customer.street_address = 'Heinrichstrasse 267a';
customer.suburb = '';
customer.postcode = '8005';
customer.city = 'Zürich';
customer.state = '';
customer.country = 'Schweiz';
customer.zone_id = '';


var TEST_USES_SEO = true;
// if not test uses seo, link filename is checked for minimum length
var TEST_LIST_LINK_MIN_LEN = 10;

// local path, "casperjs test --includes=includes/jquery.min.js .." seems not to work as expected, so lets include it here
var PATH_TO_JQUERY = 'includes/jquery.min.js';


// customize casper
casper.options.verbose  = false;
casper.options.logLevel = 'debug';// 'info';// 'debug'
