Util = {
  subClass: function (sup, sub) {
    sub.prototype = Object.create(sup.prototype);
    sub.prototype.constructor = sub;
  }
};


// Display element can draw itself into a div box,
// has optional class
function Display(id, clas) {
	this.div;
	this.id = id;
	this.class = clas; // could be undefined?
}

function app(div, text) {
	div.appendChild(document.createTextNode(text));
}

function app2(div, text) {
	div.appendChild(document.createElement(text));
}

// make a div under the parent. This is a utility function for display
// objects but not every display object necessarily creates a div
Display.prototype.md = function(parent) {
	this.div = document.createElement('div');
	if (this.class)
		this.div.class = this.class;
	parent.appendChild(this.div);
}


// this method should be overridden by all children
Display.prototype.disp = function(div) {
	app(div, this.constructor.name + ':');
}


function Prefs() {
	
}

Prefs.prototype.getPolicy = function(json) {
	var p = this.policies[json.policy ? json.policy : "default"];
}

function Response() {
	

}

Util.subClass(Display, Response);

function Prefs() {}

Prefs.prototype.getPolicy = function(id) {

}

Prefs.prototype.getRegex = function(id) {

}

var prefs = new Prefs();

function Answer(id) {
	
}

Util.subClass(Display, Answer);

function StringAnswer(s, id) {
	this.id = id; // do in parent
	this.s = s;
}

StringAnswer.prototype.draw = function(div) {
	app(div, this.s);
}

function Instr(s, id) {
	this.id = id;
	this.s = s;
}

Instr.prototype.draw = function(div) {
	app(div, this.s);
}

function Eqn(s, id) {
	this.id = id;
	this.s = s;
}

Eqn.prototype.draw = function(div) {
	app(div, this.s);
}

function Eqn2(s, id) {
    this.id = id;
    this.s = s;
}

Eqn2.prototype.draw = function(div) {
    app2(div, this.s);
}

function QC(parent, json) {
	this.id = json.id;
	this.title = json.title;
	//TODO: inherit default from quiz, then from user (not 1)
	this.points = (typeof json.points === 'undefined') ? 1 : json.points;
	this.level = (typeof json.level === 'undefined') ? 1 : json.level;
	this.md(parent);
	this.div.className = 'qc';
	this.comp = [];
	for (var i = 0; i < json.comp.length; ++i) {
		var comp = json.comp[i];
		var c = "new " + comp[0] + "("; 
		for(var j = 1;  j < comp.length; j++) {
			var value = comp[j];
			console.log(value);
			if (typeof(value) === 'string')
				c += "'" + comp[j] + "'";
			else if(comp[j].constructor === Array) {
				console.log(JSON.stringify(comp[j]));
				c+= JSON.stringify(comp[j]);
			}
			else
				c += comp[j];
			if(j != comp.length-1) 
				c += ', ';
		}
		c += ')';		
		//c = "new " + comp[0] + "(";  + comp[2] + "' , '" + comp[1] + "')"; //need to loop this for more than 3 elements in array?

		console.log(c);
		this.comp.push(eval(c));
	}
}

Util.subClass(Display, QC);

QC.prototype.buildHeader = function() { //is this needed?
	var header = document.createElement('div');
	header.className = 'header';
	var headerString = this.id + ': ' + this.title;
	header.appendChild(document.createTextNode(headerString));
	return header;
}

QC.prototype.draw = function() {  //need to pass in some kind of element to draw onto?
	var d = this.buildHeader();
	this.div.appendChild(d);
	console.log(this);
	for (var i = 0; i < this.comp.length; ++i)
		this.comp[i].draw(this.div); //pass in div
}


function Quiz(parent, json) {
	
	for (var k in json) {
		this[k] = json[k];
	}
		this.md(parent);
	//parent.appendChild(this.div);
	this.policy = prefs.getPolicy(json);
	for (var i = 0; i < this.questions.length; ++i) {
		console.log(this.questions[i]);
		this.questions[i] = new QC(this.div, this.questions[i]);
		console.log(this.questions[i]);
	}
	console.log(this);
}
Util.subClass(Display, Quiz);

