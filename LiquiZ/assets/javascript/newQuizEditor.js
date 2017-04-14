/**
 * Created by yucheng on 4/12/17.
 */

function newQuizEditor(payload){
    this.payload=payload;
}

newQuizEditor.prototype.draw= function(s){
    var header = Util.h1("Quiz Editor","h03");
    clearElements("up2");
    document.getElementById("up2").appendChild(header);
    clearElements("up3");
    var newDiv = Util.div("wrapper_rightside","quizEditor");
    newDrawEditor(newDiv,newQuizEditorPayLoad);

    // var saveQuiz = Util.button("Save Quiz",function () {tableToJson2(edit_table); window.location.reload(false);},"three");
    // newDiv.appendChild(saveQuiz);

    s.appendChild(newDiv);

};

var countList = [];
function newDrawEditor(s,data) {
    for (var i = 0; i < data.length; i++) {
        var count = data[i].id;
        countList.push(count);
        console.log(countList);

        var Quest= Util.div("wrapper_rightside");
        Quest.id = "row" + count;
        Quest.className = 'qc';

        var QuestionID = document.createElement("p");
        QuestionID.appendChild(document.createTextNode("Question ID: " + count));
        QuestionID.value = "NO." + count;
        QuestionID.id = "QuestionID" + count;
        QuestionID.className = "th5";

        var th1 = document.createElement("p");
        th1.appendChild(document.createTextNode("Please select the type of the question below"));
        th1.className = "th5";

        var selectList = document.createElement("select");
        var choices = ["Multi Choice", "Multi Choice Select", "Fill in", "Numbers", "Cloze", "Codes", "Grid", "Survey", "Matrix", "Multi Choice drop", "Drag and Drop", "Matching", "Essay", "File Upload"];
        for(var j = 0; j < choices.length; j++) {
            var option = document.createElement('option');
            if(data[i].comp[1][0] == "MC" && j == 0) {
                option.selected = true;
            } else if(data[i].comp[1][0] == "MCS" && j== 1) {
                option.selected = true;
            } else if(data[i].comp[1][0] == "FillIn" && j== 2) {
                option.selected = true;
            } else if(data[i].comp[1][0] == "Numbers" && j== 3) {
                option.selected = true;
            } else if(data[i].comp[1][0] == "Cloze" && j== 4) {
                option.selected = true;
            } else if(data[i].comp[1][0] == "Code" && j== 5) {
                option.selected = true;
            } else if(data[i].comp[1][0] == "Grid" && j== 6) {
                option.selected = true;
            } else if(data[i].comp[1][0] == "Survey" && j== 7) {
                option.selected = true;
            } else if(data[i].comp[1][0] == "Matrix" && j== 8) {
                option.selected = true;
            } else if(data[i].comp[1][0] == "MCDrop" && j== 9) {
                option.selected = true;
            } else if(data[i].comp[1][0] == "DragDrop" && j== 10) {
                option.selected = true;
            } else if(data[i].comp[1][0] == "Match" && j== 11) {
                option.selected = true;
            } else if(data[i].comp[1][0] == "Essay" && j== 12) {
                option.selected = true;
            } else if(data[i].comp[1][0] == "fileUpload" && j== 13) {
                option.selected = true;
            }
            option.value = choices[j];
            option.text = choices[j];
            selectList.appendChild(option);
        }

        selectList.onchange = function() {createClickHandler3(this, count)};
        selectList.id = "type_row" + count;
        selectList.className = "newSelect";

        var questionTitle = document.createElement("textarea");
        questionTitle.className = "questionTitle";
        questionTitle.value = data[i].title;
        questionTitle.id = "title_row" + count;

        var questionPoints = document.createElement("textarea");
        questionPoints.className = "questionTitle";
        questionPoints.value = data[i].points;
        questionPoints.id = "points_row" + count;

        var questionInstr = document.createElement("textarea");
        questionInstr.className = "questionTitle";
        questionInstr.style.height = "2em";
        questionInstr.value = data[i].comp[0][1];
        questionInstr.id = "instr_row" + count;
        questionInstr.addEventListener('keydown', autosize);

        var th5 = document.createElement("p");
        th5.id = "5th" + count;
        th5.appendChild(document.createTextNode("Please input the content of this question"));
        if(data[i].comp[1][0] == "fileUpload" || data[i].comp[1][0] == "FillIn" || data[i].comp[1][0] == "Essay") {
            th5.style.display = "none";
        } else {
            th5.style.display = "block";
        }
        th5.className = "th5";

        var multiChoices = Util.span("", "", "multiChoices" + count);
        console.log(multiChoices.id);

        var questionCont1 = document.createElement("textarea");
        questionCont1.id = "1cont_row" + count;
        questionCont1.className = "multiChoice";

        var questionCont2 = document.createElement("textarea");
        questionCont2.placeholder = "Second Choice";
        questionCont2.id = "2cont_row" + count;
        questionCont2.className = "multiChoice";

        var questionCont3 = document.createElement("textarea");
        questionCont3.placeholder = "Third Choice";
        questionCont3.id = "3cont_row" + count;
        questionCont3.className = "multiChoice";

        var questionCont4 = document.createElement("textarea");
        questionCont4.placeholder = "Forth Choice";
        questionCont4.id = "4cont_row" + count;
        questionCont4.className = "multiChoice";

        multiChoices.appendChild(questionCont1);
        multiChoices.appendChild(questionCont2);
        multiChoices.appendChild(questionCont3);
        multiChoices.appendChild(questionCont4);

        if(data[i].comp[1][0] == "MC" || data[i].comp[1][0] == "MCS" || data[i].comp[1][0] == "MCDrop") {
            multiChoices.style.display = "block";
            questionCont1.value = data[i].comp[1][1][0];
            questionCont2.value = data[i].comp[1][1][1];
            questionCont3.value = data[i].comp[1][1][2];
            questionCont4.value = data[i].comp[1][1][3];
        } else {
            multiChoices.style.display = "none";
        }

        var numbersSet = document.createElement("textarea");
        numbersSet.placeholder = "Please input the number of places";
        numbersSet.id = "numbersSet" + count;
        if(data[i].comp[1][0] == "Numbers") {
            numbersSet.style.display = "block";
            numbersSet.value = data[i].comp[1][1];
        } else {
            numbersSet.style.display = "none";
        }
        numbersSet.className = "multiChoice";

        var gridSet = document.createElement("textarea");
        gridSet.placeholder = "Please input the number of grids";
        gridSet.id = "gridSet" + count;
        if(data[i].comp[1][0] == "Grid") {
            gridSet.style.display = "block";
            gridSet.value = data[i].comp[1][1];
        } else {
            gridSet.style.display = "none";
        }
        gridSet.className = "multiChoice";

        var matrixRSet = document.createElement("textarea");
        matrixRSet.placeholder = "Please input how many rows are there in the matrix";
        matrixRSet.id = "matrixRSet" + count;
        if(data[i].comp[1][0] == "Matrix") {
            matrixRSet.style.display = "block";
            matrixRSet.value = data[i].comp[1][1];
        } else {
            matrixRSet.style.display = "none";
        }
        matrixRSet.className = "multiChoice";

        var matrixCSet = document.createElement("textarea");
            matrixCSet.placeholder = "Please input how many columns are there in the matrix";
            matrixCSet.id = "matrixCSet" + count;
        if(data[i].comp[1][0] == "Matrix") {
            matrixCSet.style.display = "block";
            matrixCSet.value = data[i].comp[1][2];
        } else {
            matrixCSet.style.display = "none";
        }
        matrixCSet.className = "multiChoice";

        var clozeSet = document.createElement("textarea");
        clozeSet.placeholder = "Please input the codes, use ' [] ' to represent the black you want students to fill in";
        clozeSet.id = "clozeSet" + count;
        if(data[i].comp[1][0] == "Cloze") {
            clozeSet.style.display = "block";
            clozeText = data[i].comp[1][1];
            var newClozeText = "";
            for(var t = 0; t < clozeText.length; t++) {
                if (clozeText[t] == "[]") {
                    clozeText[t] = " [] ";
                }
            }
            for(var t = 0; t < clozeText.length; t++) {
                if(clozeText[t] != " [] " && clozeText[t-1] == null && clozeText[t+1] != " [] ") {
                    newClozeText = newClozeText + clozeText[t] + "\n";
                } else if(clozeText[t] != " [] " && clozeText[t-1] == " [] " && clozeText[t+1] == null) {
                    newClozeText = newClozeText + clozeText[t];
                } else if(clozeText[t] != " [] " && clozeText[t-1] != " [] " && clozeText[t+1] == null) {
                    newClozeText = newClozeText + clozeText[t];
                } else if(clozeText[t] != " [] " && clozeText[t-1] != " [] " && clozeText[t+1] != " [] ") {
                    newClozeText = newClozeText + "\n" + clozeText[t] + "\n";
                } else if(clozeText[t] != " [] " && clozeText[t-1] != " [] " && clozeText[t+1] == " [] ") {
                    newClozeText = newClozeText + clozeText[t];
                } else if(clozeText[t] != " [] " && clozeText[t-1] == " [] " && clozeText[t+1] == " [] ") {
                    newClozeText = newClozeText + clozeText[t];
                } else if(clozeText[t] != " [] " && clozeText[t-1] == " [] " && clozeText[t+1] != " [] ") {
                    newClozeText = newClozeText + clozeText[t] + "\n";
                } else if(clozeText[t] == " [] " && clozeText[t-1] != " [] " && clozeText[t+1] != " [] ") {
                    newClozeText = newClozeText + clozeText[t];
                }
            }
            newClozeText = newClozeText.replace(/\n{2,}/g, '\n');
            clozeSet.value = newClozeText;
        } else {
            clozeSet.style.display = "none";
        }
        clozeSet.className = "inputCode";
        clozeSet.addEventListener('keydown', autosize);

        var codesSet = document.createElement("textarea");
        codesSet.placeholder = "Please input the codes";
        codesSet.id = "codesSet" + count;
        if(data[i].comp[1][0] == "Codes") {
            codesSet.style.display = "block";
            codesText = data[i].comp[1][1].replace(/<>/g, "\n");
            codesSet.value = codesText;
        } else {
            codesSet.style.display = "none";
        }
        codesSet.className = "inputCode";
        codesSet.addEventListener('keydown', autosize);

        var matchLeft = document.createElement("textarea");
        matchLeft.placeholder = "Please input the elements you want to be shown on the left of matching, using ',' to separate different elements";
        matchLeft.id = "matchLeft" + count;
        if(data[i].comp[1][0] == "Match") {
            matchLeft.style.display = "block";
            matchLeft.value = data[i].comp[1][1];
        } else {
            matchLeft.style.display = "none";
        }
        matchLeft.className = "matchChoice";
        matchLeft.addEventListener('keydown', autosize);

        var matchRight = document.createElement("textarea");
        matchRight.placeholder = "Please input the elements you want to be shown on the right of matching, using ',' to separate different elements";
        matchRight.id = "matchRight" + count;
        if(data[i].comp[1][0] == "Match") {
            matchRight.style.display = "block";
            matchRight.value = data[i].comp[1][2];
        } else {
            matchRight.style.display = "none";
        }
        matchRight.className = "matchChoice";
        matchRight.addEventListener('keydown', autosize);

        var multiSurveys = Util.span("", "", "multiSurveys" + count);
        console.log(multiChoices.id);

        var surveyCont1 = document.createElement("textarea");
        surveyCont1.placeholder = "Please input the content of the first survey";
        surveyCont1.id = "1surveyCont" + count;
        surveyCont1.className = "multiChoice";

        var surveyCont2 = document.createElement("textarea");
        surveyCont2.placeholder = "Please input the content of the second survey";
        surveyCont2.id = "2surveyCont" + count;
        surveyCont2.className = "multiChoice";

        var surveyCont3 = document.createElement("textarea");
        surveyCont3.placeholder = "Please input the content of the third survey";
        surveyCont3.id = "3surveyCont" + count;
        surveyCont3.className = "multiChoice";

        var surveyCont4 = document.createElement("textarea");
        surveyCont4.placeholder = "Please input the content of the forth survey";
        surveyCont4.id = "4surveyCont" + count;
        surveyCont4.className = "multiChoice";

        multiSurveys.appendChild(surveyCont1);
        multiSurveys.appendChild(surveyCont2);
        multiSurveys.appendChild(surveyCont3);
        multiSurveys.appendChild(surveyCont4);

        if(data[i].comp[1][0] == "Survey") {
            multiSurveys.style.display = "block";
            surveyCont1.value = data[i].comp[1][2][0];
            surveyCont2.value = data[i].comp[1][2][1];
            surveyCont3.value = data[i].comp[1][2][2];
            surveyCont4.value = data[i].comp[1][2][3];
        } else {
            multiSurveys.style.display = "none";
        }

        var surveyChoices = Util.span("", "", "surveyChoices" + count);
        console.log(multiChoices.id);

        var surveyC1 = document.createElement("textarea");
        surveyC1.placeholder = "Please input the First choice of your surveys";
        surveyC1.id = "1surveyC" + count;
        surveyC1.className = "multiChoice";

        var surveyC2 = document.createElement("textarea");
        surveyC2.placeholder = "Please input the second choice of your surveys";
        surveyC2.id = "2surveyC" + count;
        surveyC2.className = "multiChoice";

        var surveyC3 = document.createElement("textarea");
        surveyC3.placeholder = "Please input the third choice of your surveys";
        surveyC3.id = "3surveyC" + count;
        surveyC3.className = "multiChoice";

        var surveyC4 = document.createElement("textarea");
        surveyC4.placeholder = "Please input the forth choice of your surveys";
        surveyC4.id = "4surveyC" + count;
        surveyC4.className = "multiChoice";

        surveyChoices.appendChild(surveyC1);
        surveyChoices.appendChild(surveyC2);
        surveyChoices.appendChild(surveyC3);
        surveyChoices.appendChild(surveyC4);

        if(data[i].comp[1][0] == "Survey") {
            surveyChoices.style.display = "block";
            surveyC1.value = data[i].comp[1][1][0];
            surveyC2.value = data[i].comp[1][1][1];
            surveyC3.value = data[i].comp[1][1][2];
            surveyC4.value = data[i].comp[1][1][3];
        } else {
            surveyChoices.style.display = "none";
        }

        var bt1 = Util.button("Delete", function() {return function () {var row = this.parentNode; row.parentNode.removeChild(row);}}(i), "three");

        bt1.style.display = "block";

        Quest.appendChild(QuestionID);
        Quest.appendChild(questionTitle);
        Quest.appendChild(questionPoints);
        Quest.appendChild(questionInstr);
        Quest.appendChild(th1);
        Quest.appendChild(selectList);
        Quest.appendChild(th5);
        Quest.appendChild(multiChoices);
        Quest.appendChild(numbersSet);
        Quest.appendChild(gridSet);
        Quest.appendChild(matrixRSet);
        Quest.appendChild(matrixCSet);
        Quest.appendChild(clozeSet);
        Quest.appendChild(codesSet);
        Quest.appendChild(matchLeft);
        Quest.appendChild(matchRight);
        Quest.appendChild(multiSurveys);
        Quest.appendChild(surveyChoices);

        Quest.appendChild(bt1);

        s.append(Quest);
    }
}



