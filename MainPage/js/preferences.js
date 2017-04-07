/*
 * This object will serve as a preferences editor for users
 */

function Preferences(payload) {
  var json = getJSONFromServer(payload);
  console.log(json);
  var css = json["css"];
  console.log("CSS prefs: " + json["css"]);
}

Preferences.prototype.draw = function(content) {
  var up2 = document.getElementById("up2")
  clearElements("up2");
  var header = Util.h1("Preferences");
  up2.appendChild(header);

  clearElements('up3');
  var css_box1 = Util.button("CSS 1", function(){setCSS('style', 0)});
  var css_box2 = Util.button("CSS 2", function(){setCSS('style2', 0)});
  var css_box3 = Util.button("CSS 3", function(){setCSS('style3', 0)});
  content.appendChild(css_box1);
  content.appendChild(css_box2);
  content.appendChild(css_box3);
}

/*
Preferences.prototype.choose = function(pref) {

}
*/
