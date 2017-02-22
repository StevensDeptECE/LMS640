function load(){
   var  data={
        "Quizname": "Chapter1",
        "QuizID": "qz111",
        "Course":"Data structures",
        "DueDate":"02/01/2017",
        "ClosedDate": "February 10th, 2017",
        "SubmissionNumbers" : "5",
        "TotalGrades": ["80","0","100"],
        "Grades":[
            { "QuestionId":"qc1001","grade":["80","70","89"]},
            { "QuestionId":"qc1002","grade":["80","70","89"]},
            { "QuestionId":"qc1003","grade":["80","70","89"]},
            { "QuestionId":"qc1004","grade":["80","70","89"]},
            { "QuestionId":"qc1005","grade":["80","70","89"]}
        ]};

    p=document.getElementById("Information");
    drawInfo(p,data);
    s=document.getElementById("ShowGrades")
    drawTable(s,data);

}

function drawInfo(p,data){
    var p1=document.createElement("h2");
    p1.className="Info";
    p1.appendChild(document.createTextNode(data.Course+" : "+data.Quizname));
    var d=document.createElement("div");
    var p2=document.createElement("tr");
    d.className="Info"
    var t1=document.createElement("td");
    t1.appendChild(document.createTextNode("Due Date : "+data.DueDate));
    var t2=document.createElement("td");
    t2.appendChild(document.createTextNode("Close Date : "+data.ClosedDate));
    var t3=document.createElement("td");
    t3.appendChild(document.createTextNode("Submission Numbers : "+data.SubmissionNumbers));
    p2.appendChild(t1);
    p2.appendChild(t2);
    p2.appendChild(t3);
    d.appendChild(p2);
    p.appendChild(p1);
    p.appendChild(d);
    p.appendChild(document.createElement("br"));
}

function drawTable(s,data) {
    console.log(data);
    var t = document.createElement("table");
    t.className = "stats";
    var thead = document.createElement("thead");
    var tr = document.createElement("tr");
    var th1 = document.createElement("th");
    th1.appendChild(document.createTextNode("QuestionId"));
    var th2 = document.createElement("th");
    th2.appendChild(document.createTextNode("Mean Score"));
    var th3 = document.createElement("th");
    th3.appendChild(document.createTextNode("Lowest Score"));
    var th4 = document.createElement("th");
    th4.appendChild(document.createTextNode("Highest Score"));
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    thead.appendChild(tr);

    var tbody = document.createElement("tbody");
    for (var i = 0; i < data.Grades.length; i++) {
        tr = document.createElement("tr");
        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.Grades[i].QuestionId));
        tr.appendChild(td);
        for (var j = 0; j < data.Grades[i].grade.length; j++) {
            td = document.createElement("td");
            td.appendChild(document.createTextNode(data.Grades[i].grade[j]));
            tr.appendChild(td);
        }
        tbody.appendChild(tr);

    }
    tr = document.createElement("tr");
    tr.className="total";
    td = document.createElement("td");
    td.appendChild(document.createTextNode("total"));
    tr.appendChild(td);
    for (var j = 0; j < data.TotalGrades.length; j++) {
        td = document.createElement("td");
        td.appendChild(document.createTextNode(data.TotalGrades[j]));
        tr.appendChild(td);
    }
        tbody.appendChild(tr);
        t.appendChild(thead);
        t.appendChild(tbody);
        s.appendChild(t);



}