var newQuizEditorPayLoad = [
    {
        id: "qc1000",
        title: "Addition",
        points: 10,
        comp: [
            ["Instr", "What is 2+2? ", "1"],
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
            [ "FillIn", "3"]
        ]
    },

    {
        id: "qc10022",
        title: "Fill in Numbers",
        points: 10,
        comp: [
            ["Instr", "What is 10/3? ","1"],
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
                    // "private ListNode findMiddle(ListNode head) {",
                    // "   ListNode slow = ",
                    // "[]",
                    // ";",
                    // "   ListNode fast = ",
                    // "[]",
                    // ";",
                    // "   while (fast != null && fast.next != ",
                    // "[]",
                    // ") {",
                    // "       fast = fast.next.next;",
                    // "       slow = slow.next;",
                    // "   }",
                    // "return ",
                    // "[]",
                    // ";",
                    // "}"

                    "public class A {",
                    "  public static",
                    "[]",
                    "main(String[] args) {",
                    "  System.",
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
            ["Survey", ["Agree", "Neutral", "Disagree"], [
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

    // {
    //     id: "qc1009",
    //     title: "Drag and Drop",
    //     points: 10,
    //     comp: [
    //         ["Instr", "Locate the parts of the cat ",'1'],
    //         ["DragDrop", "cat.jpg",["Ear","Eye","Nose","Tongue"], [{"left":215,"top":30}, {"left":255,"top":120},{"left":285,"top":160},{"left":285,"top":220}], 7]
    //     ]
    // },

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
    },

    {
        id: "qc1012",
        title: "File Upload",
        points: 10,
        comp: [
            ["Instr", "Please choose the file you want to upload", "1"],
            ["fileUpload", "2" ]
        ]
    }
];
