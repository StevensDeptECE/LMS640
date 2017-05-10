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

    var details = Util.div("wrapper_rightside", "quizDetails");
    newDrawDetails(details,quizDetailPayLoad);

    clearElements("up3");
    var mainEditor = Util.div("wrapper_rightside","quizEditor");
    var newDiv = Util.div("wrapper_rightside","Container");
    newDrawEditor(newDiv,newQuizEditorPayLoad);

    var bt11 = Util.button("Add Question", function () {create_question()}, "three");
    var save = Util.button("Save Quiz",
        function () {
            detailsToJson1(quizDetails); tableToJson4(Container);
            if(sessionStorage.getItem("newQuizDetails") != null) {
                quizDetailPayLoad.shift();
                quizDetailPayLoad.push(JSON.parse(sessionStorage.getItem("newQuizDetails")));
            }
            launch(quizIndex, quizDetailPayLoad, 'up3')
        },"three");

    mainEditor.appendChild(newDiv);
    mainEditor.appendChild(bt11);
    mainEditor.appendChild(save);

    s.appendChild(mainEditor);
};

function newDrawDetails(details,data) {

    var quizID = document.createElement("p");
    quizID.className = "th5";
    var newQuizID = data[0].quizID;
    quizID.value = newQuizID;
    quizID.appendChild(document.createTextNode("Quiz ID: " + newQuizID));
    // quizID.placeholder = "Please input the ID of the quiz";
    quizID.id = "quizID";

    var editInstrTitle = document.createElement("p");
    editInstrTitle.className = "th5";
    editInstrTitle.appendChild(document.createTextNode("You could modify quiz title here"));

    var quizTitle = document.createElement("textarea");
    quizTitle.className = "questionTitle";
    quizTitle.value = data[0].quizTitle;
    quizTitle.id = "quizTitle";

    var editInstrClass = document.createElement("p");
    editInstrClass.className = "th5";
    editInstrClass.appendChild(document.createTextNode("You could modify quiz class here"));

    var quizClass = document.createElement("textarea");
    quizClass.className = "questionTitle";
    quizClass.value = data[0].quizClass;
    quizClass.id = "quizClass";

    var editInstrPublish = document.createElement("p");
    editInstrPublish.className = "th5";
    editInstrPublish.appendChild(document.createTextNode("You could modify if publish the quiz here"));
    var published = document.createElement("textarea");
    published.className = "questionTitle";
    published.value = data[0].published;
    published.id = "published";

    var editInstrOpenDate = document.createElement("p");
    editInstrOpenDate.className = "th5";
    editInstrOpenDate.appendChild(document.createTextNode("You could modify quiz open date here"));
    var openDate = document.createElement("textarea");
    openDate.className = "questionTitle";
    openDate.value = data[0].openDate;
    openDate.id = "openDate";

    var editInstrDueDate = document.createElement("p");
    editInstrDueDate.className = "th5";
    editInstrDueDate.appendChild(document.createTextNode("You could modify quiz due date here"));
    var dueDate = document.createElement("textarea");
    dueDate.className = "questionTitle";
    dueDate.value = data[0].dueDate;
    dueDate.id = "dueDate";

    var editInstrCloseDate = document.createElement("p");
    editInstrCloseDate.className = "th5";
    editInstrCloseDate.appendChild(document.createTextNode("You could modify quiz close date here"));
    var closeDate = document.createElement("textarea");
    closeDate.className = "questionTitle";
    closeDate.value = data[0].closeDate;
    closeDate.id = "closeDate";

    var editInstrTime = document.createElement("p");
    editInstrTime.className = "th5";
    editInstrTime.appendChild(document.createTextNode("You could modify quiz time here"));
    var quizTime = document.createElement("textarea");
    quizTime.className = "questionTitle";
    quizTime.value = data[0].quizTime;
    quizTime.id = "quizTime";

    var editInstrTry = document.createElement("p");
    editInstrTry.className = "th5";
    editInstrTry.appendChild(document.createTextNode("You could modify quiz try times here"));
    var tryTimes = document.createElement("textarea");
    tryTimes.className = "questionTitle";
    tryTimes.value = data[0].tryTimes;
    tryTimes.id = "tryTimes";

    var editInstrAnswer = document.createElement("p");
    editInstrAnswer.className = "th5";
    editInstrAnswer.appendChild(document.createTextNode("You could modify if shuffle your answers here"));
    var shuffleAnswers = document.createElement("textarea");
    shuffleAnswers.className = "questionTitle";
    shuffleAnswers.value = data[0].shuffleAnswers;
    shuffleAnswers.id = "shuffleAnswers";

    var editInstrQuestion = document.createElement("p");
    editInstrQuestion.className = "th5";
    editInstrQuestion.appendChild(document.createTextNode("You could modify if shuffle your questions here"));
    var shuffleQuestions = document.createElement("textarea");
    shuffleQuestions.className = "questionTitle";
    shuffleQuestions.value = data[0].shuffleQuestions;
    shuffleQuestions.id = "shuffleQuestions";

    var editInstrNum = document.createElement("p");
    editInstrNum.className = "th5";
    editInstrNum.appendChild(document.createTextNode("You could modify if only one subproblem in one question here"));
    var questionNum = document.createElement("textarea");
    questionNum.className = "questionTitle";
    questionNum.value = data[0].questionNum;
    questionNum.id = "questionNum";

    var editInstrCode = document.createElement("p");
    editInstrCode.className = "th5";
    editInstrCode.appendChild(document.createTextNode("You could modify the access code here"));
    var accessCode = document.createElement("textarea");
    accessCode.className = "questionTitle";
    accessCode.value = data[0].accessCode;
    accessCode.maxLength = 6;
    accessCode.id = "accessCode";

    details.appendChild(quizID);
    details.appendChild(editInstrTitle);
    details.appendChild(quizTitle);
    details.appendChild(editInstrClass);
    details.appendChild(quizClass);
    details.appendChild(editInstrPublish);
    details.appendChild(published);
    details.appendChild(editInstrOpenDate);
    details.appendChild(openDate);
    details.appendChild(editInstrDueDate);
    details.appendChild(dueDate);
    details.appendChild(editInstrCloseDate);
    details.appendChild(closeDate);
    details.appendChild(editInstrTime);
    details.appendChild(quizTime);
    details.appendChild(editInstrTry);
    details.appendChild(tryTimes);
    details.appendChild(editInstrAnswer);
    details.appendChild(shuffleAnswers);
    details.appendChild(editInstrQuestion);
    details.appendChild(shuffleQuestions);
    details.appendChild(editInstrNum);
    details.appendChild(questionNum);
    details.appendChild(editInstrCode);
    details.appendChild(accessCode);

    // var back = Util.button("Back", function () {launch(quizIndex, quizDetailPayLoad, 'up3')}, "three");
    // document.getElementById("up2").appendChild(back);
    document.getElementById("up2").appendChild(details);
    var hide = Util.button("Hide", function () {hideDetail()}, "three");
    document.getElementById("up2").appendChild(hide);
}

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
            } else if(data[i].comp[1][0] == "Codes" && j== 5) {
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

        var bt1 = Util.button("Delete", function() {return function () {var row = this.parentNode; row.parentNode.removeChild(row);
            var object = row.id;
            var no = object.substring(3,object.length);
            var index = countList.indexOf(no);
            if (index > -1) {
                countList.splice(index, 1);
            }}}(j), "three");


        if(data[i].comp[1][0] == "fileUpload" || data[i].comp[1][0] == "FillIn" || data[i].comp[1][0] == "Essay") {
            th5.style.display = "none";
            th5.className = "th5";

            Quest.appendChild(QuestionID);
            Quest.appendChild(questionTitle);
            Quest.appendChild(questionPoints);
            Quest.appendChild(questionInstr);
            Quest.appendChild(th1);
            Quest.appendChild(selectList);
            Quest.appendChild(th5);

            Quest.appendChild(bt1);

            s.append(Quest);
            continue;
        }

        if(data[i].comp[1][0] == "MC") {

            var multiChoices = Util.span("", "", "multiChoices" + count);
            console.log(multiChoices.id);

            var questionMC1 = document.createElement("textarea");
            questionMC1.id = "1MC_row" + count;
            questionMC1.className = "multiChoice";
            questionMC1.placeholder = "First Choice";


            var questionMC2 = document.createElement("textarea");
            questionMC2.id = "2MC_row" + count;
            questionMC2.className = "multiChoice";
            questionMC2.placeholder = "Second Choice";

            var questionMC3 = document.createElement("textarea");
            questionMC3.id = "3MC_row" + count;
            questionMC3.className = "multiChoice";
            questionMC3.placeholder = "Third Choice";

            var questionMC4 = document.createElement("textarea");
            questionMC4.id = "4MC_row" + count;
            questionMC4.className = "multiChoice";
            questionMC4.placeholder = "Forth Choice";

            // var addChoice1 = Util.button("+", function () {add_MC("multiChoices" + count)}, "four");

            var addChoice1 = Util.button("+", function () {return function() {add_MC(this.parentNode.id)}}(j), "four");

            multiChoices.appendChild(addChoice1);
            multiChoices.appendChild(questionMC1);
            multiChoices.appendChild(questionMC2);
            multiChoices.appendChild(questionMC3);
            multiChoices.appendChild(questionMC4);

            multiChoices.style.display = "block";
            questionMC1.value = data[i].comp[1][1][0];
            questionMC2.value = data[i].comp[1][1][1];
            questionMC3.value = data[i].comp[1][1][2];
            questionMC4.value = data[i].comp[1][1][3];

            Quest.appendChild(QuestionID);
            Quest.appendChild(questionTitle);
            Quest.appendChild(questionPoints);
            Quest.appendChild(questionInstr);
            Quest.appendChild(th1);
            Quest.appendChild(selectList);
            Quest.appendChild(th5);
            Quest.appendChild(multiChoices);

            Quest.appendChild(bt1);

            s.append(Quest);
            continue;
        }

        if(data[i].comp[1][0] == "MCS") {

            var multiChoicesSel = Util.span("", "", "multiChoicesSel" + count);
            console.log(multiChoicesSel.id);

            var questionMCS1 = document.createElement("textarea");
            questionMCS1.id = "1MCS_row" + count;
            questionMCS1.className = "multiChoice";
            questionMCS1.placeholder = "First Choice";

            var questionMCS2 = document.createElement("textarea");
            questionMCS2.id = "2MCS_row" + count;
            questionMCS2.className = "multiChoice";
            questionMCS2.placeholder = "Second Choice";

            var questionMCS3 = document.createElement("textarea");
            questionMCS3.id = "3MCS_row" + count;
            questionMCS3.className = "multiChoice";
            questionMCS3.placeholder = "Third Choice";

            var questionMCS4 = document.createElement("textarea");
            questionMCS4.id = "4MCS_row" + count;
            questionMCS4.className = "multiChoice";
            questionMCS4.placeholder = "Forth Choice";

            var addChoice2 = Util.button("+", function () {return function() {add_MCS(this.parentNode.id)}}(j), "four");

            multiChoicesSel.appendChild(addChoice2);
            multiChoicesSel.appendChild(questionMCS1);
            multiChoicesSel.appendChild(questionMCS2);
            multiChoicesSel.appendChild(questionMCS3);
            multiChoicesSel.appendChild(questionMCS4);

            multiChoicesSel.style.display = "block";
            questionMCS1.value = data[i].comp[1][1][0];
            questionMCS2.value = data[i].comp[1][1][1];
            questionMCS3.value = data[i].comp[1][1][2];
            questionMCS4.value = data[i].comp[1][1][3];

            Quest.appendChild(QuestionID);
            Quest.appendChild(questionTitle);
            Quest.appendChild(questionPoints);
            Quest.appendChild(questionInstr);
            Quest.appendChild(th1);
            Quest.appendChild(selectList);
            Quest.appendChild(th5);
            Quest.appendChild(multiChoicesSel);

            Quest.appendChild(bt1);

            s.append(Quest);
            continue;
        }

        if(data[i].comp[1][0] == "MCDrop") {

            var multiChoicesDrop = Util.span("", "", "multiChoicesDrop" + count);
            console.log(multiChoicesDrop.id);

            var questionMCD1 = document.createElement("textarea");
            questionMCD1.id = "1MCD_row" + count;
            questionMCD1.className = "multiChoice";
            questionMCD1.placeholder = "First Choice";

            var questionMCD2 = document.createElement("textarea");
            questionMCD2.id = "2MCD_row" + count;
            questionMCD2.className = "multiChoice";
            questionMCD2.placeholder = "Second Choice";

            var questionMCD3 = document.createElement("textarea");
            questionMCD3.id = "3MCD_row" + count;
            questionMCD3.className = "multiChoice";
            questionMCD3.placeholder = "Third Choice";

            var questionMCD4 = document.createElement("textarea");
            questionMCD4.id = "4MCD_row" + count;
            questionMCD4.className = "multiChoice";
            questionMCD4.placeholder = "Forth Choice";

            var addChoice3 = Util.button("+", function () {return function() {add_MCD(this.parentNode.id)}}(j), "four");

            multiChoicesDrop.appendChild(addChoice3);
            multiChoicesDrop.appendChild(questionMCD1);
            multiChoicesDrop.appendChild(questionMCD2);
            multiChoicesDrop.appendChild(questionMCD3);
            multiChoicesDrop.appendChild(questionMCD4);

            multiChoicesDrop.style.display = "block";
            questionMCD1.value = data[i].comp[1][1][0];
            questionMCD2.value = data[i].comp[1][1][1];
            questionMCD3.value = data[i].comp[1][1][2];
            questionMCD4.value = data[i].comp[1][1][3];

            Quest.appendChild(QuestionID);
            Quest.appendChild(questionTitle);
            Quest.appendChild(questionPoints);
            Quest.appendChild(questionInstr);
            Quest.appendChild(th1);
            Quest.appendChild(selectList);
            Quest.appendChild(th5);
            Quest.appendChild(multiChoicesDrop);

            Quest.appendChild(bt1);

            s.append(Quest);
            continue;
        }

        if(data[i].comp[1][0] == "Numbers") {
            var numbersSet = document.createElement("textarea");
            numbersSet.placeholder = "Please input the number of places";
            numbersSet.id = "numbersSet" + count;
            numbersSet.style.display = "block";
            numbersSet.value = data[i].comp[1][1];
            numbersSet.className = "multiChoice";

            Quest.appendChild(QuestionID);
            Quest.appendChild(questionTitle);
            Quest.appendChild(questionPoints);
            Quest.appendChild(questionInstr);
            Quest.appendChild(th1);
            Quest.appendChild(selectList);
            Quest.appendChild(th5);
            Quest.appendChild(numbersSet);

            Quest.appendChild(bt1);

            s.append(Quest);
            continue;
        }

        if(data[i].comp[1][0] == "Grid") {
            var gridSet = document.createElement("textarea");
            gridSet.placeholder = "Please input the number of grids";
            gridSet.id = "gridSet" + count;
            gridSet.style.display = "block";
            gridSet.value = data[i].comp[1][1];
            gridSet.className = "multiChoice";
            Quest.appendChild(QuestionID);
            Quest.appendChild(questionTitle);
            Quest.appendChild(questionPoints);
            Quest.appendChild(questionInstr);
            Quest.appendChild(th1);
            Quest.appendChild(selectList);
            Quest.appendChild(th5);
            Quest.appendChild(gridSet);

            Quest.appendChild(bt1);

            s.append(Quest);
            continue;
        }

        if(data[i].comp[1][0] == "Matrix") {
            var matrixRSet = document.createElement("textarea");
            matrixRSet.placeholder = "Please input how many rows are there in the matrix";
            matrixRSet.id = "matrixRSet" + count;
            matrixRSet.style.display = "block";
            matrixRSet.value = data[i].comp[1][1];
            matrixRSet.className = "multiChoice";

            var matrixCSet = document.createElement("textarea");
            matrixCSet.placeholder = "Please input how many columns are there in the matrix";
            matrixCSet.id = "matrixCSet" + count;
            matrixCSet.style.display = "block";
            matrixCSet.value = data[i].comp[1][2];
            matrixCSet.className = "multiChoice";

            Quest.appendChild(QuestionID);
            Quest.appendChild(questionTitle);
            Quest.appendChild(questionPoints);
            Quest.appendChild(questionInstr);
            Quest.appendChild(th1);
            Quest.appendChild(selectList);
            Quest.appendChild(th5);
            Quest.appendChild(matrixRSet);
            Quest.appendChild(matrixCSet);

            Quest.appendChild(bt1);

            s.append(Quest);
            continue;
        }

        if(data[i].comp[1][0] == "Cloze") {
            var clozeSet = document.createElement("textarea");
            clozeSet.placeholder = "Please input the codes, use ' [] ' to represent the black you want students to fill in";
            clozeSet.id = "clozeSet" + count;
            clozeSet.style.display = "block";
            clozeText = data[i].comp[1][1];
            var newClozeText = "";
            for (var t = 0; t < clozeText.length; t++) {
                if (clozeText[t] == "[]") {
                    clozeText[t] = " [] ";
                }
            }
            for (var t = 0; t < clozeText.length; t++) {
                if (clozeText[t] != " [] " && clozeText[t - 1] == null && clozeText[t + 1] != " [] ") {
                    newClozeText = newClozeText + clozeText[t] + "\n";
                } else if (clozeText[t] != " [] " && clozeText[t - 1] == " [] " && clozeText[t + 1] == null) {
                    newClozeText = newClozeText + clozeText[t];
                } else if (clozeText[t] != " [] " && clozeText[t - 1] != " [] " && clozeText[t + 1] == null) {
                    newClozeText = newClozeText + clozeText[t];
                } else if (clozeText[t] != " [] " && clozeText[t - 1] != " [] " && clozeText[t + 1] != " [] ") {
                    newClozeText = newClozeText + "\n" + clozeText[t] + "\n";
                } else if (clozeText[t] != " [] " && clozeText[t - 1] != " [] " && clozeText[t + 1] == " [] ") {
                    newClozeText = newClozeText + clozeText[t];
                } else if (clozeText[t] != " [] " && clozeText[t - 1] == " [] " && clozeText[t + 1] == " [] ") {
                    newClozeText = newClozeText + clozeText[t];
                } else if (clozeText[t] != " [] " && clozeText[t - 1] == " [] " && clozeText[t + 1] != " [] ") {
                    newClozeText = newClozeText + clozeText[t] + "\n";
                } else if (clozeText[t] == " [] " && clozeText[t - 1] != " [] " && clozeText[t + 1] != " [] ") {
                    newClozeText = newClozeText + clozeText[t];
                }
            }
            newClozeText = newClozeText.replace(/\n{2,}/g, '\n');
            clozeSet.value = newClozeText;
            clozeSet.className = "inputCode";
            clozeSet.addEventListener('keydown', autosize);

            Quest.appendChild(QuestionID);
            Quest.appendChild(questionTitle);
            Quest.appendChild(questionPoints);
            Quest.appendChild(questionInstr);
            Quest.appendChild(th1);
            Quest.appendChild(selectList);
            Quest.appendChild(th5);
            Quest.appendChild(clozeSet);

            Quest.appendChild(bt1);

            s.append(Quest);
            continue;
        }

        if(data[i].comp[1][0] == "Codes") {
            var codesSet = document.createElement("textarea");
            codesSet.placeholder = "Please input the codes";
            codesSet.id = "codesSet" + count;
            codesSet.style.display = "block";
            codesText = data[i].comp[1][1].replace(/<>/g, "\n");
            codesSet.value = codesText;
            codesSet.className = "inputCode";
            codesSet.addEventListener('keydown', autosize);

            Quest.appendChild(QuestionID);
            Quest.appendChild(questionTitle);
            Quest.appendChild(questionPoints);
            Quest.appendChild(questionInstr);
            Quest.appendChild(th1);
            Quest.appendChild(selectList);
            Quest.appendChild(th5);
            Quest.appendChild(codesSet);

            Quest.appendChild(bt1);

            s.append(Quest);
            continue;
        }

        if(data[i].comp[1][0] == "Match") {
            var matchLeft = document.createElement("textarea");
            matchLeft.placeholder = "Please input the elements you want to be shown on the left of matching, using ',' to separate different elements";
            matchLeft.id = "matchLeft" + count;
            matchLeft.style.display = "block";
            matchLeft.value = data[i].comp[1][1];
            matchLeft.className = "matchChoice";
            matchLeft.addEventListener('keydown', autosize);

            var matchRight = document.createElement("textarea");
            matchRight.placeholder = "Please input the elements you want to be shown on the right of matching, using ',' to separate different elements";
            matchRight.id = "matchRight" + count;
            matchRight.style.display = "block";
            matchRight.value = data[i].comp[1][2];
            matchRight.className = "matchChoice";
            matchRight.addEventListener('keydown', autosize);

            Quest.appendChild(QuestionID);
            Quest.appendChild(questionTitle);
            Quest.appendChild(questionPoints);
            Quest.appendChild(questionInstr);
            Quest.appendChild(th1);
            Quest.appendChild(selectList);
            Quest.appendChild(th5);
            Quest.appendChild(matchLeft);
            Quest.appendChild(matchRight);

            Quest.appendChild(bt1);

            s.append(Quest);
            continue;
        }

        if(data[i].comp[1][0] == "Survey") {
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

            var addChoice4 = Util.button("+", function () {return function() {add_MS(this.parentNode.id)}}(j), "four");

            multiSurveys.appendChild(addChoice4);
            multiSurveys.appendChild(surveyCont1);
            multiSurveys.appendChild(surveyCont2);
            multiSurveys.appendChild(surveyCont3);
            multiSurveys.appendChild(surveyCont4);

            multiSurveys.style.display = "block";
            surveyCont1.value = data[i].comp[1][2][0];
            surveyCont2.value = data[i].comp[1][2][1];
            surveyCont3.value = data[i].comp[1][2][2];
            surveyCont4.value = data[i].comp[1][2][3];

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

            var addChoice5 = Util.button("+", function () {return function() {add_MSC(this.parentNode.id)}}(j), "four");

            surveyChoices.appendChild(addChoice5);
            surveyChoices.appendChild(surveyC1);
            surveyChoices.appendChild(surveyC2);
            surveyChoices.appendChild(surveyC3);
            surveyChoices.appendChild(surveyC4);

            surveyChoices.style.display = "block";
            surveyC1.value = data[i].comp[1][1][0];
            surveyC2.value = data[i].comp[1][1][1];
            surveyC3.value = data[i].comp[1][1][2];
            surveyC4.value = data[i].comp[1][1][3];

            Quest.appendChild(QuestionID);
            Quest.appendChild(questionTitle);
            Quest.appendChild(questionPoints);
            Quest.appendChild(questionInstr);
            Quest.appendChild(th1);
            Quest.appendChild(selectList);
            Quest.appendChild(th5);
            Quest.appendChild(multiSurveys);
            Quest.appendChild(surveyChoices);

            Quest.appendChild(bt1);

            s.append(Quest);
            continue;
        }
    }
}

