/**
 * utils for testing
 * 
 *  Powered by openstream©, Swiss Webshop Solutions
 *  http://www.openstream.com
 * 
 *  Released under the GNU General Public License   
 */   

/**
 * get all links for selector
 * @param selector css3 selector 
 * @param has_href selected has href or src attribute
 * @param exclude_arr optional outmitted matches e.g. ['http://www.some.com/',..]
 * @returns {Array} urls
 */
function getLinks(selector, has_href, exclude_arr) {
  
  if( typeof exclude_arr === 'undefined' ) exclude_arr = [];
  var link_arr = new Array();
  var links = document.querySelectorAll( selector );
  for(var i=0;i< links.length; i++){ 
    var s = has_href ? links[i].href : links[i].src; 
      if( s.length > 2 && s.search('http') !== -1)  {
        var ok = true;
        for(var j=0; j < exclude_arr.length; j++) {
          if( s.search(exclude_arr[j]) !== -1 ) {
            ok = false;
            break;
          }
        }
        if(ok) link_arr[link_arr.length] = s;
      }
  }
  // remove double
  var res = [];
  for(var i = 0, l = link_arr.length; i < l; ++i){
    var found = false;
    for(var j = 0, m = res.length; j < m; ++j){
      if( link_arr[i] === res[j] ) {
        found = true;
        break;
      }
    }
    if(!found) {
      res.push(link_arr[i]);
    }
  }
  return res;
}
