/*Contains objects for general components of questions such as 
instructions, and equations */
function Instr(s, id) {
	this.id = id;
	this.s = s;
}

Instr.prototype.draw = function(div) {
	div.appendChild(Util.text(this.s));
}

function Eqn(s, id) {
	this.id = id;
	this.s = s;
}

Eqn.prototype.draw = function(div) {
	div.appendChild(Util.text(this.s));
}

function Code(s) {
	this.p = document.createElement("p");
    this.p.className= "Code";
	this.s = s;
}

Code.prototype.draw = function(div) {
    this.p.appendChild(document.createTextNode(this.s));
    div.appendChild(this.p);
}

function CorrectAnswer(s, id) {
	this.id = id;
	this.s = s;
}

CorrectAnswer.prototype.draw = function(div) {
	var x = document.createElement('div');
	x.className = "correctanswer";
	x.appendChild(Util.text("Correct Answer: " + this.s));
	div.appendChild(x);
}

function YourAnswer(s, id) {
	this.id = id;
	this.s = s;
}

YourAnswer.prototype.draw = function(div) {
	var x = document.createElement('div');
	x.className = "youranswer";
	x.appendChild(Util.text("Your Answer: " + this.s));
	div.appendChild(x);
}

/*sidebar object for quizzes containing list of questions
and whether they are complete or not*/
function Sidebar (questions, parentDiv){
	this.parentDiv = parentDiv;
	this.questions = [];
	for (var i in questions){
		this.questions.push(questions[i]["id"]);
	}
}

Sidebar.prototype.draw = function(){
	var pdiv = document.createElement('div');
	pdiv.className = "quiz-nav-right-child";
	var list = document.createElement('ul');
	for (var i = 0; i < this.questions.length; i++){
		var item = document.createElement('li');
		item.id = this.questions[i];
		var a = document.createElement('a');
		a.href = '#'+ this.questions[i];
	//	a.setAttribute('href','#'+ this.questions[i]);
		var num = i + 1;
		a.appendChild(Util.text("Question: " + num));
		item.appendChild(a);
		list.appendChild(item);
	}
	pdiv.appendChild(list)
	this.parentDiv.appendChild(pdiv);
	
}

