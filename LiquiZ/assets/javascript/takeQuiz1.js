/*This is the implementation of drawing a quiz that is integrated
 with the main page */


/*utility function to create inheritance*/
Util = {
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
}

function QC(parent, json, index) {
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
	console.log(json.comp);
    for (var i = 0; i < json.comp.length; ++i) {
        var comp = json.comp[i];
        var c = "new " + comp[0] + "(";
        for(var j = 1;  j < comp.length; j++) {
            var value = comp[j];
            if (typeof(value) === 'string')
                c += "'" + comp[j] + "'";
            else if(comp[j].constructor === Array) {
                c+= JSON.stringify(comp[j]);
            }
            else
                c += comp[j];
            if(j != comp.length-1)
                c += ', ';
        }
        c += ')';
        this.comp.push(eval(c));
    }
}

Util.subClass(Display, QC);


QC.prototype.buildHeader = function() {
    var header = document.createElement('div');
    var pointsdiv = document.createElement('div');
    pointsdiv.className = 'qcPoints';
    pointsdiv.appendChild(document.createTextNode(this.points + " points"));
    header.className = 'header';
    var headerString = this.questionNum + ': ' + this.title;
    header.appendChild(document.createTextNode(headerString));
    header.appendChild(pointsdiv);
    return header;
}

QC.prototype.draw = function() {
    var d = this.buildHeader();
    this.div.appendChild(d);
    for (var i = 0; i < this.comp.length; ++i)
        this.comp[i].draw(this.div);
}


/*constructor for takeQuiz object*/
function takeQuiz (payload) {
    for (var k in payload) {
        this[k] = payload[k];
    }
	/*will need to add this once we apply policy stuff*/
    //this.policy = prefs.getPolicy(json);
	/*Create the objects for each question*/
    this.div= Util.div("wrapper_rightside");
    for (var i = 0; i < this.questions.length; ++i) {
		/*this changes questions[i] so if we click on the quiz again it won't draw right
		 should be okay because you should only be able to load a quiz once*/
        this.questions[i] = new QC(this.div, this.questions[i], i);
    }
    /*Create sidebar using question list--in progress*/
    this.navDiv = Util.div("quiz-nav-right");
    this.sidebar = new Sidebar(payload["questions"],this.navDiv);
    
}

function timerSetter (quizLength){
    var dueDate = new Date().getTime() +  quizLength*60000;
    var timeLeftHTML = Util.p("Time Remaining ","h04","countdownTimer"); 
    document.getElementById("up2").appendChild(timeLeftHTML);
    var timer = setInterval(function() {
        var now = new Date().getTime();
        var timeLeft = dueDate - now;
        var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        document.getElementById("countdownTimer").innerHTML = "Time Remaining " hours + ":" + minutes + ":" + seconds;
        if (timeLeft < 0) {
            clearInterval(timer);
            //FUNCTION TO SUBMIT QUIZ GOES HERE
        }
    },1000);
}

Util.subClass(Display, takeQuiz);

/*draw method for takeQuiz object*/
takeQuiz.prototype.draw = function(div){
    var header = Util.h1(this.title,"h03");
    clearElements("up2");
    document.getElementById("up2").appendChild(header);
    timerSetter(this.time);
    clearElements("up3");
    this.div.appendChild(this.navDiv);
    div.appendChild(this.div);
   // div.appendChild(this.navDiv);
    this.sidebar.draw();
    for (var i = 0; i < this.questions.length; ++i) {
        this.questions[i].draw();
    }

};

var quest = [
    {
        id: "qc1000",
        title: "Addition",
        points: 10,
        comp: [
            ["Instr", "What is 2+2? ", "1"],
           // ["Eqn", "2+2", "2"],
            ["MC", [8,4,5,6], "3"]
        ]
    },

    {
        id: "qc1001",
        title: "Select All that Apply",
        points: 10,
        comp: [
            ["Instr", "Which sport do you like?", "1"],
            ["MCS", ["basketball","football","volleyball","baseball"], "2"]
        ]
    },

    {
        id: "qc1002",
        title: "Fill in",
        points: 10,
        comp: [
            ["Instr", "What is 3*4? ","1"],
          //  ["Eqn", "3*4", "2"],
            [ "Fillin", "3"]
        ]
    },

    {
        id: "qc10022",
        title: "Fill in Numbers",
        points: 10,
        comp: [
            ["Instr", "What is 10/3? ","1"],
          //  ["Eqn", "10 / 3", "2"],
            [ "Numbers", "6", "3"]
        ]
    },

    {
        id: "qc1003",
        title: "Cloze",
        points: 10,
        comp: [
            ["Instr", "Complete the code below so it prints \"Hello\"","1"],
            ["Cloze",
                [
                    "public class A {",
                    "public static",
                    "[]",
                    "main(String[] args) {",
                    "System.",
                    "[]",
                    "}",
                    "}"
                ],
                "1"
            ]
        ]
    },

    {
        id: "qc1004",
        title: "Code",
        points: 10,
        comp: [
            ["Instr", "Complete the code below so it prints \"Hello\"","1"],
            ["Codes", "public class A {<>  public void main(String[] args) {<>  System.<>  }<>}", "2"]
        ]
    },

    {
        id: "qc1005",
        title: "Grid",
        points: 10,
        comp: [
            ["Instr", "Enter the first pass of bubblesort for the array [5, 1, 3, 4, 2]","1"],
            [ "Grid", 5, "2"]
        ]
    },

    {
        id: "qc1006",
        title: "Survey",
        points: 10,
        comp: [
            ["Instr", "Enter your honest opinions.  There are no right or wrong answers"],
            ["Survey", "Likert5", [
                "I like Chinese food",
                "I like Korean food",
                "I like Indian food",
                "I got sick on sushi"
            ], "1"]
        ]
    },

    {
        id: "qc1007",
        title: "Matrix",
        points: 10,
        comp: [
            ["Instr", "Enter any 3x3 magic square","1"],
            [ "Matrix", 3,3, "2"]
        ]
    },

    {
        id: "qc1008",
        title: "Drop Down",
        points: 10,
        comp: [
            ["Instr", "What is 2+2? ", "1"],
            ["MCDrop", [1,2,3,4], "3"]
        ]
    },

    {
        id: "qc1009",
        title: "Drag and Drop",
        points: 10,
        comp: [
            ["Instr", "Locate the parts of the cat ",'1'],
            ["dragDrop", "cat.jpg",["Ear","Eye","Nose","Tongue"], [ {"left":215,"top":30}, {"left":255,"top":120},{"left":285,"top":160},{"left":285,"top":220}], 7]
        ]
    },

    {
        id: "qc1010",
        title: "Matching",
        points: 10,
        comp: [
            ["Instr", "Match the types", "1"],
            ["Match",["animal","number","food"],["ice cream", "dog", "three"], "2" ]
        ]
    },

    {
        id: "qc101s",
        title: "Short Essay",
        points: 10,
        comp: [
            ["Instr", "Please analyze the relationship between Lennie and George in Of Mice and Men", "1"],
            ["Essay", "2" ]
        ]
    }
];
var quiz1Payload = {
    title: "Quiz 1",
    class: "L-quiz",
    time: "60",
    questions: quest
};