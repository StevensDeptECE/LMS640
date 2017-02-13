
//Multiple Choice which need select all that apply
function MCS(choices, id) {
    this.id = id;
    this.choices = choices;
    this.responses = [];
}

MCS.prototype.draw = function(div) {
    for (var i = 0; i < this.choices.length; i++) {
        var x = document.createElement('div');
        var xbutton = document.createElement('INPUT');
        xbutton.type = 'checkbox';
        xbutton.name = "choice";
        var label = document.createElement('label');
        label.appendChild(xbutton);
        label.appendChild(document.createTextNode(this.choices[i]));
        x.appendChild(label);
        div.appendChild(x);
    }
}


function Codes(code, id) { //parent) {
    this.code = code;
    this.id = id;
    //pattern for regex
}

Codes.prototype.draw = function(div) {
    var br = document.createElement("br");
    div.appendChild(br);
    var inp = document.createElement("TEXTAREA");
    this.code.replace("newLine","\n");
    var myCode = document.createTextNode(this.code);
    inp.append(myCode);
    div.appendChild(inp);
}

function Cloze(text,id) { //parent) {
    this.id = id;
    this.text = text;
    //pattern for regex
}

Cloze.prototype.draw = function(div) {
    for(var j = 0; j < this.text.length; j++) {
        var termBox = document.createElement('div');
        console.log(this.text);
        termBox.className = "SurveyContainer";
        if (this.text[j] !== "[]") {
            this.text[j] = this.text[j].replace(" ","\u00a0\u00a0");
            termBox.appendChild(document.createTextNode(this.text[j]));
        } else {
            var inp = document.createElement("input");
            inp.type = "text";
            inp.style.textAlign = 'center';
            div.appendChild(inp);
        }
        div.appendChild(termBox);
    }
}