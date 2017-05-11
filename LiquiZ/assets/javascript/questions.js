/*display elements like multiple choice, fillin, etc*/

/*Regular multiple choice with options shown vertically*/ 
function MC(choices, id) {
	this.id = id;
	this.choices = choices;
	this.responses = [];
}

MC.prototype.draw = function(div) {
	for (var i = 0; i < this.choices.length; i++) {
        var label = document.createElement('label');
        label.className = "control control--radio";
		var xbutton = document.createElement('INPUT');
		xbutton.type = 'Radio';
		xbutton.name = "choice";
		var diva = document.createElement("div");
		diva.className = "control__indicator";
        label.appendChild(xbutton);
        label.appendChild(diva);
		label.appendChild(document.createTextNode(this.choices[i]));
		div.appendChild(label);
	}
};

/*A multiple choice question where options are in a dropdown menu*/
function MCDrop(choices, id) {
	this.id = id;
	this.choices = choices;
	this.responses = [];
}

MCDrop.prototype.draw = function(div) {
	var x = document.createElement('div');
    var selectList = document.createElement("select");
    selectList.className = "newSelect";
    selectList.name = "dropDown";
	for (var i = 0; i < this.choices.length; i++) {
        var option = document.createElement('option');
		option.value = this.choices[i];
        option.text = this.choices[i];
        selectList.appendChild(option);
	}
    x.appendChild(selectList);
    div.appendChild(x);
};



function Matrix(rows, cols, id) {
	this.id = id;
	this.cols = cols;
	this.rows = rows;
}

Matrix.prototype.draw = function(div) {
	for(var i = 0; i < this.rows; i++) {
		var row = document.createElement("div");
		for(var j = 0; j<this.cols; j++) {
			var inp = document.createElement('input');
			inp.type = 'text';
			inp.className = "Matrix";
            inp.name = "matrix";
			row.appendChild(inp);
		}
		div.appendChild(row);
	}
};

function Grid(length, id) {
	this.id = id;
	this.length = length;
}

Grid.prototype.draw = function(div) {
	for(var i = 0; i < this.length; i++) {
		var inp = document.createElement('input');
		inp.type = 'text';
		inp.className = "Matrix";
        inp.name = "grid";
		div.appendChild(inp);
	}
};

function FillIn(id) { //parent) {
	this.id = id;
	//pattern for regex
}

FillIn.prototype.draw = function(div) {
	var inp = document.createElement("input");
	inp.type = "text";
	inp.style.textAlign = 'center';
    inp.className = 'fillIn';
    inp.name = 'fillIn';
	div.appendChild(inp);
};

function Essay(id) { //parent) {
	this.id = id;
	//pattern for regex
}

Essay.prototype.draw = function(div) {
	var inp = document.createElement("textarea");
	inp.type = "text";
    inp.className = "Essay";
	inp.style.textAlign = 'left';
    inp.name = "essay";
	div.appendChild(inp);
};


function Survey(choices, terms, id) {
	this.id = id;
	this.terms = terms;
	if(choices == "Likert5") {
		this.choices = [
		  	"Strongly Agree",
          	"Agree",
          	"Neutral",
          	"Disagree",
          	"Strongly Disagree"]
	}
	else
		this.choices = choices;
}

Survey.prototype.draw = function(div) {
	for(var j = 0; j < this.terms.length; j++) {
		var termBox = document.createElement('div');
        termBox.className = "SurveyContainer";
		termBox.appendChild(document.createTextNode(this.terms[j]));
        var surveyChoiceList = document.createElement('div');
        surveyChoiceList.className = "ChoiceContainer";
		for (var i = 0; i < this.choices.length; i++) {
			var x = document.createElement('div');
            x.className = "Choice";
			var label = document.createElement('label');
            label.className = "control control--radio";
			var xbutton = document.createElement('INPUT');
			xbutton.type = 'Radio';
			xbutton.name = this.terms[j];
            var diva = document.createElement("div");
            diva.className = "control__indicator";
			label.appendChild(xbutton);
			label.appendChild(diva);
			label.appendChild(document.createTextNode(this.choices[i]));
            label.appendChild(document.createTextNode("\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"));
            x.appendChild(label);
			x.style.display = "inline-block";
			surveyChoiceList.appendChild(x);
		}
        termBox.appendChild(surveyChoiceList);
		div.appendChild(termBox);
	}
};

