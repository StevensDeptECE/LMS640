/*global
alert, confirm, console, Debug, opera, prompt, WSH
*/
/*function ReadyToTake() {
    //this.body = document.getElementById("container");
} ;

ReadyToTake.SATARTDATE = "0";
ReadyToTake.DUEDATE = "0";
ReadyToTake.NAME = "0";
ReadyToTake.AVAIABLEDATE = "0";
ReadyToTake.POINTS = "0";
ReadyToTake.QUESTIONS = "0";
ReadyToTake.TIMELIMIT = "0";
ReadyToTake.ALLOWEDATTEMPS = "0";

ReadyToTake.ROWS = "0";
    
ReadyToTake.prototype.showInformation = function () {
    //document.getElementById("start").innerHTML = ReadyToTake.SATARTDATE;
    document.getElementById("due").innerHTML = ReadyToTake.DUEDATE;
    document.getElementById("avaible").innerHTML = ReadyToTake.AVAIABLEDATE;
    document.getElementById("points").innerHTML = ReadyToTake.POINTS;
    document.getElementById("questions").innerHTML = ReadyToTake.QUESTIONS;
    document.getElementById("timelimit").innerHTML = ReadyToTake.TIMELIMIT;
    document.getElementById("allowedattempts").innerHTML = ReadyToTake.ALLOWEDATTEMPS; 
};

ReadyToTake.prototype.getInformation = function () {
    
    // will pull down the information from the server
};

ReadyToTake.protype.buttonAlert = function () {
    if (ReadyToTake.ALLOWEDATTEMPS === 0) {
        document.getElementById("button").attributes = "bidden";
        alert("Once you start you can not exit this page unless you submit your answer!");
    }
};

function attemptHistory() {
    var columns = 4, rows = 4;
    for (var i = 0; i < rows; i++){
       document.getElementById("table").innerHTML = "<tr>"; 
        for(var j = 0; j < columns; j++){
            document.getElementById("table").innerHTML = "<td>sore</td>";
        }
       document.getElementById("table").innerHTML = "</tr>";
    }
}
*/

var attemptHistory = {}
function SubmitOnclick() {
    document.getElementById("questions").innerHTML = "123132131";
    alert("Once you begin you can not close this page unless time up or you submit!");
}

function myfunction() {
    console.log("test");
}

