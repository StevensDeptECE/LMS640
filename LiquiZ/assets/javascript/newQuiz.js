/**
 * Created by yucheng on 3/29/17.
 */

function newQuiz(payload){
    this.payload = payload;
    //s=document.getElementById("quizList");
    //drawTable(s,data);
}

var countList = [];

newQuiz.prototype.draw = function(s) {
    var header = Util.h1("Question Editor", "h03");
    clearElements("up2");
    document.getElementById("up2").appendChild(header);
    clearElements("up3");
    var newDiv = Util.div("wrapper_rightside", "newQuiz");
    newDiv.id = "Container";

    var count = Math.floor((Math.random() * 10000) + 1);
    countList.push(count);
    console.log(countList);

    var Quest= Util.div("wrapper_rightside");
    Quest.id = "row" + count;
    Quest.className = 'qc';

    var th1 = document.createElement("p");
    th1.appendChild(document.createTextNode("Please select the type of the question below"));

    var selectList = document.createElement("select");
    var choices = ["-- select question type --", "Multi Choice", "Multi Choice Select", "Fill in", "Numbers", "Cloze", "Codes", "Grid", "Survey", "Matrix", "Multi Choice drop", "Drag and Drop", "Matching", "Essay"];
    for(var i = 0; i < choices.length; i++) {
        var option = document.createElement('option');
        if(i == 0) {
            option.selected = true;
            option.disabled = true;
        }
        option.value = choices[i];
        option.text = choices[i];
        selectList.appendChild(option);
    }
    selectList.onchange = function() {createClickHandler3(this,count)};
    selectList.id = "type_row" + count;
    selectList.className = "newSelect";

    var questionTitle = document.createElement("textarea");
    questionTitle.className = "questionCont";
    questionTitle.placeholder = "Please input the title of the question";
    questionTitle.id = "title_row" + count;

    var questionInstr = document.createElement("textarea");
    questionInstr.className = "questionCont";
    questionInstr.placeholder = "Please input the instruction of the question";
    questionInstr.id = "instr_row" + count;

    var th5 = document.createElement("p");
    th5.appendChild(document.createTextNode("Please input the content of this question after you select the question type above"));

    var multiChoices = Util.span("", "wrapper_rightside", "multiChoices" + count);
    console.log(multiChoices.id);
    multiChoices.style.display = "none";

    var questionCont1 = document.createElement("textarea");
    questionCont1.className = "questionCont";
    questionCont1.placeholder = "first choice";
    questionCont1.id = "1cont_row" + count;

    var questionCont2 = document.createElement("textarea");
    questionCont2.className = "questionCont";
    questionCont2.placeholder = "Second Choice";
    questionCont2.id = "2cont_row" + count;

    var questionCont3 = document.createElement("textarea");
    questionCont3.className = "questionCont";
    questionCont3.placeholder = "Third Choice";
    questionCont3.id = "3cont_row" + count;

    var questionCont4 = document.createElement("textarea");
    questionCont4.className = "questionCont";
    questionCont4.placeholder = "Forth Choice";
    questionCont4.id = "4cont_row" + count;

    multiChoices.appendChild(questionCont1);
    multiChoices.appendChild(questionCont2);
    multiChoices.appendChild(questionCont3);
    multiChoices.appendChild(questionCont4);

    var numbersSet = document.createElement("textarea");
    numbersSet.className = "questionCont";
    numbersSet.placeholder = "Please input the number of places";
    numbersSet.id = "numbersSet" + count;
    numbersSet.style.display = "none";

    var gridSet = document.createElement("textarea");
    gridSet.className = "questionCont";
    gridSet.placeholder = "Please input the number of grids";
    gridSet.id = "gridSet" + count;
    gridSet.style.display = "none";

    var matrixRSet = document.createElement("textarea");
    matrixRSet.className = "questionCont";
    matrixRSet.placeholder = "Please input how many rows are there in the matrix";
    matrixRSet.id = "matrixRSet" + count;
    matrixRSet.style.display = "none";
    var matrixCSet = document.createElement("textarea");
    matrixCSet.className = "questionCont";
    matrixCSet.placeholder = "Please input how many columns are there in the matrix";
    matrixCSet.id = "matrixCSet" + count;
    matrixCSet.style.display = "none";

    var clozeSet = document.createElement("textarea");
    clozeSet.className = "questionCont";
    clozeSet.placeholder = "Please input the codes, use ' [] ' to represent the black you want students to fill in";
    clozeSet.id = "clozeSet" + count;
    clozeSet.style.display = "none";

    var codesSet = document.createElement("textarea");
    codesSet.className = "questionCont";
    codesSet.placeholder = "Please input the codes";
    codesSet.id = "codesSet" + count;
    codesSet.style.display = "none";

    var matchLeft = document.createElement("textarea");
    matchLeft.className = "questionCont";
    matchLeft.placeholder = "Please input the elements you want to be shown on the left of matching, using ',' to separate different elements";
    matchLeft.id = "matchLeft" + count;
    matchLeft.style.display = "none";
    var matchRight = document.createElement("textarea");
    matchRight.className = "questionCont";
    matchRight.placeholder = "Please input the elements you want to be shown on the right of matching, using ',' to separate different elements";
    matchRight.id = "matchRight" + count;
    matchRight.style.display = "none";

    var multiSurveys = Util.span("", "wrapper_rightside", "multiSurveys" + count);
    console.log(multiChoices.id);
    multiSurveys.style.display = "none";

    var surveyCont1 = document.createElement("textarea");
    surveyCont1.className = "questionCont";
    surveyCont1.placeholder = "Please input the content of the first survey";
    surveyCont1.id = "1surveyCont" + count;

    var surveyCont2 = document.createElement("textarea");
    surveyCont2.className = "questionCont";
    surveyCont2.placeholder = "Please input the content of the second survey";
    surveyCont2.id = "2surveyCont" + count;

    var surveyCont3 = document.createElement("textarea");
    surveyCont3.className = "questionCont";
    surveyCont3.placeholder = "Please input the content of the third survey";
    surveyCont3.id = "3surveyCont" + count;

    var surveyCont4 = document.createElement("textarea");
    surveyCont4.className = "questionCont";
    surveyCont4.placeholder = "Please input the content of the forth survey";
    surveyCont4.id = "4surveyCont" + count;

    multiSurveys.appendChild(surveyCont1);
    multiSurveys.appendChild(surveyCont2);
    multiSurveys.appendChild(surveyCont3);
    multiSurveys.appendChild(surveyCont4);

    var surveyChoices = Util.span("", "wrapper_rightside", "surveyChoices" + count);
    console.log(multiChoices.id);
    surveyChoices.style.display = "none";

    var surveyC1 = document.createElement("textarea");
    surveyC1.className = "questionCont";
    surveyC1.placeholder = "Please input the first choice of your surveys";
    surveyC1.id = "1surveyC" + count;

    var surveyC2 = document.createElement("textarea");
    surveyC2.className = "questionCont";
    surveyC2.placeholder = "Please input the second choice of your surveys";
    surveyC2.id = "2surveyC" + count;

    var surveyC3 = document.createElement("textarea");
    surveyC3.className = "questionCont";
    surveyC3.placeholder = "Please input the third choice of your surveys";
    surveyC3.id = "3surveyC" + count;

    var surveyC4 = document.createElement("textarea");
    surveyC4.className = "questionCont";
    surveyC4.placeholder = "Please input the forth choice of your surveys";
    surveyC4.id = "4surveyC" + count;

    surveyChoices.appendChild(surveyC1);
    surveyChoices.appendChild(surveyC2);
    surveyChoices.appendChild(surveyC3);
    surveyChoices.appendChild(surveyC4);

    var bt1 = Util.button("Del", function () {remove_question(count)}, "three");

    Quest.appendChild(th1);
    Quest.appendChild(selectList);
    Quest.appendChild(questionTitle);
    Quest.appendChild(questionInstr);
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

    newDiv.append(Quest);

    var bt11 = Util.button("Add", function () {create_question()}, "three");

    var save = Util.button("Save Quiz",function () {tableToJson4(Container); window.location.reload(false);},"three");

    s.appendChild(newDiv);
    s.appendChild(bt11);
    s.appendChild(save);
};