function Likert5(questions, id) {
	this.id = id;
	this.questions = questions;
}

Likert5.prototype.draw = function(div) {
	var scale = ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"];
	var question3 = document.createElement("div");
	var tbl = document.createElement("table");
	//create header with sclae
	var header = document.createElement("tr");
	var th = document.createElement("th");
	//blank space for question
	th.appendChild(document.createTextNode(""));
	header.appendChild(th);
	for (var i = 0; i < scale.length; i++){
		th = document.createElement("th");
		th.appendChild(document.createTextNode(scale[i]));
		header.appendChild(th);
	}
	tbl.appendChild(header);
	//for each question, create a new row
	for (var j = 0; j < questions.length; j++){
		var trow = document.createElement("tr");
		var td = document.createElement("td");
		td.appendChild(document.createTextNode(questions[j]));
		trow.appendChild(td);
		//for each question row, need a new td for question or button
		for (var x = 0; x < scale.length; x++){
			td = document.createElement("td");
			var checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			td.appendChild(checkbox);
			trow.appendChild(td);
			tbl.appendChild(trow);
		}
	}
	question3.appendChild(tbl);
	div.appendChild(question3);
};

function DragDrop(image,options,locations, id) {
    this.image = image;
	this.id = id;
    this.locations = locations;
	this.options = options;
}

DragDrop.prototype.draw = function(div) {
	function dragStart(ev) {
		ev.dataTransfer.effectAllowed = 'move';
		ev.dataTransfer.setData("Text")
	}

	if (this.image.length < 50) {
        var image = new Img(this.image);
        image.draw(div);
    } else {
        var image = document.createElement("img");
        console.log(this.image);
        image.src = this.image;
        image.id = this.id;
        image.setAttribute('draggable', 'false');
        var imgDiv = document.createElement('div');
        imgDiv.className += 'imgDiv';
        imgDiv.appendChild(image);
        div.appendChild(imgDiv);
    }

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
        answerDiv.name = "dragDrop";
        answerDiv.setAttribute("ondrop","drop(event)");
        answerDiv.setAttribute("ondragover","allowDrop(event)");
        answerDiv.setAttribute("style","position:absolute; "+ coord);
        imgDiv[0].appendChild(answerDiv);
			
	}

	div.appendChild(optionsBox);
}

/*function for drag and drop*/ 
function allowDrop(ev) {
    ev.preventDefault();
}

/*function for drag and drop*/ 
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

/*function for drag and drop*/ 
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

/*match function by Junkai*/ 
function Match(types,choices, id) {
    this.id = id;
    this.types=types;
    this.choices = choices;
    this.responses = [];
}

Match.prototype.draw = function(div) {
    var x = document.createElement("div");
    var t = document.createElement("table");
    for (var j = 0; j < this.types.length; j++) {
    var selectList = document.createElement("select");
        selectList.className = "newSelect";
        selectList.name = "matching";
    for (var i = 0; i < this.choices.length; i++) {
        var option = document.createElement('option');
        option.value = this.choices[i];
        option.text = this.choices[i];
        selectList.appendChild(option);
    }
    var row = document.createElement('tr');
    var cell1 = document.createElement('td');
    var cell2 = document.createElement('td');
    cell1.appendChild(document.createTextNode(this.types[j]));
    cell2.appendChild(selectList);
    row.appendChild(cell1);
    row.appendChild(cell2);
    t.appendChild(row);
    t.className = "matchStyle";
}
    x.appendChild(t);
    div.appendChild(x);
}

/**
 * Created by yucheng on 2/13/17.
 */
//Multiple Choice which need select all that apply
function MCS(choices, id) {
    this.id = id;
    this.choices = choices;
    this.responses = [];
}

MCS.prototype.draw = function(div) {
    for (var i = 0; i < this.choices.length; i++) {
        var label = document.createElement('label');
        label.className = "control control--checkbox";
        var xbutton = document.createElement('input');
        xbutton.type = 'checkbox';
        xbutton.name = "mcs";
        var diva = document.createElement("div");
        diva.className = "control__indicator";
        label.appendChild(xbutton);
        label.appendChild(diva);
        label.appendChild(document.createTextNode(this.choices[i]));
        div.appendChild(label);
    }
};

function Codes(code, id) { //parent) {
    this.code = code;
    this.id = id;
    //pattern for regex
}

