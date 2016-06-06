/**
 * utils for testing
 * 
 *  Powered by openstream©, Swiss Webshop Solutions
 *  http://www.openstream.com
 * 
 *  Released under the GNU General Public License   
 */   

/**
 * get all links in selector not contain "advanced_search_result.php" as uniquqe array
 * @param {type} css3-selector like ".productListing td a"
 * @returns {Array|getLinks.link_arr}
 */
function getLinks( selector) {
  
  if ( typeof selector == 'undefined') selector = '.productListing td a';  
  var link_arr = new Array();
  var links = document.querySelectorAll(selector);
  for(var i=0;i< links.length; i++){ 
      if( links[i].href.search(/advanced_search_result.php/) == -1 ) {
          link_arr[link_arr.length] = links[i].href; 
      }
  }
  // remove double
  var res = [];
  var last = '';
  for(var i = 0, l = link_arr.length; i < l; ++i){
    if(last === link_arr[i]) continue; // mostly double come in seriell
    var found = false;
    for(var j = 0, m = res.length; j < m; ++j){
      if( link_arr[i] === res[j] ) {
        found = true;
        break;
      }
    }
    if(!found) {
      res.push(link_arr[i]);
      last = link_arr[i];
    }
  }
  return res;
}

/**
 * get products id by seo url
 * @param {type} uri
 * @returns pID on success, else -1
 */
function getProductsIdByUri(uri) {
  var page_name = uri.substr(uri.lastIndexOf('/')+1);
  var pID = page_name.match(/-p-[0-9].+/);
  if( pID !== -1 ) {
      pID = pID[0];
      pID = pID.substr(3, pID.length-8);
  }
  return pID;
}