function detailsToJson1(Divs) {
    // var datas = []; // first row needs to be headers\
    var headers = ["quizID", "quizTitle", "quizClass", "published", "openDate", "dueDate", "closeDate", "quizTime", "tryTimes", "shuffleAnswers", "shuffleQuestions", "questionNum", "accessCode"];
    console.log(Divs.getElementsByTagName('textarea').length);
    for (var j = 1; j <= Divs.getElementsByTagName('textarea').length; j++) {
        var newDetailData = {};
        newDetailData[headers[0]] = document.getElementById("quizID").value;
        newDetailData[headers[1]] = document.getElementById("quizTitle").value;
        newDetailData[headers[2]] = document.getElementById("quizClass").value;
        newDetailData[headers[3]] = document.getElementById("published").value;
        newDetailData[headers[4]] = document.getElementById("openDate").value;
        newDetailData[headers[5]] = document.getElementById("dueDate").value;
        newDetailData[headers[6]] = document.getElementById("closeDate").value;
        newDetailData[headers[7]] = document.getElementById("quizTime").value;
        newDetailData[headers[8]] = document.getElementById("tryTimes").value;
        newDetailData[headers[9]] = document.getElementById("shuffleAnswers").value;
        newDetailData[headers[10]] = document.getElementById("shuffleQuestions").value;
        newDetailData[headers[11]] = document.getElementById("questionNum").value;
        newDetailData[headers[12]] = document.getElementById("accessCode").value;
    }
    sessionStorage.setItem("newQuizDetails", JSON.stringify(newDetailData));
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
            ["Survey", ["Agree", "Neutral", "Disagree", "None of above"], [
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