/* Grade payload construcotr. The payload is a 2D array. */
function Grade(payload) {
  this.payload = payload;
}

Grade.prototype.draw = function(c) {
  console.log("draw");

  var up2 = document.getElementById("up2")

  clearElements("up2");
  //var newHeader = Util.h1("Grades", "", "");
  //up2.appendChild(newHeader);
  var btn_grade = Util.button("Grade", "", "aggreate", "");
  up2.appendChild(btn_grade);

  var btn_graph = Util.button("Graph", "", "aggreate", "");
  up2.appendChild(btn_graph);

  clearElements("up3");
  var newDiv = Util.div("", "wrapper");
  var newTable = Util.table(this.payload, true, "gradeTable", "keywords");

  var newTable2 = Util.table([], true, "gradeTable", "keywords");
  //try creating table one element at a time
  console.log("table length: " + this.payload.length);
  var newThead = Util.thead(this.payload[i]);
  newTable2.appendChild(newThead);
  var newTbody = Util.tbody();
  for (var i = 1; i < this.payload.length; i++) {
    console.log("table row " + i + " length: " + this.payload[i].length);
    var newTr = Util.tr([]); //create new table row
    for (var j = 0; j < this.payload[i].length; j++) {
      if (i == 0) {
        var newTd = Util.thead(this.payload[i][j]); //create new table element
      }
      else {
        var newTd = Util.td(this.payload[i][j]); //create new table element
      }
      newTr.appendChild(newTd);
    }
    newTbody.appendChild(newTr);
  }
  newTable2.appendChild(newTbody);

  //draw table

  //graph

  newDiv.appendChild(newTable);
  newDiv.appendChild(newTable2);
  c.appendChild(newDiv);
  clearClass("active");
  document.getElementById("course").className = "active";
  //set active to some other class
}



var gradepayload2 = [
["Name", "ID", "Assignment", "Test", "Quiz"],
["John", 104083, 66, 76, 98],
["Kelly", 123456, 87, 88, 98],
];
