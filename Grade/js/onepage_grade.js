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
  var newTable = createGradeTable(this.payload, "grades")
  newDiv.appendChild(newTable);
  c.appendChild(newDiv);
  $("#grades").tablesorter();
  clearClass("active");
  //set active to some other class
  document.getElementById("quizClass").className = "active";
}

function createGradeTable(payload, id) {
  var table = document.createElement("table");
  table.setAttribute("id",id);
  var header = document.createElement("thead");
  var body = document.createElement("tbody");
  var row = document.createElement("tr");

  for (var i = 0; i < 2; i++) {
    var data = document.createElement("th");
    var span = document.createElement("span");
    row.appendChild(data);
    data.appendChild(span);
    span.setAttribute("onclick", "sortTable("+i+")");
    span.innerHTML=payload.head[i];
}
  for (var i = 2; i < payload.head.length; i++) {
  var data = document.createElement("th");
  var span = document.createElement("span");
  row.appendChild(data);
  data.appendChild(span)
  data.setAttribute("edittype", "TextBox");
  span.setAttribute("onclick", "sortTable("+i+")");
    span.innerHTML=payload.head[i];
    
    var div1 = document.createElement("div");
    data.append(div1);
    div1.setAttribute("class", "drop-down");
    var div2 = document.createElement("div");
    div1.append(div2);
    div2.setAttribute("class", "arrow-down dropbtn");
    div2.setAttribute("onclick", "clickDropDown("+(i-1)+")");
    var div3 = document.createElement("div");
    div1.append(div3);
    div3.setAttribute("id", "myDropdown"+(i-1));
    div3.setAttribute("class", "dropdown-content");
    var a = document.createElement("a");
    div3.append(a);
    a.innerHTML = "Graph";
    a = document.createElement("a");
    div3.append(a);
    a.innerHTML = "Setting";
    a = document.createElement("a");
    div3.append(a);
    a.innerHTML = "Speed grade";
}

for (var i = 1; i < payload.names.length; ++i) {
    var data_row = document.createElement("tr");
    data_row.setAttribute("class","lalign");
    body.appendChild(data_row);
    var name = document.createElement("td");
    var id = document.createElement("td");
    data_row.appendChild(name);
    data_row.appendChild(id);
    name.innerHTML=payload.names[i];
    id.innerHTML=payload.ID[i];

    for (var j = 0; j < payload.head.length - 2; ++j) {
      var score = document.createElement("td");
      data_row.appendChild(score);
      score.innerHTML = payload.grades[i][j];
    }
}

  table.appendChild(header);
  table.appendChild(body);
  header.appendChild(row);
  return table;
}
