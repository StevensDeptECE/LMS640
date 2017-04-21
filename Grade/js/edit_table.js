function SetTableCanEdit(table) {
	for (var i = 1; i < table.rows.length; i++) {
		SetRowCanEdit(table.rows[i]);
	}
}

function SetRowCanEdit(row) {
	for (var j = 2; j < row.cells.length; j++) {
		var editType = document.getElementById("grades").rows[0].cells[j].getAttribute("EditType");
		if (editType) {
			row.cells[j].onclick = function() {
				EditCell(this);
			}
		}
	}
}

function EditCell(element) {
	CreateTextBox(element, element.innerHTML);
}

function CreateTextBox(element, value) {
	var editState = element.getAttribute("EditState");
	if (editState != "true") {
		var textBox = document.createElement("INPUT");
		textBox.type = "text";

		textBox.value = value;

		textBox.onblur = function () {
			CancelEditCell(this.parentNode, this.value, value);
		}

		ClearChild(element);
		element.appendChild(textBox);
		textBox.focus();
		textBox.select();

		element.setAttribute("EditState", "true");

	}
}

function ClearChild(element) {
	element.innerHTML="";
}

function CancelEditCell(element, value, text) {
	if (value) {
	    var xhttp = new XMLHttpRequest();
	    xhttp.onreadystatechange = function() {
	      if (this.readyState == 4 && this.status == 200) {
	    	  var limit = JSON.parse(this.responseText);
	          var min=limit.min;
	          var max=limit.max;
	          if(parseFloat(value)<min||parseFloat(value)>max){
	              alert('Input Error');
	              element.innerHTML = text;
	          } else {
	        	  element.innerHTML = value;
	          }
	      }
	    };
	    var i = element.parentNode.rowIndex;
	    var j = element.cellIndex;
	    var td = document.getElementById("grades").rows[0].cells[j];
	    var course = td.getElementsByTagName("SPAN");
	    var id = document.getElementById("grades").rows[i].cells[1];
	    xhttp.open("GET", "jsp.jsp?value="+value+"&name="+course[0].innerHTML+"&id="+id.innerHTML+"", true);
	    xhttp.send();
	} else {
		element.innerHTML = text;
	}
	element.setAttribute("EditState", "false");
}