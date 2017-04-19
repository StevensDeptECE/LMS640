/**
 * Created by yucheng on 3/6/17.
 */

// This is the implementation of drawing a new quiz after we create it with "Create New Quiz" page

/*utility function to create inheritance*/
Util2 = {
    subClass: function (superclass, subclass) {
        subclass.prototype = Object.create(superclass.prototype);
        subclass.prototype.constructor = subclass;
    }
};

/*Display element can draw itself into a div box, has optional class*/
function Display(id, clas) {
    this.div;
    this.id = id;
    this.class = clas; // could be undefined?
}

/*make a div under the parent. This is a utility function for display
 objects but not every display object necessarily creates a div*/
Display.prototype.md = function(parent) {
    this.div = document.createElement('div');
    if (this.class)
        this.div.class = this.class;
    parent.appendChild(this.div);
};


function newQC(parent, json, index) {
    this.questionNum = index + 1;
    this.id = json.id;
    this.title = json.title;
    this.points = json.points;
    //TODO: inherit default from quiz, then from user (not 1)
    this.points = (typeof json.points === 'undefined') ? 1 : json.points;
    this.level = (typeof json.level === 'undefined') ? 1 : json.level;
    this.md(parent);
    this.div.className = 'qc';
    this.div.id = this.id;
    this.comp = [];
    for (var i = 0; i < json.comp.length; ++i) {
        var comp = json.comp[i];
        var c = "new " + comp[0] + "(";
        for(var j = 1;  j < comp.length; j++) {
            var value = comp[j];
            if (typeof(value) === 'string' && value.charAt(value.length-1) == "]") {
                var a3 = value;
                var left = 0, right = a3.length - 1;
                while(left < right) {
                    if(a3.charAt(left) != "[") left++;

                    if(a3.charAt(right) != "]") right--;

                    if(a3.charAt(left) == "[" && a3.charAt(right) == "]") break;
                }
                var a33 = a3.substring(left+1, right);
                console.log(a33);
                a33 = a33.split(/,(?=[^\}]?(?=[\{]))/g);
                console.log(a33);
                if (comp[0] == "DragDrop" && a33[0].charAt(a33[0].length-1) == "}") {
                    var objectArray = [];
                    for(var k = 0; k < a33.length; k++) {
                        var objectEle = eval('(' + a33[k] + ')');
                        objectArray.push(objectEle);
                    }
                    a33 = objectArray;
                }
                if(a33.length < 2) {
                    a33 = a33[0];
                    console.log(a33);
                    a33 = a33.split(/,(?=[^'}]?(?=[\']))/g);
                    console.log(a33);
                    if (a33.length < 2) {
                        a33 = a33[0];
                        console.log(a33);
                        a33 = a33.split(/,/g);
                    }
                }
                c+= JSON.stringify(a33);
            }
            else if (typeof(value) === 'string')
                c += "'" + comp[j] + "'";
            else if(comp[j].constructor === Array)
                c+= JSON.stringify(comp[j]);
            else
                c += comp[j];
            if(j != comp.length-1)
                c += ', ';
        }
        c += ')';
        if (c != "new ()") this.comp.push(eval(c));
    }
}

Util2.subClass(Display, newQC);


newQC.prototype.buildHeader = function() { //is this needed?
    var header = document.createElement('div');
    var pointsdiv = document.createElement('div');
    pointsdiv.className = 'qcPoints';
    pointsdiv.appendChild(document.createTextNode(this.points + " points"));
    header.className = 'header';
    var headerString = this.questionNum + ': ' + this.title;
    header.appendChild(document.createTextNode(headerString));
    header.appendChild(pointsdiv);
    return header;
};

newQC.prototype.draw = function() {
    var d = this.buildHeader();
    this.div.appendChild(d);
    for (var i = 0; i < this.comp.length; ++i)
        this.comp[i].draw(this.div);
};

var newQuestions;
/*constructor for takeNewQuiz object*/
function takeNewQuiz (payload) {
    for (var k in payload) {
        this[k] = payload[k];
    }
    /*will need to add this once we apply policy stuff*/
    //this.policy = prefs.getPolicy(json);
    /*Create the objects for each question*/
    this.div= Util.div("wrapper_rightside",this.title);
    newQuestions = this.questions.slice();
    for (var i = 0; i < this.questions.length; ++i) {
        /*this changes questions[i] so if we click on the quiz again it won't draw right
         should be okay because you should only be able to load a quiz once*/
         newQuestions[i] =  new newQC(this.div, this.questions[i], i);
         //this.questions[i] = new newQC(this.div, this.questions[i]);
    }
    /*Create sidebar using question list--in progress*/
    this.navDiv = Util.div("quiz-nav-right");
    this.sidebar = new Sidebar(payload["questions"],this.navDiv);
}

Util2.subClass(Display, takeNewQuiz);

/*draw method for takeNewQuiz object*/
takeNewQuiz.prototype.draw = function(div){
    var header = Util.h1(this.title, "h03");
    var clearButton = Util.button("Clear localStorage",function () {sessionStorage.clear(); window.location.reload(false);}, "three");
    header.appendChild(clearButton);
    clearElements("up2");
    document.getElementById("up2").appendChild(header);
    clearElements("up3");
    this.div.appendChild(this.navDiv);
    div.appendChild(this.div);
    this.sidebar.draw();
    for (var i = 0; i < newQuestions.length; ++i) {
        newQuestions[i].draw();
    }

};

var newQuest = JSON.parse(sessionStorage.getItem("mytext"));
var newQuizPayload = {
    title: "Quiz 1",
    class: "L-quiz",
    questions: newQuest
};