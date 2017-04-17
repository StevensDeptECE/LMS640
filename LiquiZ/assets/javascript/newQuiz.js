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

    clearElements("up2");
    var header = Util.h1("Question Editor", "h03");

    var details = Util.div("wrapper_rightside", "quizDetails");

    var quizID = document.createElement("p");
    quizID.className = "th5";
    var newQuizID = guid();
    quizID.value = newQuizID;
    quizID.appendChild(document.createTextNode("Quiz ID: " + newQuizID));
    // quizID.placeholder = "Please input the ID of the quiz";
    quizID.id = "quizID";

    var quizTitle = document.createElement("textarea");
    quizTitle.className = "questionTitle";
    quizTitle.placeholder = "Please input the title of the quiz";
    quizTitle.id = "quizTitle";

    var quizClass = document.createElement("textarea");
    quizClass.className = "questionTitle";
    quizClass.placeholder = "Which class is this quiz for";
    quizClass.id = "quizClass";

    var published = document.createElement("textarea");
    published.className = "questionTitle";
    published.placeholder = "Do you want to published this quiz (yes / no)";
    published.id = "published";

    var openDate = document.createElement("textarea");
    openDate.className = "questionTitle";
    openDate.placeholder = "Please input the open date of this quiz (mm/dd/yy)";
    openDate.id = "openDate";

    var dueDate = document.createElement("textarea");
    dueDate.className = "questionTitle";
    dueDate.placeholder = "Please input the due date of this quiz (mm/dd/yy)";
    dueDate.id = "dueDate";

    var closeDate = document.createElement("textarea");
    closeDate.className = "questionTitle";
    closeDate.placeholder = "Please input the close date of this quiz (mm/dd/yy)";
    closeDate.id = "closeDate";

    var quizTime = document.createElement("textarea");
    quizTime.className = "questionTitle";
    quizTime.placeholder = "Please input the time limit of this quiz (in minutes)";
    quizTime.id = "quizTime";

    var tryTimes = document.createElement("textarea");
    tryTimes.className = "questionTitle";
    tryTimes.placeholder = "Please input the number of tries of this quiz (1 - 5)";
    tryTimes.id = "tryTimes";

    var shuffleAnswers = document.createElement("textarea");
    shuffleAnswers.className = "questionTitle";
    shuffleAnswers.placeholder = "Do you want to shuffle the order of answers (yes / no)";
    shuffleAnswers.id = "shuffleAnswers";

    var shuffleQuestions = document.createElement("textarea");
    shuffleQuestions.className = "questionTitle";
    shuffleQuestions.placeholder = "Do you want to shuffle the order of questions (yes / no)";
    shuffleQuestions.id = "shuffleQuestions";

    var questionNum = document.createElement("textarea");
    questionNum.className = "questionTitle";
    questionNum.placeholder = "Do you want to add one questions for one time (yes / no)";
    questionNum.id = "questionNum";

    var accessCode = document.createElement("textarea");
    accessCode.className = "questionTitle";
    accessCode.placeholder = "Please input the access code of this quiz (6 digits)";
    accessCode.maxLength = 6;
    accessCode.id = "accessCode";

    details.appendChild(quizID);
    details.appendChild(quizTitle);
    details.appendChild(quizClass);
    details.appendChild(published);
    details.appendChild(openDate);
    details.appendChild(dueDate);
    details.appendChild(closeDate);
    details.appendChild(quizTime);
    details.appendChild(tryTimes);
    details.appendChild(shuffleAnswers);
    details.appendChild(shuffleQuestions);
    details.appendChild(questionNum);
    details.appendChild(accessCode);

    var back = Util.button("Back", function () {launch(quizIndex, quizIndexPayload, 'up3')}, "three");
    document.getElementById("up2").appendChild(back);
    document.getElementById("up2").appendChild(header);
    document.getElementById("up2").appendChild(details);
    var hide = Util.button("Hide", function () {hideDetail()}, "three");
    document.getElementById("up2").appendChild(hide);

    clearElements("up3");
    var newDiv = Util.div("wrapper_rightside", "Container");
    // var count = Math.floor((Math.random() * 10000) + 1);

    var count = guid();
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
    var choices = ["-- select question type --", "Multi Choice", "Multi Choice Select", "Fill in", "Numbers", "Cloze", "Codes", "Grid", "Survey", "Matrix", "Multi Choice drop", "Drag and Drop", "Matching", "Essay", "File Upload"];
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
    questionTitle.className = "questionTitle";
    questionTitle.placeholder = "Please input the title of the question";
    questionTitle.id = "title_row" + count;

    var questionPoints = document.createElement("textarea");
    questionPoints.className = "questionTitle";
    questionPoints.placeholder = "Please input the point of the question";
    questionPoints.id = "points_row" + count;

    var questionInstr = document.createElement("textarea");
    questionInstr.className = "questionTitle";
    questionInstr.placeholder = "Please input the instruction of the question";
    questionInstr.id = "instr_row" + count;
    questionInstr.addEventListener('keydown', autosize);

    var th5 = document.createElement("p");
    th5.id = "5th" + count;
    th5.appendChild(document.createTextNode("Please input the content of this question"));
    th5.style.display = "none";
    th5.className = "th5";

    var multiChoices = Util.span("", "", "multiChoices" + count);
    console.log(multiChoices.id);
    multiChoices.style.display = "none";

    var questionCont1 = document.createElement("textarea");
    questionCont1.placeholder = "First Choice";
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

    var numbersSet = document.createElement("textarea");
    numbersSet.placeholder = "Please input the number of places";
    numbersSet.id = "numbersSet" + count;
    numbersSet.style.display = "none";
    numbersSet.className = "multiChoice";

    var gridSet = document.createElement("textarea");
    gridSet.placeholder = "Please input the number of grids";
    gridSet.id = "gridSet" + count;
    gridSet.style.display = "none";
    gridSet.className = "multiChoice";

    var matrixRSet = document.createElement("textarea");
    matrixRSet.placeholder = "Please input how many rows are there in the matrix";
    matrixRSet.id = "matrixRSet" + count;
    matrixRSet.style.display = "none";
    matrixRSet.className = "multiChoice";
    var matrixCSet = document.createElement("textarea");
    matrixCSet.placeholder = "Please input how many columns are there in the matrix";
    matrixCSet.id = "matrixCSet" + count;
    matrixCSet.style.display = "none";
    matrixCSet.className = "multiChoice";

    var clozeSet = document.createElement("textarea");
    clozeSet.placeholder = "Please input the codes, use ' [] ' to represent the black you want students to fill in";
    clozeSet.id = "clozeSet" + count;
    clozeSet.style.display = "none";
    clozeSet.className = "inputCode";
    clozeSet.addEventListener('keydown', autosize);

    var codesSet = document.createElement("textarea");
    codesSet.placeholder = "Please input the codes";
    codesSet.id = "codesSet" + count;
    codesSet.style.display = "none";
    codesSet.className = "inputCode";
    codesSet.addEventListener('keydown', autosize);

    var matchLeft = document.createElement("textarea");
    matchLeft.placeholder = "Please input the elements you want to be shown on the left of matching, using ',' to separate different elements";
    matchLeft.id = "matchLeft" + count;
    matchLeft.style.display = "none";
    matchLeft.className = "matchChoice";
    matchLeft.addEventListener('keydown', autosize);

    var matchRight = document.createElement("textarea");
    matchRight.placeholder = "Please input the elements you want to be shown on the right of matching, using ',' to separate different elements";
    matchRight.id = "matchRight" + count;
    matchRight.style.display = "none";
    matchRight.className = "matchChoice";
    matchRight.addEventListener('keydown', autosize);

    var multiSurveys = Util.span("", "", "multiSurveys" + count);
    console.log(multiChoices.id);
    multiSurveys.style.display = "none";

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

    var surveyChoices = Util.span("", "", "surveyChoices" + count);
    console.log(multiChoices.id);
    surveyChoices.style.display = "none";
    surveyChoices.className = "SurveyChoice";

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

    var dragAndDrop = document.createElement("span");
    var imgUpload = document.createElement("input");
    imgUpload.type = "file";
    imgUpload.accept = "image/*";
    dragAndDrop.id = "dragDropSet" + count;
    dragAndDrop.style.display = "none";
    dragAndDrop.className = "multiChoice";
    imgUpload.onchange = function() {readURL(this, count)};
    var image = document.createElement("img");
    image.id = "blah" + count;
    image.src = "#";
    image.alt = "image";
    image.style.display = "none";
    dragAndDrop.appendChild(imgUpload);
    dragAndDrop.appendChild(image);

    var bt1 = Util.button("Delete", function () {remove_question(count)}, "three");
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
    Quest.appendChild(dragAndDrop);

    Quest.appendChild(bt1);
    newDiv.appendChild(Quest);

    var bt11 = Util.button("Add Question", function () {create_question()}, "three");
    var save = Util.button("Save Quiz",function () {detailsToJson(quizDetails); tableToJson4(Container); window.location.reload(false);},"three");

    s.appendChild(newDiv);
    s.appendChild(bt11);
    s.appendChild(save);
};


