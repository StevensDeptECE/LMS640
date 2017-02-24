/* Account Constructor - JUST A HOME SCREEN FOR NOW */
function Account(payload) {
  this.paylod = payload;
}

Account.prototype.draw = function(c) {
  console.log("Draw Account");
  var header = Util.h1("Home");
  var body = Util.p("Welcome again to LMS.");
  clearElements("up2");
  clearElements("up3");
  document.getElementById("up2").appendChild(header);
  document.getElementById("up3").appendChild(body);
  clearClass("active");
  document.getElementById("account").className = "active"
}

accountpayload = "Welcome again to LMS.";