function create_question() {
    var quests = document.getElementById("Container");
    var count = Math.floor((Math.random() * 10000) + 1);
    countList.push(count);
    console.log(countList);

    var Quest= Util.div("wrapper_rightside");
    Quest.id = "row" + count;
    Quest.className = 'qc';

    var th1 = document.createElement("p");
    th1.appendChild(document.createTextNode("Type" + count));

    var selectList = document.createElement("select");
    var choices = ["-- select question type --", "Multi Choice", "Multi Choice Select", "Fill in", "Numbers", "Cloze", "Codes", "Grid", "Survey", "Matrix", "Multi Choice drop", "Drag and Drop", "Matching", "Essay"];
    for(var i = 0; i < choices.length; i++) {
        var option = document.createElement('option');
        if(i == 0) {
            option.selected = true;
            option.disabled = true;
        }
        option.value = choices[i];
        option.text = choices[i];
        selectList.appendChild(option);
    }
    selectList.onchange = function() {createClickHandler3(this,count)};
    selectList.id = "type_row" + count;
    selectList.className = "newSelect";

    var questionTitle = document.createElement("textarea");
    questionTitle.className = "questionCont";
    questionTitle.placeholder = "Please input the title of the question";
    questionTitle.id = "title_row" + count;

    var questionInstr = document.createElement("textarea");
    questionInstr.className = "questionCont";
    questionInstr.placeholder = "Please input the instruction of the question";
    questionInstr.id = "instr_row" + count;

    var th5 = document.createElement("p");
    th5.appendChild(document.createTextNode("Please input the content of this question after you select the question type above"));

    var multiChoices = Util.span("", "wrapper_rightside", "multiChoices" + count);
    console.log(multiChoices.id);
    multiChoices.style.display = "none";

    var questionCont1 = document.createElement("textarea");
    questionCont1.className = "questionCont";
    questionCont1.placeholder = "first choice";
    questionCont1.id = "1cont_row" + count;

    var questionCont2 = document.createElement("textarea");
    questionCont2.className = "questionCont";
    questionCont2.placeholder = "Second Choice";
    questionCont2.id = "2cont_row" + count;

    var questionCont3 = document.createElement("textarea");
    questionCont3.className = "questionCont";
    questionCont3.placeholder = "Third Choice";
    questionCont3.id = "3cont_row" + count;

    var questionCont4 = document.createElement("textarea");
    questionCont4.className = "questionCont";
    questionCont4.placeholder = "Forth Choice";
    questionCont4.id = "4cont_row" + count;

    multiChoices.appendChild(questionCont1);
    multiChoices.appendChild(questionCont2);
    multiChoices.appendChild(questionCont3);
    multiChoices.appendChild(questionCont4);

    var numbersSet = document.createElement("textarea");
    numbersSet.className = "questionCont";
    numbersSet.placeholder = "Please input the number of places";
    numbersSet.id = "numbersSet" + count;
    numbersSet.style.display = "none";

    var gridSet = document.createElement("textarea");
    gridSet.className = "questionCont";
    gridSet.placeholder = "Please input the number of grids";
    gridSet.id = "gridSet" + count;
    gridSet.style.display = "none";

    var matrixRSet = document.createElement("textarea");
    matrixRSet.className = "questionCont";
    matrixRSet.placeholder = "Please input how many rows are there in the matrix";
    matrixRSet.id = "matrixRSet" + count;
    matrixRSet.style.display = "none";
    var matrixCSet = document.createElement("textarea");
    matrixCSet.className = "questionCont";
    matrixCSet.placeholder = "Please input how many columns are there in the matrix";
    matrixCSet.id = "matrixCSet" + count;
    matrixCSet.style.display = "none";

    var clozeSet = document.createElement("textarea");
    clozeSet.className = "questionCont";
    clozeSet.placeholder = "Please input the codes, use ' [] ' to represent the black you want students to fill in";
    clozeSet.id = "clozeSet" + count;
    clozeSet.style.display = "none";

    var codesSet = document.createElement("textarea");
    codesSet.className = "questionCont";
    codesSet.placeholder = "Please input the codes";
    codesSet.id = "codesSet" + count;
    codesSet.style.display = "none";

    var matchLeft = document.createElement("textarea");
    matchLeft.className = "questionCont";
    matchLeft.placeholder = "Please input the elements you want to be shown on the left of matching, using ',' to separate different elements";
    matchLeft.id = "matchLeft" + count;
    matchLeft.style.display = "none";
    var matchRight = document.createElement("textarea");
    matchRight.className = "questionCont";
    matchRight.placeholder = "Please input the elements you want to be shown on the right of matching, using ',' to separate different elements";
    matchRight.id = "matchRight" + count;
    matchRight.style.display = "none";

    var multiSurveys = Util.span("", "wrapper_rightside", "multiSurveys" + count);
    console.log(multiChoices.id);
    multiSurveys.style.display = "none";

    var surveyCont1 = document.createElement("textarea");
    surveyCont1.className = "questionCont";
    surveyCont1.placeholder = "Please input the content of the first survey";
    surveyCont1.id = "1surveyCont" + count;

    var surveyCont2 = document.createElement("textarea");
    surveyCont2.className = "questionCont";
    surveyCont2.placeholder = "Please input the content of the second survey";
    surveyCont2.id = "2surveyCont" + count;

    var surveyCont3 = document.createElement("textarea");
    surveyCont3.className = "questionCont";
    surveyCont3.placeholder = "Please input the content of the third survey";
    surveyCont3.id = "3surveyCont" + count;

    var surveyCont4 = document.createElement("textarea");
    surveyCont4.className = "questionCont";
    surveyCont4.placeholder = "Please input the content of the forth survey";
    surveyCont4.id = "4surveyCont" + count;

    multiSurveys.appendChild(surveyCont1);
    multiSurveys.appendChild(surveyCont2);
    multiSurveys.appendChild(surveyCont3);
    multiSurveys.appendChild(surveyCont4);

    var surveyChoices = Util.span("", "wrapper_rightside", "surveyChoices" + count);
    console.log(multiChoices.id);
    surveyChoices.style.display = "none";

    var surveyC1 = document.createElement("textarea");
    surveyC1.className = "questionCont";
    surveyC1.placeholder = "Please input the first choice of your surveys";
    surveyC1.id = "1surveyC" + count;

    var surveyC2 = document.createElement("textarea");
    surveyC2.className = "questionCont";
    surveyC2.placeholder = "Please input the second choice of your surveys";
    surveyC2.id = "2surveyC" + count;

    var surveyC3 = document.createElement("textarea");
    surveyC3.className = "questionCont";
    surveyC3.placeholder = "Please input the third choice of your surveys";
    surveyC3.id = "3surveyC" + count;

    var surveyC4 = document.createElement("textarea");
    surveyC4.className = "questionCont";
    surveyC4.placeholder = "Please input the forth choice of your surveys";
    surveyC4.id = "4surveyC" + count;

    surveyChoices.appendChild(surveyC1);
    surveyChoices.appendChild(surveyC2);
    surveyChoices.appendChild(surveyC3);
    surveyChoices.appendChild(surveyC4);

    var bt1 = Util.button("Del", function () {remove_question(count)}, "three");

    Quest.appendChild(th1);
    Quest.appendChild(selectList);
    Quest.appendChild(questionTitle);
    Quest.appendChild(questionInstr);
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

    quests.appendChild(Quest);
}

