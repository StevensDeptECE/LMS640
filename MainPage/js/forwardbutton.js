/* ForwardButton Constructor*/
function ForwardButton(payload) {
  this.paylod = payload;
}

//doesn't draw a fprward button, draws the most recent screen was
//was seen before a back button was pressed, based
//on global variable keeping track of visited pages
ForwardButton.prototype.draw = function(c) {
  var prevCall = visitedPages.pop();
  launch(prevCall[0], prevCall[1], 'up3');
  visitedPages.push(prevCall);
}
