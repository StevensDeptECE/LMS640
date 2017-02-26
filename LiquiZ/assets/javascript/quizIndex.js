/*Draws the index page with a list of quizzes available*/ 
/*This is a professor's view, as it allows things like editing quizzes*/
function quizIndex(payload) {
    this.payload = [["publish","take quiz", "course name","due date","close date","show statistics","operation"]];
    for (var i in payload){
        var takequiz = Util.button(payload[i]["quizName"], function() {launch(Account, accountpayload, 'up3');}, "takequizbtn",payload[i]["id"]);
        var row = [payload[i]["publish"],takequiz,payload[i]["course"],payload[i]["dueDate"],payload[i]["closeDate"],"Stats","Edit, Copy, Delete"];
        this.payload.push(row);
    }
    console.log(this.payload);
}

quizIndex.prototype.draw = function(c) {
  console.log("Draw Quiz Index");
  var header = Util.h1("Quizzes");
  clearElements("up2");
  document.getElementById("up2").appendChild(header);
  clearElements("up3");
  var newDiv = Util.div("", "wrapper");
  var newTable = Util.table(this.payload, true, "quizTable", "quiztable1");
  newDiv.appendChild(newTable);
  c.appendChild(newDiv);
}

quizpayload = [
  {
    "id": "qc1111",
    "publish": "yes",
    "quizName": "Quiz1",
    "course": "CPE-593",
    "dueDate": "1/1/2017",
    "closeDate": "2/2/2017"
  },
  {
    "id": "qc2222",
    "publish": "yes",
    "quizName": "Quiz2",
    "course": "CPE-593",
    "dueDate": "2/2/2017",
    "closeDate": "3/3/2017"
  },
  {
    "id": "qc3333",
    "publish": "no",
    "quizName": "Quiz1",
    "course": "CPE-810",
    "dueDate": "3/3/2017",
    "closeDate": "4/4/2017"
  }
]
