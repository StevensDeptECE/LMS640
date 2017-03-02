function quizIndex(payload){
    this.payload = payload;
    //s=document.getElementById("quizList");
    //drawTable(s,data);
}

quizIndex.prototype.draw = function(s) {
    var header = Util.h1("Quizzes");
    clearElements("up2");
    document.getElementById("up2").appendChild(header);
    clearElements("up3");
    var newDiv = Util.div("wrapper","quizIndex");
    var t = document.createElement("table");
    t.id = "t01";
    var thead = document.createElement("thead");
    var tr = document.createElement("tr");
    var th1 = document.createElement("th");
    th1.appendChild(document.createTextNode("Published"));
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
        tr = document.createElement("tr");
        var td1 = document.createElement("td");
            td1.appendChild(document.createTextNode(this.payload[i].publish));
        var td2 = document.createElement("td");
            td2.appendChild(document.createTextNode(this.payload[i].quizName));
        var td3 = document.createElement("td");
            td3.appendChild(document.createTextNode(this.payload[i].course));
        var td4 = document.createElement("td");
            td4.appendChild(document.createTextNode(this.payload[i].dueDate));
        var td5 = document.createElement("td");
            td5.appendChild(document.createTextNode(this.payload[i].closeDate));

        var td6 = document.createElement("td");
            var bt1 = document.createElement("a");
            bt1.className = "one";
            bt1.href = this.payload[i].stats;
            var text = document.createTextNode("Stats");
            bt1.appendChild(text);
        td6.appendChild(bt1);

        var td7 = document.createElement("td");
            var bt2 = document.createElement("a");
            bt2.className = "one";
            bt2.href = this.payload[i].take;
            text = document.createTextNode("Take");
            bt2.appendChild(text);
        td7.appendChild(bt2);
            var bt3 = document.createElement("a");
            bt3.className = "one";
            bt3.href = this.payload[i].edit;
            text = document.createTextNode("edit");
            bt3.appendChild(text);
        td7.appendChild(bt3);

        var td8 = document.createElement("td");
            var bt4 = document.createElement("button");
            bt4.className = "one";
            bt4.onclick = this.createClickHandler(i, this.payload);
            // bt4.onclick = function(arg) {
            //     return function () {
            //         var row = this.parentNode.parentNode;
            //         data.splice(arg,1);
            //         row.parentNode.removeChild(row);
            //         console.log(data);
            //     }
            // }(i);
            text = document.createTextNode("Del");
            bt4.appendChild(text);
        td8.appendChild(bt4);

            var bt5 = document.createElement("button")
            bt5.className = "one";
            text = document.createTextNode("Dup");
            bt5.appendChild(text);
        td8.appendChild(bt5);

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
    newDiv.appendChild(t)
    s.appendChild(newDiv);
}

quizIndex.prototype.createClickHandler = function(arg, data){
    return function () {
        var row = this.parentNode.parentNode;
        data.splice(arg,1);
        row.parentNode.removeChild(row);
    }
};

var quizIndexPayload = [
    {
        "id": "qc1111",
        "publish": "yes",
        "quizName": "Quiz1",
        "course": "CPE-593",
        "dueDate": "1/1/2017",
        "closeDate": "2/2/2017",
        "stats": "StatisticView2.html",
        "take": "TakeTest1.html",
        "edit": "TakeTest1.html"
    },
    {
        "id": "qc2222",
        "publish": "yes",
        "quizName": "Quiz2",
        "course": "CPE-593",
        "dueDate": "2/2/2017",
        "closeDate": "3/3/2017",
        "stats": "StatisticView2.html",
        "take": "TakeTest1.html",
        "edit": "TakeTest1.html"
    },
    {
        "id": "qc3333",
        "publish": "no",
        "quizName": "Quiz1",
        "course": "CPE-810",
        "dueDate": "3/3/2017",
        "closeDate": "4/4/2017",
        "stats": "StatisticView2.html",
        "take": "TakeTest1.html",
        "edit": "TakeTest1.html"
    }
]