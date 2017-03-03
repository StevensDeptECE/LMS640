function dragDrop(image,options,locations, id) {
    this.image = image;
	this.id = id;
    this.locations = locations;
	this.options = options;
}

dragDrop.prototype.draw = function(div) {
	function dragStart(ev) {
		ev.dataTransfer.effectAllowed = 'move';
		ev.dataTransfer.setData("Text")
	}
    var image = new Img(this.image);
    image.draw(div);
	var imgDiv = div.getElementsByClassName("imgDiv");
	/*create draggable items*/
	var optionsBox = document.createElement('div');
	optionsBox.setAttribute("class","container");
	for(var i = 0; i < this.options.length; i++) {
        /*create draggable options*/
        var termBox = document.createElement('div');
        termBox.className += "dragDropOption";
        termBox.setAttribute("draggable", "true");
        termBox.setAttribute("id","term" + i);
        termBox.setAttribute("ondragstart","drag(event)");
        termBox.appendChild(document.createTextNode(this.options[i]));
        optionsBox.appendChild(termBox);
        /*create location divs*/
        var coord = "left:" + this.locations[i]["left"] + "px; top:"+ this.locations[i]["top"] + "px;";
        var answerDiv = document.createElement('div');
        answerDiv.className += "dragdropLocation";
        answerDiv.setAttribute("ondrop","drop(event)");
        answerDiv.setAttribute("ondragover","allowDrop(event)");
        answerDiv.setAttribute("style","position:absolute; "+ coord);
        imgDiv[0].appendChild(answerDiv);
			
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