Codes.prototype.draw = function(div) {
    var inp = document.createElement("textarea");
    var newCodes = this.code.replace(/<>/g,"\n");
    inp.className = "inputCode";
    inp.name = "code";
    var myCode = document.createTextNode(newCodes);
    inp.append(myCode);
    inp.addEventListener('keydown', autosize);
    div.appendChild(inp);
};

function Cloze(text,id) { //parent) {
    this.id = id;
    this.text = text;
    //pattern for regex
}

Cloze.prototype.draw = function(div) {
    for(var j = 0; j < this.text.length; j++) {
        var container = document.createElement('div');
        container.className = "containerStyle";
        if(this.text[j] == " []") {
            this.text[j] = "[]";
        }
        if(this.text[j+1] == " []") {
            this.text[j+1] = "[]";
        }
        if(this.text[j-1] == " []") {
            this.text[j-1] = "[]";
        }
        if (this.text[j] != "[]" && this.text[j-1] != "[]" && this.text[j+1] != "[]") {
            this.text[j] = this.text[j].replace(" ", "\u00a0\u00a0");
            var x = document.createElement("div");
            var mainText = document.createElement("p");
            mainText.className = "mainText";
            var p0 = document.createTextNode(this.text[j]);
            mainText.appendChild(p0);
            x.appendChild(mainText);
            container.appendChild(x);
        } else if (this.text[j] != "[]" && this.text[j-1] == "[]" && this.text[j+1] == null) {
            this.text[j] = this.text[j].replace(" ", "\u00a0\u00a0");
            x = document.createElement("div");
            mainText = document.createElement("p");
            mainText.className = "mainText";
            p0 = document.createTextNode(this.text[j]);
            mainText.appendChild(p0);
            x.appendChild(mainText);
            container.appendChild(x);
        } else if (this.text[j] != "[]" && this.text[j-1] != "[]" && this.text[j+1] == "[]") {
            this.text[j] = this.text[j].replace(" ", "\u00a0\u00a0");
            x = document.createElement("div");
            textBefore = document.createElement("p");
            textBefore.className = "textBeforeCloze";
            pp = document.createTextNode(this.text[j]);
            textBefore.appendChild(pp);
            x.appendChild(textBefore);
            container.appendChild(x);
        } else if (this.text[j] != "[]" && this.text[j-1] == "[]" && this.text[j+1] == "[]") {
            this.text[j] = this.text[j].replace(" ", "\u00a0\u00a0");
            x = document.createElement("div");
            var textBefore = document.createElement("p");
            textBefore.className = "textBeforeCloze";
            var pp = document.createTextNode(this.text[j]);
            textBefore.appendChild(pp);
            x.appendChild(textBefore);
            container.appendChild(x);
        } else if (this.text[j] != "[]" && this.text[j-1] == "[]" && this.text[j+1] != "[]") {
            this.text[j] = this.text[j].replace(" ", "\u00a0\u00a0");
            x = document.createElement("div");
            var textAfter = document.createElement("p");
            textAfter.className ="textAfterCloze";
            var ppp = document.createTextNode(this.text[j]);
            textAfter.appendChild(ppp);
            x.appendChild(textAfter);
            container.appendChild(x);
        } else if (this.text[j] == "[]" && this.text[j-1] != "[]" && this.text[j+1] != "[]") {
            x = document.createElement("div");
            var inp = document.createElement("input");
            inp.className = 'inputCloze';
            inp.name = "cloze";
            inp.type = "text";
            inp.maxlength="10";
            x.appendChild(inp);
            container.appendChild(x);
        }
        div.appendChild(container);
    }
};

function Numbers(len,id) { //parent) {
    this.id = id;
    this.len = len;
    //pattern for regex
}

Numbers.prototype.draw = function(div) {
    var inp = document.createElement("input");
    inp.className = 'inputNumber';
    inp.name = "number";
    inp.type = "text";
    inp.maxLength = this.len;
    inp.style.textAlign = 'center';
    inp.onkeypress= function isNumberKey(evt)
    {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57));

    };
    div.appendChild(inp);
};

function fileUpload(id) {
    this.id = id;
}

fileUpload.prototype.draw = function(div) {
    var inp = document.createElement("input");
    inp.type = "file";
    inp.name = "fileUpload";
    div.appendChild(inp);
};


