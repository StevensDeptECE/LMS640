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

  clearElements("up3");
  var newDiv = Util.div("", "wrapper");
  var newTable = createGradeTable(this.payload, "keywords")
  newDiv.appendChild(newTable);
  c.appendChild(newDiv);
  $("#keywords").tablesorter();
  clearClass("active");
  //set active to some other class
  document.getElementById("quizClass").className = "active";
}



var gradepayload2 = [
["Name", "ID", "Assignment", "Test", "Quiz"],
["John", 104083, 66, 76, 98],
["Kelly", 123456, 87, 88, 98],
];

function createGradeTable(payload, id) {
  var table = document.createElement("table");
  table.setAttribute("id",id);
  var header = document.createElement("thead");
  var body = document.createElement("tbody");
  var row = document.createElement("tr");

  for (var i in payload[0]) {
    var data = document.createElement("th");
    var span = document.createElement("span");
    row.appendChild(data);
    data.appendChild(span)
    span.innerHTML=payload[0][i];
}

for (var i = 1; i < payload.length; ++i) {
  var data_row = document.createElement("tr");
  data_row.setAttribute("class","lalign");
    body.appendChild(data_row);
    var name = document.createElement("td");
    var id = document.createElement("td");
    data_row.appendChild(name);
    data_row.appendChild(id);
    name.innerHTML=payload[i][0];
    id.innerHTML=payload[i][1];

    for (var j = 2; j < payload[i].length; ++j) {
      var score = document.createElement("td");
      data_row.appendChild(score);
      score.innerHTML = payload[i][j];
    }
}

  table.appendChild(header);
  table.appendChild(body);
  header.appendChild(row);
  return table;
}
