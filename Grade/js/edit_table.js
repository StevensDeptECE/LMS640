function SetTableCanEdit(table) {
	for (var i = 1; i < table.tbody.rows.length; i++) {
		SetRowCanEdit(table.tBodies[0].rows[i]);
	}
}

function SetRowCanEdit(row) {
	for (var j = 2; j < row.cells.length; j++) {
		var editType = document.getElementById("keywords").tHead.rows[0].cells[j].getAttribute("EditType");
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
		textBox.className = "EditCell_TextBox";

		if (!value) {
			value = element.getAttribute("Value");
		}
		textBox.value = value;

		textBox.onblur = function () {
			CancelEditCell(this.parentNode, this.value);
		}

		ClearChild(element);
		element.appendChild(textBox);
		textBox.focus();
		textBox.select();

		element.setAttribute("EditState", "true");

	}
}

function CancelEditCell(element, value, text) {
	element.setAttribute("Value", value);
	if (text) {
		element.innerHTML = text;
	} else {
		element.innerHTML = value;
	}
	element.setAttribute("EditState", "false");
	
}