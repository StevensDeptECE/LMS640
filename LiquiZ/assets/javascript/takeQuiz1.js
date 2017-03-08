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


QC.prototype.buildHeader = function() { //is this needed?
    var header = document.createElement('div');
    header.className = 'header';
    var headerString = this.id + ': ' + this.title;
    header.appendChild(document.createTextNode(headerString));
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
    this.div= Util.div("wrapper",this.title);
    for (var i = 0; i < this.questions.length; ++i) {
		/*this changes questions[i] so if we click on the quiz again it won't draw right
		 should be okay because you should only be able to load a quiz once*/
        this.questions[i] = new QC(this.div, this.questions[i]);
    }
}

Util.subClass(Display, takeQuiz);

/*draw method for takeQuiz object*/
takeQuiz.prototype.draw = function(div){
    var header = Util.h1(this.title);
    clearElements("up2");
    document.getElementById("up2").appendChild(header);
    clearElements("up3");
    div.appendChild(this.div);
    for (var i = 0; i < this.questions.length; ++i) {
        this.questions[i].draw();
    }

}

var quest = [
    {
        id: "qc1000",
        title: "Addition",
        comp: [
            ["Instr", "What is ", "1"],
            ["Eqn", "2+2", "2"],
            ["MC", [3,4,5,6], "3"]
        ]
    },

    {
        id: "qc1001",
        title: "Multiple Choices",
        comp: [
            ["Instr", "Which sport do you like?", "1"],
            ["MCS", ["basketball","football","volleyball","baseball"], "2"]
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

    {
        id: "qc10022",
        title: "Division",
        comp: [
            ["Instr", "What is ","1"],
            ["Eqn", "10 / 3", "2"],
            [ "Numbers", "6", "3"]
        ]
    },
    {
        id: "qc1003",
        title: "Cloze",
        comp: [
            ["Instr", "Complete the code below so it prints \"Hello\"","1"],
            ["Cloze",
                [
                    "public class A {",
                    "    public static",
                    "[]",
                    "  main(String[] args) {",
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
    },

    {
        id: "qc101s",
        title: "Short Essay",
        comp: [
            ["Instr", "Please analyze the relationship between Lennie and George in Of Mice and Men", "1"],
            ["Essay", "2" ]
        ]
    }
];
var quiz1Payload = {
    title: "Quiz 1",
    class: "L-quiz",
    questions: quest
}