/**
 * Created by yucheng on 3/2/17.
 */

function edit_row(no)
{
    document.getElementById("edit_button"+no).style.display="none";
    document.getElementById("save_button"+no).style.display="block";

    var id=document.getElementById("id_row"+no);
    var title=document.getElementById("title_row"+no);
    var instr=document.getElementById("instr_row"+no);
    var eqn=document.getElementById("eqn_row"+no);
    var oper=document.getElementById("oper_row"+no);

    var id_data=id.innerHTML;
    var title_data=title.innerHTML;
    var instr_data=instr.innerHTML;
    var eqn_data=eqn.innerHTML;
    var oper_data=oper.innerHTML;

    id.innerHTML="<input type='text' id='id_text"+no+"' value='"+id_data+"'>";
    title.innerHTML="<input type='text' id='title_text"+no+"' value='"+title_data+"'>";
    instr.innerHTML="<input type='text' id='instr_text"+no+"' value='"+instr_data+"'>";
    eqn.innerHTML="<input type='text' id='eqn_text"+no+"' value='"+eqn_data+"'>";
    oper.innerHTML="<input type='text' id='oper_text"+no+"' value='"+oper_data+"'>";
}

function save_row(no)
{
    var id_val=document.getElementById("id_text"+no).value;
    var title_val=document.getElementById("title_text"+no).value;
    var instr_val=document.getElementById("instr_text"+no).value;
    var eqn_val=document.getElementById("eqn_text"+no).value;
    var oper_val=document.getElementById("oper_text"+no).value;

    document.getElementById("id_row"+no).innerHTML=id_val;
    document.getElementById("title_row"+no).innerHTML=title_val;
    document.getElementById("instr_row"+no).innerHTML=instr_val;
    document.getElementById("eqn_row"+no).innerHTML=eqn_val;
    document.getElementById("oper_row"+no).innerHTML=oper_val;

    document.getElementById("edit_button"+no).style.display="block";
    document.getElementById("save_button"+no).style.display="none";
}

function delete_row(no)
{
    document.getElementById("row"+no+"").outerHTML="";
}

function add_row()
{
    var new_id=document.getElementById("new_id").value;
    var new_title=document.getElementById("new_title").value;
    var new_instr=document.getElementById("new_instr").value;
    var new_eqn=document.getElementById("new_eqn").value;
    var new_oper=document.getElementById("new_oper").value;

    var table=document.getElementById("data_table");
    var table_len=(table.rows.length)-1;
    var row = table.insertRow(table_len).outerHTML=
        "<tr id='row"+table_len+"'>" +
        "<td id='id_row"+table_len+"'>"+new_id+"</td>" +
        "<td id='title_row"+table_len+"'>"+new_title+"</td>" +
        "<td id='instr_row"+table_len+"'>"+new_instr+"</td>" +
        "<td id='eqn_row"+table_len+"'>"+new_eqn+"</td>" +
        "<td id='oper_row"+table_len+"'>"+new_oper+"</td>" +
        "<td><input type='button' id='edit_button"+table_len+"' value='Edit' class='edit' onclick='edit_row("+table_len+")'> " +
        "<input type='button' id='save_button"+table_len+"' value='Save' class='save' onclick='save_row("+table_len+")'> " +
        "<input type='button' value='Delete' class='delete' onclick='delete_row("+table_len+")'></td></tr>";

    document.getElementById("new_id").value="";
    document.getElementById("new_title").value="";
    document.getElementById("new_instr").value="";
    document.getElementById("new_eqn").value="";
    document.getElementById("new_oper").value="";
}

var datas = [];
function tableToJson(table) {
    // var datas = []; // first row needs to be headers
    var headers = ["id","title","comp"];
    // for (var i=0; i<table.rows[0].cells.length; i++) {
    //     headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi,'');
    // }
    // go through cells
    for (var i=1; i<table.rows.length-1; i++) {
        var tableRow = table.rows[i];
        var rowData = {};
        for (var j=0; j<2; j++) {
            rowData[ headers[j] ] = tableRow.cells[j].innerHTML;
        }
        var instr = [];
        var eqn = [];
        var oper = [];
        instr.push(tableRow.cells[2].innerText.split(/,(?=[^\]]*(?:\[|$))/g));
        eqn.push(tableRow.cells[3].innerHTML.split(/,(?=[^\]]*(?:\[|$))/g));
        oper.push(tableRow.cells[4].innerHTML.split(/,(?=[^\]]*(?:\[|$))/g));
        var comps = [];
        comps.push(instr);
        comps.push(eqn);
        comps.push(oper);
        rowData[ headers[2]] = comps;
        datas.push(rowData);
        console.log(datas);
    }
    return datas;
}

// -----------------------------------------------------------------------

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
    console.log(this);
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


    var quest =  datas;
    var json = {
        title: "test",
        class: "L-quiz",
        questions: quest
    }
    var q = new Quiz(p, json);

    q.drawQuiz();
}