function remove_question(no) {
    console.log(no);
    document.getElementById("row" + no).outerHTML = "";
    
}

function createClickHandler3(loc,no){
    console.log(no);
    if(loc.value == "Multi Choice" || loc.value == "Multi Choice Select" || loc.value == "Multi Choice drop") {
        document.getElementById('multiChoices' + no).style.display = 'inline';
        document.getElementById('numbersSet' + no).style.display = 'none';
        document.getElementById('gridSet' + no).style.display = 'none';
        document.getElementById('matrixRSet' + no).style.display = 'none';
        document.getElementById('matrixCSet' + no).style.display = 'none';
        document.getElementById('clozeSet' + no).style.display = 'none';
        document.getElementById('codesSet' + no).style.display = 'none';
        document.getElementById('matchLeft' + no).style.display = 'none';
        document.getElementById('matchRight' + no).style.display = 'none';
        document.getElementById('multiSurveys' + no).style.display = 'none';
        document.getElementById('surveyChoices' + no).style.display = 'none';
    }else if(loc.value == "Numbers") {
        document.getElementById('multiChoices' + no).style.display = 'none';
        document.getElementById('numbersSet' + no).style.display = 'inline';
        document.getElementById('gridSet' + no).style.display = 'none';
        document.getElementById('matrixRSet' + no).style.display = 'none';
        document.getElementById('matrixCSet' + no).style.display = 'none';
        document.getElementById('clozeSet' + no).style.display = 'none';
        document.getElementById('codesSet' + no).style.display = 'none';
        document.getElementById('matchLeft' + no).style.display = 'none';
        document.getElementById('matchRight' + no).style.display = 'none';
        document.getElementById('multiSurveys' + no).style.display = 'none';
        document.getElementById('surveyChoices' + no).style.display = 'none';
    }else if(loc.value == "Grid") {
        document.getElementById('multiChoices' + no).style.display = 'none';
        document.getElementById('numbersSet' + no).style.display = 'none';
        document.getElementById('gridSet' + no).style.display = 'inline';
        document.getElementById('matrixRSet' + no).style.display = 'none';
        document.getElementById('matrixCSet' + no).style.display = 'none';
        document.getElementById('clozeSet' + no).style.display = 'none';
        document.getElementById('codesSet' + no).style.display = 'none';
        document.getElementById('matchLeft' + no).style.display = 'none';
        document.getElementById('matchRight' + no).style.display = 'none';
        document.getElementById('multiSurveys' + no).style.display = 'none';
        document.getElementById('surveyChoices' + no).style.display = 'none';

    }else if(loc.value == "Cloze") {
        document.getElementById('multiChoices' + no).style.display = 'none';
        document.getElementById('numbersSet' + no).style.display = 'none';
        document.getElementById('gridSet' + no).style.display = 'none';
        document.getElementById('matrixRSet' + no).style.display = 'none';
        document.getElementById('matrixCSet' + no).style.display = 'none';
        document.getElementById('clozeSet' + no).style.display = 'inline';
        document.getElementById('codesSet' + no).style.display = 'none';
        document.getElementById('matchLeft' + no).style.display = 'none';
        document.getElementById('matchRight' + no).style.display = 'none';
        document.getElementById('multiSurveys' + no).style.display = 'none';
        document.getElementById('surveyChoices' + no).style.display = 'none';

    }else if(loc.value == "Codes") {
        document.getElementById('multiChoices' + no).style.display = 'none';
        document.getElementById('numbersSet' + no).style.display = 'none';
        document.getElementById('gridSet' + no).style.display = 'none';
        document.getElementById('matrixRSet' + no).style.display = 'none';
        document.getElementById('matrixCSet' + no).style.display = 'none';
        document.getElementById('clozeSet' + no).style.display = 'none';
        document.getElementById('codesSet' + no).style.display = 'inline';
        document.getElementById('matchLeft' + no).style.display = 'none';
        document.getElementById('matchRight' + no).style.display = 'none';
        document.getElementById('multiSurveys' + no).style.display = 'none';
        document.getElementById('surveyChoices' + no).style.display = 'none';

    }else if(loc.value == "Matching") {
        document.getElementById('multiChoices' + no).style.display = 'none';
        document.getElementById('numbersSet' + no).style.display = 'none';
        document.getElementById('gridSet' + no).style.display = 'none';
        document.getElementById('matrixRSet' + no).style.display = 'none';
        document.getElementById('matrixCSet' + no).style.display = 'none';
        document.getElementById('clozeSet' + no).style.display = 'none';
        document.getElementById('codesSet' + no).style.display = 'none';
        document.getElementById('matchLeft' + no).style.display = 'inline';
        document.getElementById('matchRight' + no).style.display = 'inline';
        document.getElementById('multiSurveys' + no).style.display = 'none';
        document.getElementById('surveyChoices' + no).style.display = 'none';

    } else if(loc.value == "Fill in" || loc.value == "Essay") {
        document.getElementById('multiChoices' + no).style.display = 'none';
        document.getElementById('numbersSet' + no).style.display = 'none';
        document.getElementById('gridSet' + no).style.display = 'none';
        document.getElementById('matrixRSet' + no).style.display = 'none';
        document.getElementById('matrixCSet' + no).style.display = 'none';
        document.getElementById('clozeSet' + no).style.display = 'none';
        document.getElementById('codesSet' + no).style.display = 'none';
        document.getElementById('matchLeft' + no).style.display = 'none';
        document.getElementById('matchRight' + no).style.display = 'none';
        document.getElementById('multiSurveys' + no).style.display = 'none';
        document.getElementById('surveyChoices' + no).style.display = 'none';

    } else if(loc.value == "Matrix") {
        document.getElementById('multiChoices' + no).style.display = 'none';
        document.getElementById('numbersSet' + no).style.display = 'none';
        document.getElementById('gridSet' + no).style.display = 'none';
        document.getElementById('matrixRSet' + no).style.display = 'inline';
        document.getElementById('matrixCSet' + no).style.display = 'inline';
        document.getElementById('clozeSet' + no).style.display = 'none';
        document.getElementById('codesSet' + no).style.display = 'none';
        document.getElementById('matchLeft' + no).style.display = 'none';
        document.getElementById('matchRight' + no).style.display = 'none';
        document.getElementById('multiSurveys' + no).style.display = 'none';
        document.getElementById('surveyChoices' + no).style.display = 'none';

    }else if(loc.value == "Survey") {
        document.getElementById('multiChoices' + no).style.display = 'none';
        document.getElementById('numbersSet' + no).style.display = 'none';
        document.getElementById('gridSet' + no).style.display = 'none';
        document.getElementById('matrixRSet' + no).style.display = 'none';
        document.getElementById('matrixCSet' + no).style.display = 'none';
        document.getElementById('clozeSet' + no).style.display = 'none';
        document.getElementById('codesSet' + no).style.display = 'none';
        document.getElementById('matchLeft' + no).style.display = 'none';
        document.getElementById('matchRight' + no).style.display = 'none';
        document.getElementById('multiSurveys' + no).style.display = 'inline';
        document.getElementById('surveyChoices' + no).style.display = 'inline';

    }
}