//add question container
Quiz.prototype.add = function(qc) {
	this.questions.push(qc);	
}

Quiz.prototype.drawQuiz = function() {
	console.log(this);
	console.log(this.questions.length);
	for (var i = 0; i < this.questions.length; ++i) {
		console.log(this.questions[i].draw); //this is thinking to do quiz.draw??
		this.questions[i].draw();
	}
}


function load() {
	var p = document.getElementById("content");
	console.log(p);
	
	var test = [1,2,3,4];
	console.log(typeof(test));
	console.log(test);
	
	
	var quest = [
{
	id: "qc1000",
	title: "Addition",
	comp: [
		["Instr", "What is ", "1"],
		["Eqn", "2+2", "2"],
        ["MC", [3,4,5,6],"3"]
	]
},

{
	id: "qc1001",
	title: "Addition",
	comp: [
		["Instr", "Which sport do you like?", "1"],
		["MCS", ["basketball","football","volleyball","baseball"],"2"]
	]
},

{
	id: "qc1002",
	title: "Multiplication",
	comp: [
		["Instr", "What is ","1"],
		["Eqn", "3*4", "2"],
		[ "Fillin", "3"]
	]
},

// {
// 	id: "qc1003",
// 	title: "Cloze",
// 	comp: [
// 		["Instr", "Complete the code below so it prints \"Hello\"","1"],
//         ["Eqn2", "br", "2"],
// 		["Eqn", "public A {", "3"],
//         ["Eqn2", "br", "4"],
// 		["Eqn", "void (String[] args) {", "5"],
//         ["Eqn2", "br", "6"],
// 		["Eqn", "System.", "7"],
//         ["Fillin", "8"],
//         ["Eqn", "}", "9"],
//         ["Eqn2", "br", "10"],
//         ["Eqn", "}", "11"],
//         ["Eqn2", "br", "12"]
// 	]
// },

{
	id: "qc1003",
	title: "Cloze",
	comp: [
        ["Instr", "Complete the code below so it prints \"Hello\"","1"],
		["Cloze",
			[
                "public class A {",
                "    public static void main(String[] args) {",
				"    System.",
				"[]",
                "    }",
                "}"
			],
			"1"
		]
	]
},

{
	id: "qc1004",
	title: "Codes",
	comp: [
		["Instr", "Complete the code below so it prints \"Hello\"","1"],
        ["Codes", "public class A {\\n  public void main(String[] args) {\\n  System.\\n  }\\n}\\n", "2"]
	]
},

{
	id: "qc1005",
	title: "Grid",
	comp: [
		["Instr", "Enter 1 through 5","1"],
		[ "Grid", 5, "2"]
	]
},

{
	id: "qc1006",
	title: "Survey",
	comp: [
		["Instr", "Enter your honest opinions.  There are no right or wrong answers"],
		["Survey", "1", "Likert5", [
			"I like Chinese food",
			"I like Korean food",
			"I like Indian food",
			"I got sick on sushi"
		]]
	]
},

{
	id: "qc1007",
	title: "Matrix",
	comp: [
		["Instr", "Enter any 3x3 matrix","1"],
		[ "Matrix", 3,3, "2"]
	]
},

{
    id: "qc1008",
	title: "Addition",
	comp: [
		["Instr", "What is ", "1"],
		["Eqn", "2+2", "2"],
		["MCDrop", [1,2,3,4], "3"]
	]
},

{
    id: "qc1009",
	title: "Drag and Drop",
	comp: [
		["Instr", "Locate the parts of the cat ",'1'],
		["dragDrop", "cat.jpg",["Ear","Eye","Nose","Tongue"], [ {"left":215,"top":30}, {"left":255,"top":120},{"left":285,"top":160},{"left":285,"top":220}], 7]
	]
},

{
	id: "qc1010",
	title: "Match",
	comp: [
		["Instr", "Match the types", "1"],
		["Match",["animal","number","food"],["ice cream", "dog", "three"], "2" ]
	]
}
    ];
	var json = {
  		title: "test",
 		class: "L-quiz",
 		questions: quest
	}
	var q = new Quiz(p, json);

	q.drawQuiz();
}
