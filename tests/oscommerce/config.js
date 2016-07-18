/**
 * configuration for test
 * framework: oscommerce
 * 
 * include this configuration like this:
 *   casperjs test --includes=config.js  test1.js test2.js ..
 * 
 *  Powered by openstream©, Swiss Webshop Solutions 
 *  http://www.openstream.com
 * 
 *  Released under the GNU General Public License   
 */

// base url for test
var test_url = 'http://localhost/';


var test_page = new Object();
test_page.get_links_selector = 'div a';
test_page.get_img_selector = 'div img';
test_page.get_link_selector = 'link';
test_page.get_script_selector = 'script';


var product = new Object();
product.name_find_part =  'für'; // tt'Monitor'; // generell search
product.name_find_match =  '6 Stück Ersatzkohlefilter mit Gehäuse'; // tt: 'test7';// exact search
product.selector_search_form = 'form[name="quick_find"]';
product.selector_search_result = "document.querySelector('tr.productListing-odd td.productListing-data a img').title";
product.selector_search_result_vis = 'td.productListing-data a';
product.selector_info_name = "document.querySelector('.productsName').textContent";


// unique string for email (prevents test fails because customer-email allready exists)
var unique_ts = (new Date().getMonth()+1) + '.' + (new Date().getDay()+1) + '.' + new Date().getHours() + '.' + new Date().getMinutes() + '.' + new Date().getSeconds();
//unique_ts = '160705b';
// customer data for account tests
var customer = new Object();
customer.customers_id = -1;
customer.gender = 'm';
customer.firstname = 'Test Firstname';
customer.lastname = 'Test Lastname';
customer.dob = '';
customer.email_address = 'test-' + unique_ts + '@domain.ch'; // needs to be existing tld
customer.default_address_id = '';
customer.telephone = '0123456789';
customer.fax = '9876543210';
customer.password = 'password';
customer.newsletter = 1;
customer.guest_account = 0;
customer.company = 'Openstream';
customer.street_address = 'Heinrichstrasse 267a';
customer.suburb = '';
customer.postcode = '8005';
customer.city = 'Zürich';
customer.state = '';
customer.country = 'Schweiz';
customer.country_id = '204';
customer.zone_id = '';
customer.message_account_create_success =  'Ihr Konto wurde mit Erfolg eröffnet!';//tt: 'Ihr Konto wurde angelegt!';
customer.message_account_logoff =  'Sie wurden soeben sicher abgemeldet, so dass niemand mehr Ihre Daten einsehen kann.';
customer.message_account_login =  'Ich bin bereits Kunde.';
customer.message_account_logged_in =  'Ihre persönlichen Daten';
customer.selector_my_account = 'table:nth-child(2) tr:nth-child(1) td:nth-child(2) a:nth-child(1)';
customer.selector_create_account = 'div.content tr:nth-child(3) table tr:nth-child(2) tr:nth-child(3) table td:nth-child(2) a';
customer.selector_form_create_new = 'form[name=login] table:nth-child(2) a';
customer.selector_form_login = 'form[name=login]';
customer.selector_form_create = 'form[name=create_account]';
customer.selector_logoff = 'table:nth-child(2) tr:nth-child(1) td:nth-child(2) a:nth-child(2)';


// customize casper
casper.options.verbose  = true;
casper.options.logLevel = 'debug';// 'info';// 'debug'
