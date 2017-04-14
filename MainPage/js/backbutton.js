/* BackButton Constructor*/
function BackButton(payload) {
  this.paylod = payload;
}

//doesn't draw a back button, draws the previous screen based
//on global variable keeping track of visited pages
BackButton.prototype.draw = function(c) {

}
