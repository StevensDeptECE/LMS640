/* BackButton Constructor*/
function BackButton(payload) {
  this.paylod = payload;
}

//doesn't draw a back button, draws the previous screen based
//on global variable keeping track of visited pages
BackButton.prototype.draw = function(c) {
  //get the previous call if there is a previous call to get
  if (visitedPages.length > 0) {
    visitedPages.pop();
    var prevCall = visitedPages.pop();
    if (prevCall[0] == 'calendar') {
      console.log("Back to calendar");
      prevCall[1];
    }
    else {
      launch(prevCall[0], prevCall[1], 'up3', false);
    }
    visitedPages.push(prevCall);
  }
}
