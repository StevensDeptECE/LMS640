/**
 * Created by yucheng on 3/3/17.
 */

/*This is the implementation of create quiz that is integrated with the quizList page */

function addQuiz(payload){
    this.payload = payload;
    //s=document.getElementById("quizList");
    //drawTable(s,data);
}

addQuiz.prototype.draw = function(s) {
    var header = Util.h1("Create New Quiz", "h03");
    clearElements("up2");
    document.getElementById("up2").appendChild(header);
    clearElements("up3");
    var newDiv = Util.div("wrapper_rightside", "addQuiz");

    var t = document.createElement("table");
    t.className = "t01";
    t.id = "data_table";
    var tr1 = document.createElement("tr");
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

    tr1.appendChild(th1);
    tr1.appendChild(th2);
    tr1.appendChild(th3);
    tr1.appendChild(th4);
    tr1.appendChild(th5);
    tr1.appendChild(th6);
    t.appendChild(tr1);

    var tr2 = document.createElement("tr");
    tr2.id = "row1";
    var td1 = document.createElement("td");
    td1.id = "id_row1";
    td1.appendChild(document.createTextNode("qc1000"));
    var td2 = document.createElement("td");
    td2.id = "title_row1";
    td2.appendChild(document.createTextNode("Drag and Drop"));
    var td3 = document.createElement("td");
    td3.id = "instr_row1";
    td3.appendChild(document.createTextNode("Instr, Locate the parts of the cat ,1"));
    var td4 = document.createElement("td");
    td4.id = "eqn_row1";
    // td4.appendChild(document.createTextNode("Eqn, 3*4, 2"));
    var td5 = document.createElement("td");
    td5.id = "oper_row1";
    td5.appendChild(document.createTextNode("DragDrop, cat.jpg,[Ear,Eye,Nose,Tongue], [ {left:215,top:30}, {left:255,top:120},{left:285,top:160},{left:285,top:220}], 7"));
    var td6 = document.createElement("td");
    var bt1 = Util.button("Edit", function () {edit_row('1')}, 'three', "edit_button1");
    var bt2 = Util.button("Save", function () {save_row('1')}, 'three', "save_button1");
    var bt3 = Util.button("Del", function () {delete_row('1')}, 'three');
    td6.appendChild(bt1);
    td6.appendChild(bt2);
    td6.appendChild(bt3);

    tr2.appendChild(td1);
    tr2.appendChild(td2);
    tr2.appendChild(td3);
    tr2.appendChild(td4);
    tr2.appendChild(td5);
    tr2.appendChild(td6);
    t.appendChild(tr2);

    var tr3 = document.createElement("tr");
    var td11 = document.createElement("td");
    var inputText1 = document.createElement("input");
    inputText1.type = "text";
    inputText1.id = "new_id";
    inputText1.className = "addQuiz";
    td11.appendChild(inputText1);
    var td22 = document.createElement("td");
    var inputText2 = document.createElement("input");
    inputText2.type = "text";
    inputText2.id = "new_title";
    inputText2.className = "addQuiz";
    td22.appendChild(inputText2);
    var td33 = document.createElement("td");
    var inputText3 = document.createElement("input");
    inputText3.type = "text";
    inputText3.id = "new_instr";
    inputText3.className = "addQuiz";
    inputText3.style.width = "300px";
    td33.appendChild(inputText3);
    var td44 = document.createElement("td");
    var inputText4 = document.createElement("input");
    inputText4.type = "text";
    inputText4.id = "new_eqn";
    inputText4.className = "addQuiz";
    td44.appendChild(inputText4);
    var td55 = document.createElement("td");
    var inputText5 = document.createElement("input");
    inputText5.type = "text";
    inputText5.id = "new_oper";
    inputText5.className = "addQuiz";
    inputText5.style.width = "500px";
    td55.appendChild(inputText5);
    var td66 = document.createElement("td");
    var bt11 = Util.button("Add", function () {add_row()},"three", "add");
    td66.appendChild(bt11);

    tr3.appendChild(td11);
    tr3.appendChild(td22);
    tr3.appendChild(td33);
    tr3.appendChild(td44);
    tr3.appendChild(td55);
    tr3.appendChild(td66);

    t.appendChild(tr3);
    newDiv.appendChild(t);
    var saveQuiz = Util.button("Save Quiz",function () {tableToJson(data_table); location.reload(); launch(quizIndex, quizIndexPayload, "up3"); },"three");
    saveQuiz.style.marginLeft = "40px";
    // var submitQuiz = Util.button("Show Quiz",function () {launch(takeNewQuiz, newQuizPayload, 'up3')},"three");
    newDiv.appendChild(saveQuiz);
    // newDiv.appendChild(submitQuiz);
    s.appendChild(newDiv);
    clearClass("active");
    document.getElementById("allquizzes").className = "active";
};

