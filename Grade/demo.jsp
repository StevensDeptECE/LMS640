<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<link href="css/style.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="js/jquey.js"></script> 
<script type="text/javascript" src="js/jquery.tablesorter.js"></script>

<style>
#keywords {
  margin: 0 auto;
  font-size: 1.2em;
  margin-bottom: 15px;
}


#keywords thead {
  cursor: pointer;
  background: #c9dff0;
}
#keywords thead tr th { 
  font-weight: bold;
  padding: 12px 30px;
  padding-left: 42px;
}
#keywords thead tr th span { 
  padding-right: 20px;
  background-repeat: no-repeat;
  background-position: 100% 100%;
}

#keywords thead tr th.headerSortUp, #keywords thead tr th.headerSortDown {
  background: #acc8dd;
}

#keywords thead tr th.headerSortUp span {
  background-image: url('up-arrow.png');
}
#keywords thead tr th.headerSortDown span {
  background-image: url('down-arrow.png');
}


#keywords tbody tr { 
  color: #555;
}
#keywords tbody tr td {
  text-align: center;
  padding: 15px 10px;
}
#keywords tbody tr td.lalign {
  text-align: left;
}
</style>

</head>
<body>

<h1>JavaScript print page</h1>
<div id="demo"></div>
<button onclick="tableCreate()">grade</button>
<button id="click">click me</button>
<script>
function tableCreate(){
var grade = [
{identity:["name","id"],assignment:["homework","test"]},
{name:"john",id:12345,grade:[99,78]},
{name:"kelly",id:321412,grade:[97,98]}
];

var table = document.createElement("table");
table.setAttribute("id","keywords");
var header = document.createElement("thead");
var body = document.createElement("tbody");
var row = document.createElement("tr");

for (var i in grade[0].identity) {
var data = document.createElement("th");
row.appendChild(data);
data.innerHTML=grade[0].identity[i];
}

for (var i in grade[0].assignment) {
	var data = document.createElement("th");
	row.appendChild(data);
	data.innerHTML=grade[0].assignment[i];
	}

for (var i = 1; i < grade.length; ++i) {
	var data_row = document.createElement("tr");
    body.appendChild(data_row);
    var name = document.createElement("td");
    var id = document.createElement("td");
    data_row.appendChild(name);
    data_row.appendChild(id);
    name.innerHTML=grade[i].name;
    id.innerHTML=grade[i].id;
    for (var j = 0; j < grade[i].grade.length; ++j) {
    	var score = document.createElement("td");
    	data_row.appendChild(score);
    	score.innerHTML = grade[i].grade[j];
    }
}

table.appendChild(header);
table.appendChild(body);
header.appendChild(row);
document.getElementById("demo").appendChild(table);
}

$("#click").click(function(){
	$('#keywords').tablesorter();
})
</script>

</body>
</html>
