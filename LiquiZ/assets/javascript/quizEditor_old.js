/**
 * Created by yucheng on 3/1/17.
 */

function load(){
    var data = [
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
                [],
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
        }
    ];
    s=document.getElementById("quizEdit");
    drawTable(s,data);
}

function drawTable(s,data) {
    var dd = document.createElement("div");
    dd.id = "wrapper";
    var t = document.createElement("table");
    t.className = "t01";
    // t.id = "data_table";
    var thead = document.createElement("thead");
    var tr = document.createElement("tr");
    var th1 = document.createElement("th");
    th1.appendChild(document.createTextNode("ID"));
    var th2 = document.createElement("th");
    th2.appendChild(document.createTextNode("Title"));
    var th3 = document.createElement("th");
    th3.appendChild(document.createTextNode("Instruction"));
    var th4 = document.createElement("th");
    th4.appendChild(document.createTextNode("Equation"));
    var th5 = document.createElement("th");
    th5.appendChild(document.createTextNode("Operation"));
    var th6 = document.createElement("th");
    th6.appendChild(document.createTextNode("Edit"));
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    tr.appendChild(th5);
    tr.appendChild(th6);
    thead.appendChild(tr);

    var tbody = document.createElement("tbody");
    for (var i = 0; i < data.length; i++) {
        tr = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.contentEditable = true;
        td1.appendChild(document.createTextNode(data[i].id));
        var td2 = document.createElement("td");
        td2.contentEditable = true;
        td2.appendChild(document.createTextNode(data[i].title));
        var td3 = document.createElement("td");
        td3.contentEditable = true;
        td3.appendChild(document.createTextNode(data[i].comp[0]));
        var td4 = document.createElement("td");
        td4.contentEditable = true;
        td4.appendChild(document.createTextNode(data[i].comp[1]));
        var td5 = document.createElement("td");
        td5.contentEditable = true;
        td5.appendChild(document.createTextNode(data[i].comp[2]));
        var td6 = document.createElement("td");
        td6.contentEditable = true;
        var bt = document.createElement("input");
        bt.type = "button";
        bt.value = "Delete";
        bt.onclick = function(arg) {
            return function () {
                var row = this.parentNode.parentNode;
                data.splice(arg,1);
                row.parentNode.removeChild(row);
                console.log(data);
            }
        }(i);
        td6.appendChild(bt);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tbody.appendChild(tr);
    }
    t.appendChild(thead);
    t.appendChild(tbody);
    s.appendChild(t);
}