function tableToJson4(Divs) {
    var datas = []; // first row needs to be headers
    var headers = ["id", "title", "comp"];
    var addOn = "1";
    console.log(Divs.getElementsByTagName('div').length);
    for (var j = 1; j <= Divs.getElementsByTagName('div').length; j++) {

        var i = countList[j - 1];

        var rowData = {};
        rowData[headers[0]] = addOn;
        rowData[headers[1]] = document.getElementById("title_row" + i).value;

        var instr = [];
        instr.push("Instr");
        instr.push(document.getElementById("instr_row" + i).value);
        instr.push(addOn);

        var eqn = [""];

        var operFinal = [];
        if(document.getElementById("type_row"+i).value == "Drag and Drop"){
            operFinal.push("dragDrop");
            operFinal.push(document.getElementById("1cont_row"+i).value);
            var operCont2 = "[" + document.getElementById("2cont_row"+i).value + "]";
            var operCont3 = "[" + document.getElementById("3cont_row"+i).value + "]";
            operFinal.push(operCont2);
            operFinal.push(operCont3);
            operFinal.push(addOn);
        }else if(document.getElementById("type_row"+i).value == "Multi Choice"){
            operFinal.push("MC");
            operCont2 = "[" + document.getElementById("1cont_row"+i).value + "," + document.getElementById("2cont_row"+i).value + "," + document.getElementById("3cont_row"+i).value + "," + document.getElementById("4cont_row"+i).value + "]";
            operFinal.push(operCont2);
            operFinal.push(addOn);
        }else if(document.getElementById("type_row"+i).value == "Multi Choice Select"){
            operFinal.push("MCS");
            operCont2 = "[" + document.getElementById("1cont_row"+i).value + "," + document.getElementById("2cont_row"+i).value + "," + document.getElementById("3cont_row"+i).value + "," + document.getElementById("4cont_row"+i).value + "]";
            operFinal.push(operCont2);
            operFinal.push(addOn);
        }else if(document.getElementById("type_row"+i).value == "Fill in"){
            operFinal.push("Fillin");
            operFinal.push(addOn);
        }else if(document.getElementById("type_row"+i).value == "Numbers"){
            operFinal.push("Numbers");
            operCont2 = "[" + document.getElementById("numbersSet"+i).value + "]";
            operFinal.push(operCont2);
            operFinal.push(addOn);
        }else if(document.getElementById("type_row"+i).value == "Cloze"){
            operFinal.push("Cloze");
            var newOperCont2 = document.getElementById("clozeSet"+i).value;
            newOperCont2 = newOperCont2.replace(/\n/g, ",");
            newOperCont2 = newOperCont2.replace(/\s\[\]\s/g,",[],");
            operCont2 = "[" + newOperCont2 + "]";
            operFinal.push(operCont2);
            operFinal.push(addOn);
        }else if(document.getElementById("type_row"+i).value == "Codes"){
            operFinal.push("Codes");
            newOperCont2 = document.getElementById("codesSet"+i).value;
            newOperCont2 = newOperCont2.replace(/\n/g, "<>");
            operCont2 = newOperCont2;
            operFinal.push(newOperCont2);
            operFinal.push(addOn);
        }else if(document.getElementById("type_row"+i).value == "Grid"){
            operFinal.push("Grid");
            operCont2 = "[" + document.getElementById("gridSet"+i).value + "]";
            operFinal.push(operCont2);
            operFinal.push(addOn);
        }else if(document.getElementById("type_row"+i).value == "Matrix"){
            operFinal.push("Matrix");
            operCont2 = document.getElementById("matrixRSet"+i).value;
            operFinal.push(operCont2);
            operCont3 = document.getElementById("matrixCSet"+i).value;
            operFinal.push(operCont3);
            operFinal.push(addOn);
        }else if(document.getElementById("type_row"+i).value == "Multi Choice drop"){
            operFinal.push("MCDrop");
            operCont2 = "[" + document.getElementById("1cont_row"+i).value + "," + document.getElementById("2cont_row"+i).value + "," + document.getElementById("3cont_row"+i).value + "," + document.getElementById("4cont_row"+i).value + "]";
            operFinal.push(operCont2);
            operFinal.push(addOn);
        }else if(document.getElementById("type_row"+i).value == "Matching"){
            operFinal.push("Match");
            operCont2 = "[" + document.getElementById("matchLeft"+i).value + "]";
            operFinal.push(operCont2);
            operCont3 = "[" + document.getElementById("matchRight"+i).value + "]";
            operFinal.push(operCont3);
            operFinal.push(addOn);
        }else if(document.getElementById("type_row"+i).value == "Essay") {
            operFinal.push("Essay");
            operFinal.push(addOn);
        }else if(document.getElementById("type_row"+i).value == "Survey") {
            operFinal.push("Survey");
            operCont2 = "[" + document.getElementById("1surveyC" + i).value;
            if(document.getElementById("2surveyC" + i).value != "") {
                operCont2 += "," + document.getElementById("2surveyC" + i).value;
            }
            if(document.getElementById("3surveyC" + i).value != "") {
                operCont2 += "," + document.getElementById("3surveyC" + i).value;
            }
            if(document.getElementById("4surveyC" + i).value != "") {
                operCont2 += "," + document.getElementById("4surveyC" + i).value;
            }
            operCont2 += "]";
            operFinal.push(operCont2);

            operCont3 = "[" + document.getElementById("1surveyCont" + i).value;
            if(document.getElementById("2surveyCont" + i).value != "") {
                operCont3 += "," + document.getElementById("2surveyCont" + i).value;
            }
            if(document.getElementById("3surveyCont" + i).value != "") {
                operCont3 += "," + document.getElementById("3surveyCont" + i).value;
            }
            if(document.getElementById("4surveyCont" + i).value != "") {
                operCont3 += "," + document.getElementById("4surveyCont" + i).value;
            }
            operCont3 += "]";
            operFinal.push(operCont3);
            operFinal.push(addOn);
        }
        var comps = [];
        comps.push(instr);
        comps.push(eqn);
        comps.push(operFinal);
        rowData[headers[2]] = comps;
        datas.push(rowData);
        console.log(datas);
    }
    sessionStorage.setItem("mytext", JSON.stringify(datas));
}