function edit_row(no) {
    document.getElementById("edit_button" + no).style.display = "none";
    document.getElementById("save_button" + no).style.display = "block";

    var id = document.getElementById("id_row" + no);
    var title = document.getElementById("title_row" + no);
    var instr = document.getElementById("instr_row" + no);
    var eqn = document.getElementById("eqn_row" + no);
    var oper = document.getElementById("oper_row" + no);

    var id_data = id.innerText;
    var title_data = title.innerText;
    var instr_data = instr.innerText;
    var eqn_data = eqn.innerText;
    var oper_data = oper.innerText;

    id.innerHTML = "<input type='text' id='id_text" + no + "' value='" + id_data + "' class = 'addQuiz'>";
    title.innerHTML = "<input type='text' id='title_text" + no + "' value='" + title_data + "' class = 'addQuiz'>";
    instr.innerHTML = "<input type='text' id='instr_text" + no + "' value='" + instr_data + "' class = 'addQuiz' style='width: 300px;'>";
    eqn.innerHTML = "<input type='text' id='eqn_text" + no + "' value='" + eqn_data + "' class = 'addQuiz'>";
    oper.innerHTML = "<input type='text' id='oper_text" + no + "' value='" + oper_data + "' class = 'addQuiz' style='width: 500px;'>";
}

function save_row(no) {
    var id_val = document.getElementById("id_text" + no).value;
    var title_val = document.getElementById("title_text" + no).value;
    var instr_val = document.getElementById("instr_text" + no).value;
    var eqn_val = document.getElementById("eqn_text" + no).value;
    var oper_val = document.getElementById("oper_text" + no).value;

    document.getElementById("id_row" + no).innerHTML = id_val;
    document.getElementById("title_row" + no).innerHTML = title_val;
    document.getElementById("instr_row" + no).innerHTML = instr_val;
    document.getElementById("eqn_row" + no).innerHTML = eqn_val;
    document.getElementById("oper_row" + no).innerHTML = oper_val;

    document.getElementById("edit_button" + no).style.display = "block";
    document.getElementById("save_button" + no).style.display = "none";
}

function delete_row(no) {
    document.getElementById("row" + no + "").outerHTML = "";
}

function add_row() {
    var new_id = document.getElementById("new_id").value;
    var new_title = document.getElementById("new_title").value;
    var new_instr = document.getElementById("new_instr").value;
    var new_eqn = document.getElementById("new_eqn").value;
    var new_oper = document.getElementById("new_oper").value;

    var table = document.getElementById("data_table");
    var table_len = (table.rows.length) - 1;
    var row = table.insertRow(table_len).outerHTML =
        "<tr id='row" + table_len + "'>" +
        "<td id='id_row" + table_len + "'>" + new_id + "</td>" +
        "<td id='title_row" + table_len + "'>" + new_title + "</td>" +
        "<td id='instr_row" + table_len + "'>" + new_instr + "</td>" +
        "<td id='eqn_row" + table_len + "'>" + new_eqn + "</td>" +
        "<td id='oper_row" + table_len + "'>" + new_oper + "</td>" +
        "<td><input type='button' id='edit_button" + table_len + "' value='Edit' onclick= 'edit_row(" + table_len + ")' class='three'> " +
        "<input type='button' id='save_button" + table_len + "' value='Save' onclick='save_row(" + table_len + ")' class='three'> " +
        "<input type='button' value='Del' onclick='delete_row(" + table_len + ")' class='three'></td></tr>";

    document.getElementById("new_id").value = "";
    document.getElementById("new_title").value = "";
    document.getElementById("new_instr").value = "";
    document.getElementById("new_eqn").value = "";
    document.getElementById("new_oper").value = "";
}


function tableToJson(table) {
    var datas = []; // first row needs to be headers
    var headers = ["id", "title", "comp"];
    for (var i = 1; i < table.rows.length - 1; i++) {
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
            if (operTitle == "DragDrop") {
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