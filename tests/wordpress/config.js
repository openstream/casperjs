/**
 * configuration for tests
 * for WordPress 4.5.3, WooCommerce 2.6.4
 *  
 * include this configuration like this:
 *   casperjs test --includes=config.js  test1.js
 * 
 *  Powered by openstream©, Swiss Webshop Solutions 
 *  http://www.openstream.com
 * 
 *  Released under the GNU General Public License   
 */

// test url
var frontend_url = 'http://localhost/';
var backend_url = frontend_url + 'wp-login.php';

var backend = {
      user_login: 'username',   // admin user login name
      password: 'password', // login password

      login_form : 'form[name="loginform"]', // selector for loginform
      login_submit : 'input#wp-submit', // form submit button
      menu_link : 'li#wp-admin-bar-menu-toggle a', // main menu
      menu_woocommerce_top : 'li#toplevel_page_woocommerce a', // woocommerce top menu
      menu_woocommerce_order : 'li.toplevel_page_woocommerce ul li a', // woocommerce order menu      
      woocommerce_order : 'table.wp-list-table tr:nth-child(1) td:nth-child(3)', // first order in list, if not match "tr:nth-child(1)" will be increased
      order_delete_btn :  'table.wp-list-table tr:nth-child(1) td:nth-child(3) a.submitdelete',  // order delete button, if not match tr:nth-child(1) will be increased
      order_deleted : 'div#message p a', // trash undo button
      menu_users_top : 'li#menu-users a', // users menu
      menu_users_users : 'li#menu-users li:nth-child(2) a', // users menu users
      users_search_from : 'form[method="get"]', // users form
      users_search_submit : 'p.search-box input[type="submit"]', // form submit button
      search_count : 'span.displaying-num', // number of search results
      users_delete : 'table.wp-list-table tr:nth-child(1) span.delete a', // delete button
      users_delete_confirm : 'form[name="updateusers"] input.button', 
      update_message : 'div.wrap div.updated p', // update message
      logout_link : 'li#wp-admin-bar-logout a' // account logout link
    };

// build a unique string
var unique_ts = (new Date().getMonth()+1) + '.' + (new Date().getDate()+1) + '.' + new Date().getHours() + '.' + new Date().getMinutes() + '.' + new Date().getSeconds();

var customer = {
    firstname : 'Test Firstname',
    lastname : 'Test Lastname',
    email_address : 'test-' + unique_ts + '@domain.ch',
    telephone : '0123456789',
    fax : '9876543210',
    password : 'my-password-l,&%hdz7w',
    company : 'Openstream',
    street_address : 'Heinrichstrasse 267a',
    street_address2 : 'Citizen Space',
    postcode : '8005',
    city : 'Zürich',
    state : '', // Canton
    billing_country : 'CH',
    order_comments : 'Achtung: Nur eine Testbestellung!',
    order_number : 0
}

var frontend = {
  menu : '#site-navigation button',
  shop_menu : 'a[href$="/shop/"]',
  cart_product_detail : 'a.woocommerce-LoopProduct-link',
  add_to_cart : 'button.single_add_to_cart_button',
  shop_kassa : 'nav#site-navigation li:nth-child(4) a',
  form_account_create : 'form.checkout',
  form_palce_order : 'input#place_order',
  account_create :  'input#createaccount', // checkbox "create accout"
  order_received : 'p.woocommerce-thankyou-order-received',
  account : 'nav#site-navigation div.menu li:nth-child(4) a',
  account_password : 'input#account_password',
  account_logoff : 'nav.woocommerce-MyAccount-navigation  li:nth-child(6) a',
  account_logged_off : 'input#username'
}


// casper
casper.options.verbose  = false;
casper.options.logLevel = 'debug';// 'info';
casper.options.waitTimeout = 180000;
