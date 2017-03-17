/**
 * Created by junkai on 3/10/2017.
 */

function AllStats(data){

}

AllStats.prototype.draw= function(s){
    var data = quizAllStatsPayload;
    var header = Util.div("wrapper","Information");
    var p1=document.createElement("h2");
    p1.className="Info";
    p1.appendChild(document.createTextNode("Quiz Statistics"));
    header.appendChild(p1);
    clearElements("up2");
    document.getElementById("up2").appendChild(header);
    clearElements("up3");
    var newDiv = Util.div("wrapper","showStats");


    var t = document.createElement("table");
    t.className = "stats";
    var thead = document.createElement("thead");
    var tr = document.createElement("tr");
    var th1 = document.createElement("th");
    th1.appendChild(document.createTextNode("Quiz Name"));
    var th2 = document.createElement("th");
    th2.appendChild(document.createTextNode("Course"));
    var th3 = document.createElement("th");
    th3.appendChild(document.createTextNode("Lowest Score"));
    var th4 = document.createElement("th");
    th4.appendChild(document.createTextNode("Highest Score"));
    var th5 = document.createElement("th");
    th5.appendChild(document.createTextNode("Mean Score"));
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    tr.appendChild(th5);
    thead.appendChild(tr);


    var tbody = document.createElement("tbody");
    var tbody = document.createElement("tbody");
    for (var i = 0; i < data.length; i++) {
        tr = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.appendChild(document.createTextNode(data[i].quizName));
        tr.appendChild(td1);
        var td2 = document.createElement("td");
        td2.appendChild(document.createTextNode(data[i].course));
        tr.appendChild(td2);
        var td3 = document.createElement("td");
        td3.appendChild(document.createTextNode(data[i].grade.low));
        tr.appendChild(td3);
        var td4 = document.createElement("td");
        td4.appendChild(document.createTextNode(data[i].grade.high));
        tr.appendChild(td4);
        var td5 = document.createElement("td");
        td5.appendChild(document.createTextNode(data[i].grade.mean));
        tr.appendChild(td5);
        tbody.appendChild(tr);
    }
    t.appendChild(thead);
    t.appendChild(tbody);
    var b1=document.createElement("Button");
    b1.id="backButton";
    b1.onclick=function(){launch(quizIndex, quizIndexPayload, 'up3')};
    b1.appendChild(document.createTextNode("BACK"));
    newDiv.appendChild(t);
    newDiv.appendChild(b1);

    s.appendChild(newDiv);
    clearClass("active");
    document.getElementById("allquizzes").className = "active";



}


var quizAllStatsPayload = [
    {
        "id": "qz1111",
        "publish": "yes",
        "quizName": "Quiz1",
        "course": "CPE-593",
        "dueDate": "1/1/2017",
        "closeDate": "2/2/2017",
        "stats": "StatisticView2.html",
        "grade":{
            "mean":"80",
            "low":"50",
            "high":"100"
        }

    },
    {
        "id": "qz2222",
        "publish": "yes",
        "quizName": "Quiz2",
        "course": "CPE-593",
        "dueDate": "2/2/2017",
        "closeDate": "3/3/2017",
        "stats": "StatisticView2.html",
        "grade": {
            "mean": "80",
            "low": "50",
            "high": "100"
        }
    },
        {
        "id": "qz3333",
        "publish": "no",
        "quizName": "Quiz3",
        "course": "CPE-810",
        "dueDate": "3/3/2017",
        "closeDate": "4/4/2017",
        "stats": "StatisticView2.html",
            "grade": {
                "mean": "80",
                "low": "50",
                "high": "100"
            }
    }
]
