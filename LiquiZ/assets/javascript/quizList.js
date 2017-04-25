function quizIndex(payload){
    this.payload = payload;
    //s=document.getElementById("quizList");
    //drawTable(s,data);
}

quizIndex.prototype.draw = function(s) {
    var login = document.getElementById("loginformabs_top");
    login.style.display ="none";
    var header = Util.h1("Quiz List","h03");
    clearElements("up3");

    // this function could use one button to enter two kinds of quiz builder;
    // var createQuiz = Util.button("Create Quiz", function(){myFunction()}, "two");
    // header.appendChild(createQuiz);

    var createQuiz = Util.button("Create Quiz I", function () {
        launch(addQuiz, "", 'up3')
    }, "two");
    header.appendChild(createQuiz);

    // var createQuestion = Util.button("Create Quiz II",function () {launch(questionEditor, "", 'up3')},"two");
    // header.appendChild(createQuestion);

    var aa = Util.button("Create Quiz III", function () {
        launch(newQuiz, "", 'up3')
    }, "two");
    header.appendChild(aa);

    var submitQuiz = Util.button("Show Quiz",function () {launch(takeNewQuiz, newQuizPayload, 'up3')},"two");
    header.appendChild(submitQuiz);
    var clearButton = Util.button("Clear localStorage",function () {sessionStorage.clear(); window.location.reload(false)}, "two");
    header.appendChild(clearButton);
    var editSettings = Util.button("Settings",function () {launch(settings, settingsPayload, 'up3')},"two");
    header.appendChild(editSettings);

    clearElements("up2");
    document.getElementById("up2").appendChild(header);
    clearElements("up3");
    var newDiv = Util.div("wrapper_rightside","quizIndex");
    var t = document.createElement("table");
    t.className = "t01";
    var thead = document.createElement("thead");
    var tr = document.createElement("tr");
    var th1 = document.createElement("th");
    th1.appendChild(document.createTextNode("Publish"));
    var th2 = document.createElement("th");
    th2.appendChild(document.createTextNode("Quiz Name"));
    var th3 = document.createElement("th");
    th3.appendChild(document.createTextNode("Course Name"));
    var th4 = document.createElement("th");
    th4.appendChild(document.createTextNode("Due Date"));
    var th5 = document.createElement("th");
    th5.appendChild(document.createTextNode("Close Date"));
    var th6 = document.createElement("th");
    th6.appendChild(document.createTextNode("Show Statistic"));
    var th7 = document.createElement("th");
    th7.appendChild(document.createTextNode("Take & Edit"));
    var th8 = document.createElement("th");
    th8.appendChild(document.createTextNode("Operation"));
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    tr.appendChild(th5);
    tr.appendChild(th6);
    tr.appendChild(th7);
    tr.appendChild(th8);
    thead.appendChild(tr);

    var tbody = document.createElement("tbody");
/*
    var createClickHandler = function(arg) {
        return function () {
            var row = this.parentNode.parentNode;
            this.payload.splice(arg,1);
            row.parentNode.removeChild(row);
            console.log(this.payload);
        }
    };
*/

    for (var i = 0; i < this.payload.length; i++) {
        if(this.payload[i] == null) {
            continue;
        }
        tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var div = document.createElement("div");
        var ifPublish = document.createElement("input");
        ifPublish.type = "checkbox";
        ifPublish.id = "ifPublish" + i;
        var label = document.createElement("label");
        label.htmlFor = "ifPublish" + i;
        ifPublish.checked = this.payload[i].published != "no";
        div.appendChild(ifPublish);
        div.appendChild(label);
        div.className = "newCheckbox";
        td1.appendChild(div);

        var td2 = document.createElement("td");
            td2.appendChild(document.createTextNode(this.payload[i].quizTitle));
        var td3 = document.createElement("td");
            td3.appendChild(document.createTextNode(this.payload[i].quizClass));
        var td4 = document.createElement("td");
            td4.appendChild(document.createTextNode(this.payload[i].dueDate));
        var td5 = document.createElement("td");
            td5.appendChild(document.createTextNode(this.payload[i].closeDate));

        var td6 = document.createElement("td");
            var bt1 = document.createElement("button");
            bt1.onclick= function () {launch(quizStats, statsPayload, 'up3')};
            var text = document.createTextNode("Stats");
            bt1.className = "three";
            bt1.appendChild(text);
        td6.appendChild(bt1);

        var td7 = document.createElement("td");
            var bt2 = document.createElement("button");
            if(this.payload[i].quizClass == "CPE593")
                bt2.onclick=function () {launch(takeQuiz, CPE593Quiz , 'up3')};
            else
                bt2.onclick=function () {launch(takeQuiz, quiz1Payload, 'up3')};
            text = document.createTextNode("Take");
            bt2.className = "three";
            bt2.appendChild(text);
        td7.appendChild(bt2);
            var bt3 = document.createElement("button");
            bt3.onclick = function () {launch(quizEditor, quizEditorPayLoad, 'up3')};
            text = document.createTextNode("Edit I");
            bt3.className = "three";
            bt3.appendChild(text);
        td7.appendChild(bt3);
            var bt33 = document.createElement("button");
            bt33.onclick = function () {launch(newQuizEditor, newQuizEditorPayLoad, 'up3')};
            text = document.createTextNode("Edit II");
            bt33.className = "three";
            bt33.appendChild(text);
        td7.appendChild(bt33);


        var td8 = document.createElement("td");
            var bt4 = document.createElement("button");
            bt4.onclick = this.createClickHandler1(i, this.payload);
            // bt4.onclick = function(arg) {
            //     return function () {
            //         var row = this.parentNode.parentNode;
            //         data.splice(arg,1);
            //         row.parentNode.removeChild(row);
            //         console.log(data);
            //     }
            // }(i);
            text = document.createTextNode("Del");
            bt4.className = "three";
            bt4.appendChild(text);
        td8.appendChild(bt4);

        // var bt5 = document.createElement("button");
        //     text = document.createTextNode("Dup");
        //     bt5.appendChild(text);
        // td8.appendChild(bt5);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        tr.appendChild(td8);
        tbody.appendChild(tr);
    }
    t.appendChild(thead);
    t.appendChild(tbody);
    newDiv.appendChild(t);
    s.appendChild(newDiv);
    // clearClass("active");
    // document.getElementById("allquizzes").className = "active";
};

