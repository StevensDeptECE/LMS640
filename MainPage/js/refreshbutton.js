/* ForwardButton Constructor*/
function Refresh(payload) {
  this.paylod = payload;
}

//doesn't draw a refresh button
//goes to server to get updated info and then redraws the page
Refresh.prototype.draw = function(c) {
  console.log("Refresh");
  if (visitedPages.length > 0) {
    var prevCall = visitedPages.pop();
    if (prevCall[0] == 'calendar') {
      prevCall[1];
    }
    else {
      launch(prevCall[0], prevCall[1], 'up3', true);
    }
    visitedPages.push(prevCall);
  }
}
