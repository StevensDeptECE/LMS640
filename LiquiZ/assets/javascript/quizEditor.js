/**
 * Created by yucheng on 3/3/17.
 */

/*This is the implementation of quiz editor that is integrated with the quizList page */

function quizEditor(payload){
    this.payload=payload;
}

quizEditor.prototype.draw= function(s){
    var header = Util.h1("Quiz Editor","h03");
    clearElements("up2");
    document.getElementById("up2").appendChild(header);
    clearElements("up3");
    var newDiv = Util.div("wrapper","quizEditor");
    drawEditor(newDiv,quizEditorPayLoad);
    var saveQuiz = Util.button("Save Quiz",function () {tableToJson2(edit_table); window.location.reload(false);});
    var submitQuiz = Util.button("Show Quiz",function () {launch(takeNewQuiz, newQuizPayload, 'up3')});
    newDiv.appendChild(saveQuiz);
    newDiv.appendChild(submitQuiz);
    s.appendChild(newDiv);
    s.appendChild(newDiv);
    clearClass("active");
    document.getElementById("allquizzes").className = "active";
};

function drawEditor(s,data) {
    var dd = document.createElement("div");
    dd.id = "editorTable";
    var t = document.createElement("table");
    t.className = "t01";
    t.id = "edit_table";
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
        if(data[i].comp.length == 3) {
            var td3 = document.createElement("td");
            td3.contentEditable = true;
            td3.appendChild(document.createTextNode(data[i].comp[0]));
            var td4 = document.createElement("td");
            td4.contentEditable = true;
            td4.appendChild(document.createTextNode(data[i].comp[1]));
            var td5 = document.createElement("td");
            td5.contentEditable = true;

            var aa = JSON.stringify(data[i].comp[2]);
            var left = 0, right = aa.length - 1;
            while(left < right) {
                if(aa.charAt(left) != "[") left++;

                if(aa.charAt(right) != "]") right--;

                if(aa.charAt(left) == "[" && aa.charAt(right) == "]") break;
            }
            aa = aa.substring(left + 1, right);
            aa = aa.replace(/"/g, "");

            td5.appendChild(document.createTextNode(aa));
        }else if(data[i].comp.length == 2) {
            var td3 = document.createElement("td");
            td3.contentEditable = true;
            td3.appendChild(document.createTextNode(data[i].comp[0]));
            var td4 = document.createElement("td");
            td4.contentEditable = true;
            var td5 = document.createElement("td");
            td5.contentEditable = true;

            var aa = JSON.stringify(data[i].comp[1]);
            var left = 0, right = aa.length - 1;
            while(left < right) {
                if(aa.charAt(left) != "[") left++;

                if(aa.charAt(right) != "]") right--;

                if(aa.charAt(left) == "[" && aa.charAt(right) == "]") break;
            }
            aa = aa.substring(left + 1, right);
            aa = aa.replace(/"/g, "");

            td5.appendChild(document.createTextNode(aa));
        }
        var td6 = document.createElement("td");
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

function tableToJson2(table) {
    var datas = [];
    var headers = ["id", "title", "comp"];

    for (var i = 1; i < table.rows.length; i++) {
        var tableRow = table.rows[i];
        var rowData = {};
        for (var j = 0; j < 2; j++) {
            rowData[headers[j]] = tableRow.cells[j].innerText;
        }
        var instr = tableRow.cells[2].innerText.split(/,(?=[^\]]*(?:\[|$))/g);
        var eqn = tableRow.cells[3].innerText.split(/,/g);
        var oper = tableRow.cells[4].innerText;

        var left = 0, right = oper.length - 1;
        while(left < right) {
            if(oper.charAt(left) != ",") left++;

            if(oper.charAt(right) != ",") right--;

            if(oper.charAt(left) == "," && oper.charAt(right) == ",") break;
        }
        var operTitle = oper.substring(0,left);
        var operId = oper.substring(right + 1, oper.length);

        var operFinal = [];
        operFinal.push(operTitle);

        if(left != right) {
            if (operTitle == "dragDrop") {
                var operMid = oper.substring(left + 1, right);
                var left = 0, right = operMid.length - 2;
                while (left < right) {
                    if (operMid.charAt(left) != ",") left++;

                    if (operMid.charAt(right) != "]") right--;

                    if (operMid.charAt(left) == "," && operMid.charAt(right) == "]") break;
                }
                var operMidOne = operMid.substring(0, left);
                if (operMidOne.charAt(0) == " ") {
                    operMidOne = operMidOne.substring(1, operMidOne.length);
                }
                var operMidTwo = operMid.substring(left + 1, right + 1);
                var operMidThree = operMid.substring(right + 2, operMid.length);
                operFinal.push(operMidOne);
                operFinal.push(operMidTwo);
                operFinal.push(operMidThree);
            } else if(operTitle == "Matrix") {
                var operMid = oper.substring(left + 1, right);
                var left = 0;
                while (left < right) {
                    if (operMid.charAt(left) != ",") left++;
                    if (operMid.charAt(left) == ",") break;
                }
                var operMidOne = operMid.substring(0, left);
                var operMidTwo = operMid.substring(left + 1, right + 1);
                operFinal.push(operMidOne);
                operFinal.push(operMidTwo);
            } else if(operTitle == "Match") {
                var operMid = oper.substring(left + 1, right);
                var left = 0; right = operMid.length - 2;
                while (left < right) {
                    if (operMid.charAt(left) != "]") left++;
                    if (operMid.charAt(right) != "[") right--;
                    if (operMid.charAt(left) == "]" && operMid.charAt(right) == "[") break;
                }
                var operMidOne = operMid.substring(0, left+1);
                var operMidTwo = operMid.substring(right, operMid.length);
                operFinal.push(operMidOne);
                operFinal.push(operMidTwo);
            } else if (operTitle == "Survey") {
                var operMid = oper.substring(left + 1, right);
                var left = 0, right = operMid.length - 2;
                while (left < right) {
                    if (operMid.charAt(left) != ",") left++;

                    if (operMid.charAt(right) != "[") right--;

                    if (operMid.charAt(left) == "," && operMid.charAt(right) == "[") break;
                }
                var operMidOne = operMid.substring(0, left);
                if (operMidOne.charAt(0) == " ") {
                    operMidOne = operMidOne.substring(1, operMidOne.length);
                }
                var operMidTwo = operMid.substring(right, operMid.length);
                operFinal.push(operMidOne);
                operFinal.push(operMidTwo);
            }

            else operFinal.push(oper.substring(left + 1, right));
        }
        operFinal.push(operId);

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

var quizEditorPayLoad = [
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
                    "public static",
                    "[]",
                    "main(String[] args) {",
                    "System.",
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
        title: "Codes",
        comp: [
            ["Instr", "Complete the code below so it prints \"Hello\"","1"],
            ["Codes", "public class A {<>  public void main(String[] args) {<>  System.<>  }<>}", "2"]

        ]
    },

    {
        id: "qc1005",
        title: "Grid",
        comp: [
            ["Instr", "Enter 1 through 5", "1"],
            [ "Grid", 5, "2"]
        ]
    },

    {
        id: "qc1006",
        title: "Survey",
        comp: [
            ["Instr", "Enter your honest opinions. There are no right or wrong answers", "1"],
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
            ["Instr", "Enter any 3x3 matrix", "1"],
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
