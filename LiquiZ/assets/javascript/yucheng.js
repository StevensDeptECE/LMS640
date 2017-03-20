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
    var br = document.createElement("br");
    div.appendChild(br);
    var inp = document.createElement("textarea");
    var newCodes = this.code.replace(/<>/g,"\n");
    inp.className = "inputCode";
    var myCode = document.createTextNode(newCodes);
    inp.append(myCode);
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