/* Account Constructor - JUST A HOME SCREEN FOR NOW */
function Account(payload) {
  this.paylod = payload;
}

Account.prototype.draw = function() {
  console.log("Draw Account");
  var header = Util.h1("Home");
  var body = Util.p(this.payload);
  clearElements("up2");
  clearElements("up3");
  document.getElementById("up2").appendChild(header);
  document.getElementById("up3").appendChild(body);
}

accountpayload = "Welcome again to LMS.";
