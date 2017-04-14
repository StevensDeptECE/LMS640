/* ForwardButton Constructor*/
function Refresh(payload) {
  this.paylod = payload;
}

//doesn't draw a refresh button
//goes to server to get updated info and then redraws the page
ForwardButton.prototype.draw = function(c) {

}