quizIndex.prototype.createClickHandler1 = function(arg, data){
    return function () {
        var row = this.parentNode.parentNode;
        data.splice(arg,1);
        row.parentNode.removeChild(row);
    }
};


// var quizIndexPayload = [
//     {
//         "quizID": "qc1111",
//         "published": "yes",
//         "quizTitle": "Quiz1",
//         "quizClass": "CPE-593",
//         "dueDate": "1/1/2017",
//         "closeDate": "2/2/2017"
//     },
//     {
//         "quizID": "qc2222",
//         "published": "yes",
//         "quizTitle": "Quiz2",
//         "quizClass": "CPE-593",
//         "dueDate": "2/2/2017",
//         "closeDate": "3/3/2017"
//     },
//     {
//         "quizID": "qc3333",
//         "published": "no",
//         "quizTitle": "Quiz1",
//         "quizClass": "CPE-810",
//         "dueDate": "3/3/2017",
//         "closeDate": "4/4/2017"
//     }
// ];
// quizIndexPayload.push(JSON.parse(sessionStorage.getItem("quizDetails")));

 var quizDetailPayLoad = [
    {
        quizID: "1ddd2d96-42ad-0181-5de7-f768fa6c992b",
        quizTitle: "Quiz1",
        quizClass: "CPE640",
        published: "yes",
        openDate: "1/1/2017",
        dueDate: "1/15/2017",
        closeDate: "1/31/2017",
        quizTime: "60",
        tryTimes: "3",
        shuffleAnswers: "no",
        shuffleQuestions: "no",
        questionNum: "yes",
        accessCode: "123456"
    },
    {
        quizID: "0bee1db8-bbe4-4769-6131-f6492e9050ab",
        quizTitle: "Quiz2",
        quizClass: "CPE593",
        published: "no",
        openDate: "6/1/2017",
        dueDate: "6/15/2017",
        closeDate: "6/31/2017",
        quizTime: "60",
        tryTimes: "4",
        shuffleAnswers: "no",
        shuffleQuestions: "no",
        questionNum: "yes",
        accessCode: "111111"
    },
    {
        quizID: "c5aa2801-139e-b3a7-13c2-8d94c184a87a",
        quizTitle: "Quiz3",
        quizClass: "CPE810",
        published: "yes",
        openDate: "12/1/2017",
        dueDate: "12/15/2017",
        closeDate: "12/31/2017",
        quizTime: "60",
        tryTimes: "5",
        shuffleAnswers: "no",
        shuffleQuestions: "no",
        questionNum: "yes",
        accessCode: "000000"
    }
 ];

quizDetailPayLoad.push(JSON.parse(sessionStorage.getItem("quizDetails")));
// sessionStorage.setItem("store", quizDetailPayLoad);
// quizDetailPayLoad = sessionStorage.getItem("store");


if(sessionStorage.getItem("newQuizDetails") != null) {
    quizDetailPayLoad = [];
    quizDetailPayLoad.push(JSON.parse(sessionStorage.getItem("newQuizDetails")));
}

// function myFunction() {
//     var r = confirm("Press 'OK' to enter a normal version / Press 'Cancel' to enter a git version");
//     if (r == true) {
//         launch(newQuiz, '', 'up3');
//     } else {
//         launch(addQuiz, '', 'up3');
//     }
// }