function PrefEditor(payload) {
  this.payload = payload;
}

PrefEditor.prototype.draw = function(content) {
  var up2 = document.getElementById("up2")
  clearElements("up2");
  var header = Util.h1("Preferences");
  up2.appendChild(header);

  clearElements('up3');
  var p = Util.p("Current CSS: " + prefs["css"]);
  content.appendChild(p);
  var css_box1 = Util.button("CSS 1", function(){setCSS('style', 0, true)});
  var css_box2 = Util.button("CSS 2", function(){setCSS('style2', 0, true)});
  var css_box3 = Util.button("CSS 3", function(){setCSS('style3', 0, true)});
  content.appendChild(css_box1);
  content.appendChild(css_box2);
  content.appendChild(css_box3);
}

/*
Preferences.prototype.choose = function(pref) {

}
*/
