/**
 * Test to create account and order and delete
 * for WordPress 4.5.3, WooCommerce 2.6.4
 * 
 * call
 *   casperjs test --includes=config.js customer-create.js
 * 
 *  Powered by openstream
 *  https://www.openstream.ch
 * 
 *  Released under the GNU General Public License   
 */


casper.test.begin('Testing account and order for create and delete', 32, function suite(test) {

  // get startpage, open menu
  casper.start(frontend_url, function() { 
    test.assertVisible(frontend.menu, 'page menu link visable');
    this.thenClick(frontend.menu);
  });

  casper.waitForSelector(frontend.shop_menu, function() {
    if(casper.options.verbose === true) this.echo('[selector arrived] ' + frontend.shop_menu);
  });


  // click shop
  casper.then(function() { 
    test.assertVisible(frontend.shop_menu, 'shop link visable');  
    this.thenClick(frontend.shop_menu);
  });

  casper.waitForSelector(frontend.cart_product_detail, function() {
    if(casper.options.verbose === true) this.echo('[selector arrived] ' + frontend.cart_product_detail);
  });


  // click product detail
  casper.then(function() {
    this.capture('shop_loaded.png');
    test.assertVisible(frontend.cart_product_detail, 'product detail link visable');
    this.thenClick(frontend.cart_product_detail);  
  });

  casper.waitForSelector(frontend.add_to_cart, function() {
    if(casper.options.verbose === true) this.echo('[selector arrived] ' + frontend.add_to_cart);
  });


  // add to cart
  casper.then(function() {
    this.capture('product_detail.png');
    test.assertVisible(frontend.add_to_cart, 'add product link visable');
    this.thenClick(frontend.add_to_cart);  
  });

  casper.waitForSelector(frontend.shop_kassa, function() {
    if(casper.options.verbose === true) this.echo('[selector arrived] ' + frontend.shop_kassa);
  });


  // get kassa
  casper.then(function() {
    this.capture('product_added.png');
    test.assertVisible(frontend.shop_kassa, 'cart link visable');
    this.thenClick(frontend.shop_kassa);
  });

  casper.waitForSelector(frontend.form_account_create, function() {
    if(casper.options.verbose === true) this.echo('[selector arrived] ' + frontend.form_account_create);
  });


  // activate account create
  casper.then(function() {
    this.capture('customer-create-form.png');
    test.assertVisible(frontend.form_account_create, 'form create visable');
    this.thenClick(frontend.account_create);
  });

  casper.waitForSelector(frontend.account_create, function() {
    if(casper.options.verbose === true) this.echo('[selector arrived] ' + frontend.account_create);
  });


  // fill form, submit
  casper.then(function() {
    test.assertVisible(frontend.account_password, 'account password field activated');
    this.fill(frontend.form_account_create, {
      'billing_first_name': customer.firstname,
      'billing_last_name': customer.lastname,
      'billing_email': customer.email_address,    
      'billing_company': customer.company,
      'billing_address_1': customer.street_address,
      'billing_address_2': customer.street_address2,
      'billing_postcode': customer.postcode,
      'billing_city': customer.city,
      'billing_phone': customer.telephone,
      'billing_state': customer.state,
      'account_password': customer.password,
      'billing_country': customer.billing_country,
      'order_comments': customer.order_comments
    }, false);
    this.capture('customer-create-account-filled.png');
    test.assertVisible(frontend.form_palce_order, 'place order link visable');  
    this.thenClick(frontend.form_palce_order);
  });

  casper.waitForSelector(frontend.order_received, function() {
    if(casper.options.verbose === true) this.echo('[selector arrived] ' + frontend.order_received);
  });


  // order recieved, menu
  casper.then(function() { 
    this.capture('customer-order-recieved.png');
    test.assertVisible(frontend.order_received, 'order finished element visable'); 
    this.thenClick(frontend.menu);
  });

  casper.waitForSelector(frontend.shop_menu, function() {
    if(casper.options.verbose === true) this.echo('[selector arrived] ' + frontend.shop_menu);
  });


  // get account
  casper.then(function() { 
    test.assertVisible(frontend.account, 'account link visable');
    this.thenClick(frontend.account);
  });

  casper.waitForSelector(frontend.account_logoff, function() {
    if(casper.options.verbose === true) this.echo('[selector arrived] ' + frontend.account_logoff);
  });


  // logoff
  casper.then(function() {
    test.assertVisible(frontend.account_logoff, 'logoff link visable');
    this.thenClick(frontend.account_logoff);  
  });

  casper.waitForSelector(frontend.account_logged_off, function() {
    if(casper.options.verbose === true) this.echo('[selector arrived] ' + frontend.account_logged_off);
  });


  // logged off
  casper.then(function() {
    test.assertVisible(frontend.account_logged_off, 'login password field visable');
    this.echo('account and order created', 'INFO');
  });


  //////////////////// admin ////////////////////////


  // login admin
  casper.thenOpen(backend_url, function() {
    //
  });
//casper.start(backend_url, function() {
//  //
//});

  casper.waitForSelector(backend.login_form, function() {
    if(casper.options.verbose === true) this.echo('[selector arrived] ' + backend.login_form);
  });


  // login
  casper.then(function() {
    test.assertVisible(backend.login_form, 'login form visable');
    this.fill(backend.login_form, {
      'log': backend.user_login,
      'pwd': backend.password
    }, false);
    test.assertVisible(backend.login_submit, 'login submit visable');  
    this.thenClick(backend.login_submit);
  });

  casper.waitForSelector(backend.menu_link, function() {
    if(casper.options.verbose === true) this.echo('[selector arrived] ' + backend.menu_link);
  });


  // toggle menu
  casper.then(function() {
    this.capture('admin-logged-in.png');
    test.assertVisible(backend.menu_link, 'toggle menu visable');
    this.thenClick(backend.menu_link);
  });

  casper.waitForSelector(backend.menu_woocommerce_top, function() {
    if(casper.options.verbose === true) this.echo('[selector arrived] ' + backend.menu_woocommerce_top);
  });


  // open woocommerce menu
  casper.then(function() {
    test.assertVisible(backend.menu_woocommerce_top, 'woocommerce menu visable');
    this.thenClick(backend.menu_woocommerce_top);
  });

  casper.waitForSelector(backend.menu_woocommerce_order, function() {
    if(casper.options.verbose === true) this.echo('[selector arrived] ' + backend.menu_woocommerce_order);
  });


  // open woocommerce orders
  casper.then(function() {
    test.assertVisible(backend.menu_woocommerce_order, 'order menu visable');
    this.thenClick(backend.menu_woocommerce_order);
  });

  casper.waitForSelector(backend.woocommerce_order, function() {
    if(casper.options.verbose === true) this.echo('[selector arrived] ' + backend.woocommerce_order);
  });


  // find and delete order
  casper.then(function() {
    this.capture('admin-orders.png');
    test.assertVisible(backend.woocommerce_order, 'first order visable');
    // search for order in list
    var found = false;
    var row_idx = 0;
    while( !found ) {
      var selector = backend.woocommerce_order.replace('tr:nth-child(1)', 'tr:nth-child(' + ++row_idx +')');
      var order_info = this.getHTML(selector);
      if(order_info === null ) break;
      found = (0 < order_info.search(customer.firstname) && 0 < order_info.search(customer.lastname) && 0 < order_info.search(customer.email_address));
    }
    if(casper.options.verbose === true) this.echo('order found: ' + (typeof order_info != null ? order_info : 'null'));
    test.assertEquals(found, true, 'order found (' +customer.firstname + ' ' + customer.lastname + ', ' + customer.email_address +')');
    selector = backend.order_delete_btn.replace('tr:nth-child(1)', 'tr:nth-child(' +  row_idx +')');
    test.assertVisible(selector, 'delete visable');
    this.thenClick(selector);
  });

  casper.waitForSelector(backend.order_deleted, function() {
    if(casper.options.verbose === true) this.echo('[selector arrived] ' + backend.order_deleted);
  });


  // order deleted, toggle menu
  casper.then(function() {
    this.capture('admin-order-deleted.png');
    test.assertVisible(backend.order_deleted, 'order deleted visable');
    this.echo('order deleted', 'INFO');
    test.assertVisible(backend.menu_link, 'toggle menu visable');
    this.thenClick(backend.menu_link);
  });

  casper.waitForSelector(backend.menu_users_top, function() {
    if(casper.options.verbose === true) this.echo('[selector arrived] ' + backend.menu_users_top);
  });


  // menu users users
  casper.then(function() {
    test.assertVisible(backend.menu_users_top, 'menu users visable');
    this.thenClick(backend.menu_users_top);
  });

  casper.waitForSelector(backend.menu_users_users, function() {
    if(casper.options.verbose === true) this.echo('[selector arrived] ' + backend.menu_users_users);
  });


  // users
  casper.then(function() {
    test.assertVisible(backend.menu_users_users, 'menu users users visable');
    this.thenClick(backend.menu_users_users);
  });

  casper.waitForSelector(backend.users_search_from, function() {
    if(casper.options.verbose === true) this.echo('[selector arrived] ' + backend.users_search_from);
  });


  // search user
  casper.then(function() {
    this.capture('admin-users.png');
    test.assertVisible(backend.users_search_from, 'users search from visable');
    this.fill(backend.users_search_from, {
      's': customer.email_address
    }, false);
    test.assertVisible(backend.users_search_submit, 'search submit visable');  
    this.thenClick(backend.users_search_submit);
  });

  casper.waitForSelector(backend.search_count, function() {
    if(casper.options.verbose === true) this.echo('[selector arrived] ' + backend.search_count);
  });


  // users
  casper.then(function() {
    this.capture('admin-users-searched.png');
    test.assertVisible(backend.search_count, 'search result count visable');
    var result_cnt = this.getHTML(backend.search_count);
    test.assertEquals(result_cnt, '1 item', '1 item found for (' + customer.email_address + ')');
    test.assertVisible(backend.users_delete, 'delete link visable');  
    this.thenClick(backend.users_delete);
  });

  casper.waitForSelector(backend.users_delete_confirm, function() {
    if(casper.options.verbose === true) this.echo('[selector arrived] ' + backend.users_delete_confirm);
  });


  // account delete confirm
  casper.then(function() {
    test.assertVisible(backend.users_delete_confirm, 'confirm delete visable');  
    this.thenClick(backend.users_delete_confirm);
  });

  casper.waitForSelector(backend.update_message, function() {
    if(casper.options.verbose === true) this.echo('[selector arrived] ' + backend.update_message);
  });


  // account deleted
  casper.then(function() {
    this.capture('admin-user-deleted.png');
    test.assertVisible(backend.update_message, 'update message visable');
    this.echo('account deleted', 'INFO');
    this.thenClick(backend.logout_link);
  });

  casper.waitForSelector(backend.login_form, function() {
    if(casper.options.verbose === true) this.echo('[selector arrived] ' + backend.login_form);
  });


  // logged off
  casper.then(function() {
    test.assertVisible(backend.login_form, 'login form visable');
  });


  casper.run(function() {
      test.done();
  });
});


  /*

  customer
  -logoff

  admin
  -call login
  -send login
  -get order page edit.php?post_type=shop_order
  - fill search 
  - get text "1 item", delete order
  -get users
  - search name
  - get text "1 item", delete user
  -call logoff

  */

