function dragDrop(options, id) {
	this.id = id;
	this.options = options;
}

dragDrop.prototype.draw = function(div) {
	function dragStart(ev) {
		ev.dataTransfer.effectAllowed = 'move';
		ev.dataTransfer.setData("Text")
	}
	//create draggable items
	var optionsBox = document.createElement('div');
	var imgDiv = div.getElementsByClassName("imgDiv");
	optionsBox.setAttribute("class","container");
	for(var i = 0; i < this.options.length; i++) {
		var obj = this.options[i];
    	for (var j in obj) {
			//create draggable options
			var termBox = document.createElement('div');
			termBox.className += "dragDropOption";
			termBox.setAttribute("draggable", "true");
			termBox.setAttribute("id","term" + i);
			termBox.setAttribute("ondragstart","drag(event)");
			termBox.appendChild(document.createTextNode(j));
			optionsBox.appendChild(termBox);
			//create location divs
			var coord = "left:" + obj[j]["left"] + "px; top:"+obj[j]["top"] + "px;";
			var answerDiv = document.createElement('div');
			answerDiv.className += "dragdropLocation";
			answerDiv.setAttribute("ondrop","drop(event)");
			answerDiv.setAttribute("ondragover","allowDrop(event)");
			/*not including answer id bc then user could match numbers to figure out answers*/ 
			//answerDiv.setAttribute("id","location" + i);
			answerDiv.setAttribute("style","position:absolute; "+ coord);
			imgDiv[0].appendChild(answerDiv);
			
    	}
	}
	div.appendChild(optionsBox);
}


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}