function create_question() {
    var quests = document.getElementById("Container");
    // var count = Math.floor((Math.random() * 10000) + 1);

    var count = guid();
    countList.push(count);
    console.log(countList);

    var Quest= Util.div("wrapper_rightside");
    Quest.id = "row" + count;
    Quest.className = 'qc';

    var QuestionID = document.createElement("p");
    QuestionID.appendChild(document.createTextNode("NO." + count));
    QuestionID.value = "NO." + count;
    QuestionID.id = "QuestionID" + count;
    QuestionID.className = "th5";

    var th1 = document.createElement("p");
    th1.appendChild(document.createTextNode("Please select the type of the question below"));
    th1.className = "th5";

    var selectList = document.createElement("select");
    var choices = ["-- select question type --", "Multi Choice", "Multi Choice Select", "Fill in", "Numbers", "Cloze", "Codes", "Grid", "Survey", "Matrix", "Multi Choice drop", "Drag and Drop", "Matching", "Essay", "File Upload"];
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
    questionTitle.className = "questionTitle";
    questionTitle.placeholder = "Please input the title of the question";
    questionTitle.id = "title_row" + count;

    var questionPoints = document.createElement("textarea");
    questionPoints.className = "questionTitle";
    questionPoints.placeholder = "Please input the point of the question";
    questionPoints.id = "points_row" + count;

    var questionInstr = document.createElement("textarea");
    questionInstr.className = "questionTitle";
    questionInstr.placeholder = "Please input the instruction of the question";
    questionInstr.id = "instr_row" + count;
    questionInstr.addEventListener('keydown', autosize);

    var th5 = document.createElement("p");
    th5.id = "5th" + count;
    th5.appendChild(document.createTextNode("Please input the content of this question"));
    th5.style.display = "none";
    th5.className = "th5";

    var multiChoices = Util.span("", "", "multiChoices" + count);
    console.log(multiChoices.id);
    multiChoices.style.display = "none";

    var questionCont1 = document.createElement("textarea");
    questionCont1.placeholder = "First Choice";
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

    var numbersSet = document.createElement("textarea");
    numbersSet.placeholder = "Please input the number of places";
    numbersSet.id = "numbersSet" + count;
    numbersSet.style.display = "none";
    numbersSet.className = "multiChoice";

    var gridSet = document.createElement("textarea");
    gridSet.placeholder = "Please input the number of grids";
    gridSet.id = "gridSet" + count;
    gridSet.style.display = "none";
    gridSet.className = "multiChoice";

    var matrixRSet = document.createElement("textarea");
    matrixRSet.placeholder = "Please input how many rows are there in the matrix";
    matrixRSet.id = "matrixRSet" + count;
    matrixRSet.style.display = "none";
    matrixRSet.className = "multiChoice";
    var matrixCSet = document.createElement("textarea");
    matrixCSet.placeholder = "Please input how many columns are there in the matrix";
    matrixCSet.id = "matrixCSet" + count;
    matrixCSet.style.display = "none";
    matrixCSet.className = "multiChoice";

    var clozeSet = document.createElement("textarea");
    clozeSet.placeholder = "Please input the codes, use ' [] ' to represent the black you want students to fill in";
    clozeSet.id = "clozeSet" + count;
    clozeSet.style.display = "none";
    clozeSet.className = "inputCode";
    clozeSet.addEventListener('keydown', autosize);

    var codesSet = document.createElement("textarea");
    codesSet.placeholder = "Please input the codes";
    codesSet.id = "codesSet" + count;
    codesSet.style.display = "none";
    codesSet.className = "inputCode";
    codesSet.addEventListener('keydown', autosize);

    var matchLeft = document.createElement("textarea");
    matchLeft.placeholder = "Please input the elements you want to be shown on the left of matching, using ',' to separate different elements";
    matchLeft.id = "matchLeft" + count;
    matchLeft.style.display = "none";
    matchLeft.className = "matchChoice";
    matchLeft.addEventListener('keydown', autosize);

    var matchRight = document.createElement("textarea");
    matchRight.placeholder = "Please input the elements you want to be shown on the right of matching, using ',' to separate different elements";
    matchRight.id = "matchRight" + count;
    matchRight.style.display = "none";
    matchRight.className = "matchChoice";
    matchRight.addEventListener('keydown', autosize);

    var multiSurveys = Util.span("", "", "multiSurveys" + count);
    console.log(multiChoices.id);
    multiSurveys.style.display = "none";

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

    var surveyChoices = Util.span("", "", "surveyChoices" + count);
    console.log(multiChoices.id);
    surveyChoices.style.display = "none";
    surveyChoices.className = "SurveyChoice";

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

    var dragAndDrop = document.createElement("span");
    var imgUpload = document.createElement("input");
    imgUpload.type = "file";
    imgUpload.accept = "image/*"
    dragAndDrop.id = "dragDropSet" + count;
    dragAndDrop.style.display = "none";
    dragAndDrop.className = "multiChoice";
    imgUpload.onchange = function() {readURL(this, count)};
    var image = document.createElement("img");
    image.id = "blah" + count;
    image.src = "#";
    image.alt = "image";
    image.style.display = "none";
    dragAndDrop.appendChild(imgUpload);
    dragAndDrop.appendChild(image);


    var bt1 = Util.button("Delete", function () {remove_question(count)}, "three");
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
    Quest.appendChild(dragAndDrop);

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
        document.getElementById('5th' + no).style.display = 'block';
        document.getElementById('multiChoices' + no).style.display = 'block';
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
        document.getElementById('5th' + no).style.display = 'block';
        document.getElementById('multiChoices' + no).style.display = 'none';
        document.getElementById('numbersSet' + no).style.display = 'block';
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
        document.getElementById('5th' + no).style.display = 'block';
        document.getElementById('multiChoices' + no).style.display = 'none';
        document.getElementById('numbersSet' + no).style.display = 'none';
        document.getElementById('gridSet' + no).style.display = 'block';
        document.getElementById('matrixRSet' + no).style.display = 'none';
        document.getElementById('matrixCSet' + no).style.display = 'none';
        document.getElementById('clozeSet' + no).style.display = 'none';
        document.getElementById('codesSet' + no).style.display = 'none';
        document.getElementById('matchLeft' + no).style.display = 'none';
        document.getElementById('matchRight' + no).style.display = 'none';
        document.getElementById('multiSurveys' + no).style.display = 'none';
        document.getElementById('surveyChoices' + no).style.display = 'none';

    }else if(loc.value == "Cloze") {
        document.getElementById('5th' + no).style.display = 'block';
        document.getElementById('multiChoices' + no).style.display = 'none';
        document.getElementById('numbersSet' + no).style.display = 'none';
        document.getElementById('gridSet' + no).style.display = 'none';
        document.getElementById('matrixRSet' + no).style.display = 'none';
        document.getElementById('matrixCSet' + no).style.display = 'none';
        document.getElementById('clozeSet' + no).style.display = 'block';
        document.getElementById('codesSet' + no).style.display = 'none';
        document.getElementById('matchLeft' + no).style.display = 'none';
        document.getElementById('matchRight' + no).style.display = 'none';
        document.getElementById('multiSurveys' + no).style.display = 'none';
        document.getElementById('surveyChoices' + no).style.display = 'none';

    }else if(loc.value == "Codes") {
        document.getElementById('5th' + no).style.display = 'block';
        document.getElementById('multiChoices' + no).style.display = 'none';
        document.getElementById('numbersSet' + no).style.display = 'none';
        document.getElementById('gridSet' + no).style.display = 'none';
        document.getElementById('matrixRSet' + no).style.display = 'none';
        document.getElementById('matrixCSet' + no).style.display = 'none';
        document.getElementById('clozeSet' + no).style.display = 'none';
        document.getElementById('codesSet' + no).style.display = 'block';
        document.getElementById('matchLeft' + no).style.display = 'none';
        document.getElementById('matchRight' + no).style.display = 'none';
        document.getElementById('multiSurveys' + no).style.display = 'none';
        document.getElementById('surveyChoices' + no).style.display = 'none';

    }else if(loc.value == "Matching") {
        document.getElementById('5th' + no).style.display = 'block';
        document.getElementById('multiChoices' + no).style.display = 'none';
        document.getElementById('numbersSet' + no).style.display = 'none';
        document.getElementById('gridSet' + no).style.display = 'none';
        document.getElementById('matrixRSet' + no).style.display = 'none';
        document.getElementById('matrixCSet' + no).style.display = 'none';
        document.getElementById('clozeSet' + no).style.display = 'none';
        document.getElementById('codesSet' + no).style.display = 'none';
        document.getElementById('matchLeft' + no).style.display = 'block';
        document.getElementById('matchRight' + no).style.display = 'block';
        document.getElementById('multiSurveys' + no).style.display = 'none';
        document.getElementById('surveyChoices' + no).style.display = 'none';

    } else if(loc.value == "Fill in" || loc.value == "Essay" || loc.value == "File Upload") {
        document.getElementById('5th' + no).style.display = 'none';
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
        document.getElementById('5th' + no).style.display = 'block';
        document.getElementById('multiChoices' + no).style.display = 'none';
        document.getElementById('numbersSet' + no).style.display = 'none';
        document.getElementById('gridSet' + no).style.display = 'none';
        document.getElementById('matrixRSet' + no).style.display = 'block';
        document.getElementById('matrixCSet' + no).style.display = 'block';
        document.getElementById('clozeSet' + no).style.display = 'none';
        document.getElementById('codesSet' + no).style.display = 'none';
        document.getElementById('matchLeft' + no).style.display = 'none';
        document.getElementById('matchRight' + no).style.display = 'none';
        document.getElementById('multiSurveys' + no).style.display = 'none';
        document.getElementById('surveyChoices' + no).style.display = 'none';

    }else if(loc.value == "Survey") {
        document.getElementById('5th' + no).style.display = 'block';
        document.getElementById('multiChoices' + no).style.display = 'none';
        document.getElementById('numbersSet' + no).style.display = 'none';
        document.getElementById('gridSet' + no).style.display = 'none';
        document.getElementById('matrixRSet' + no).style.display = 'none';
        document.getElementById('matrixCSet' + no).style.display = 'none';
        document.getElementById('clozeSet' + no).style.display = 'none';
        document.getElementById('codesSet' + no).style.display = 'none';
        document.getElementById('matchLeft' + no).style.display = 'none';
        document.getElementById('matchRight' + no).style.display = 'none';
        document.getElementById('multiSurveys' + no).style.display = 'block';
        document.getElementById('surveyChoices' + no).style.display = 'block';

    }else if(loc.value == "Drag and Drop") {
        document.getElementById('5th' + no).style.display = 'block';
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
        document.getElementById('dragDropSet' + no).style.display = 'block';

    }
}

