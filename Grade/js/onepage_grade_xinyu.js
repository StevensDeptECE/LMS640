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
  var btn_graph = Util.button("speedgrader", "onclick", "aggreate", "btn_graph");
  up2.appendChild(btn_graph);
  var myBtn = document.getElementById("btn_graph");
  btn_graph.addEventListener('click', function(event) {
    window.location.href='grade.html';
  });
  


  clearElements("up3");
  var newDiv = Util.div("", "wrapper");
  var newTable = Util.table(this.payload, true, "gradeTable", "keywords");
  newDiv.appendChild(newTable);
  c.appendChild(newDiv);
  clearClass("active");
  //set active to some other class
}



var gradepayload2 = [
["Name", "ID", "Assignment", "Test", "Quiz"],
["John", 104083, 66, 76, 98],
["Kelly", 123456, 87, 88, 98],
];
