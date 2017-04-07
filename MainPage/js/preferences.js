/*
 * This object will serve as a preferences editor for users
 */

function Preferences(payload) {
  var css = payload["css"];
  console.log("CSS prefs: " + payload["css"]);
  setCSS(payload["css"], 0, false);
  prefs = payload;
}

Preferences.prototype.draw = function(content)
{

}
