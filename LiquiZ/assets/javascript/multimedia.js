/*Contains objects for multimedia such as audio, video, and images */

//pure audio player, no controls
function Aud(file, id) {
	this.audio = new Audio(file);
}

Aud.prototype.draw = function(div) { //do we want to display the audio?
	this.audio.play();
}

function Img(file, id) {
	this.id = id;
	this.img = document.createElement("img");
	this.img.src = '../Liquiz/assets/images/' + file;
	
}

Img.prototype.draw = function(div) {
	this.img.setAttribute('draggable','false');
	var imgDiv = document.createElement('div');
	imgDiv.className += 'imgDiv';
	imgDiv.appendChild(this.img);
	div.appendChild(imgDiv);
}