function tableToJson4(Divs) {
    var datas = []; // first row needs to be headers
    var headers = ["id", "title", "points", "comp"];
    var addOn = "1";
    console.log(Divs.getElementsByTagName('div').length);
    for (var j = 1; j <= Divs.getElementsByTagName('div').length; j++) {

        var i = countList[j - 1];

        var rowData = {};
        rowData[headers[0]] = document.getElementById("QuestionID" + i).value;
        rowData[headers[1]] = document.getElementById("title_row" + i).value;
        rowData[headers[2]] = document.getElementById("points_row" + i).value;

        var instr = [];
        instr.push("Instr");
        instr.push(document.getElementById("instr_row" + i).value);
        instr.push(addOn);

        var eqn = [""];

        var operFinal = [];
        if(document.getElementById("type_row"+i).value == "Drag and Drop"){
            operFinal.push("DragDrop");
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
            operFinal.push("FillIn");
            operFinal.push(addOn);
        }else if(document.getElementById("type_row"+i).value == "File Upload"){
            operFinal.push("fileUpload");
            operFinal.push(addOn);
        }else if(document.getElementById("type_row"+i).value == "Numbers"){
            operFinal.push("Numbers");
            operCont2 = "[" + document.getElementById("numbersSet"+i).value + "]";
            operFinal.push(operCont2);
            operFinal.push(addOn);
        }else if(document.getElementById("type_row"+i).value == "Cloze"){
            operFinal.push("Cloze");
            var newOperCont2 = document.getElementById("clozeSet"+i).value;
            newOperCont2 = newOperCont2.replace(/,/g, "\,");
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
        rowData[headers[3]] = comps;
        datas.push(rowData);
        console.log(datas);
    }
    sessionStorage.setItem("mytext", JSON.stringify(datas));
}

function detailsToJson(Divs) {
    // var datas = []; // first row needs to be headers\
    var headers = ["quizID", "quizTitle", "quizClass", "published", "openDate", "dueDate", "closeDate", "quizTime", "tryTimes", "shuffleAnswers", "shuffleQuestions", "questionNum", "accessCode"];
    console.log(Divs.getElementsByTagName('textarea').length);
    for (var j = 1; j <= Divs.getElementsByTagName('textarea').length; j++) {
        var detailData = {};
        detailData[headers[0]] = document.getElementById("quizID").value;
        detailData[headers[1]] = document.getElementById("quizTitle").value;
        detailData[headers[2]] = document.getElementById("quizClass").value;
        detailData[headers[3]] = document.getElementById("published").value;
        detailData[headers[4]] = document.getElementById("openDate").value;
        detailData[headers[5]] = document.getElementById("dueDate").value;
        detailData[headers[6]] = document.getElementById("closeDate").value;
        detailData[headers[7]] = document.getElementById("quizTime").value;
        detailData[headers[8]] = document.getElementById("tryTimes").value;
        detailData[headers[9]] = document.getElementById("shuffleAnswers").value;
        detailData[headers[10]] = document.getElementById("shuffleQuestions").value;
        detailData[headers[11]] = document.getElementById("questionNum").value;
        detailData[headers[12]] = document.getElementById("accessCode").value;
    }
    // datas.push(detailData);

    sessionStorage.setItem("quizDetails", JSON.stringify(detailData));
}


function hideDetail() {
    var x = document.getElementById('quizDetails');
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}

function autosize(){
    var el = this;
    setTimeout(function(){
        // el.style.cssText = 'height:300px; padding:0';
        // for box-sizing other than "content-box" use:
        el.style.cssText = '-moz-box-sizing:content-box';
        el.style.cssText = 'height:' + el.scrollHeight + 'px';
    },0);
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

/*function for displaying a preview of an image for drag and drop*/
function readURL(input, count) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#blah' + count)
                        .attr('src', e.target.result)
                        .width(150)
                        .height(200)
                        .css("display", "block");
                };

                reader.readAsDataURL(input.files[0]);

            }
}



