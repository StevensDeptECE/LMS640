/**
 * Created by yucheng on 3/10/17.
 */
function questionEditor(payload){
    this.payload = payload;
    //s=document.getElementById("quizList");
    //drawTable(s,data);
}

questionEditor.prototype.draw = function(s) {
    var header = Util.h1("Question Editor", "h03");
    clearElements("up2");
    document.getElementById("up2").appendChild(header);
    clearElements("up3");
    var newDiv = Util.div("wrapper_rightside", "questionEditor");

    var t = document.createElement("table");
    t.className = "t02";
    t.id = "data_table";
    var trow0 = document.createElement("tr");
    var th1 = document.createElement("th");
    th1.appendChild(document.createTextNode("Type"));
    var th2 = document.createElement("th");
    th2.appendChild(document.createTextNode("Title"));
    var th3 = document.createElement("th");
    th3.appendChild(document.createTextNode("Instr"));
    var th4 = document.createElement("th");
    th4.appendChild(document.createTextNode("Eqn"));
    var th5 = document.createElement("th");
    th5.appendChild(document.createTextNode("Content"));
    var th6 = document.createElement("th");
    th6.appendChild(document.createTextNode("Content"));
    var th7 = document.createElement("th");
    th7.appendChild(document.createTextNode("Content"));
    var th8 = document.createElement("th");
    th8.appendChild(document.createTextNode("Edit"));
    trow0.appendChild(th1);
    trow0.appendChild(th2);
    trow0.appendChild(th3);
    trow0.appendChild(th4);
    trow0.appendChild(th5);
    trow0.appendChild(th6);
    trow0.appendChild(th7);
    trow0.appendChild(th8);

    t.appendChild(trow0);

    var trow1 = document.createElement("tr");
    trow1.id = "row1";
    var td1 = document.createElement("td");
    var selectList = document.createElement("select");
    var choices = ["Multi Choice", "Multi Choice Select", "Fill in", "Numbers", "Cloze", "Codes", "Grid", "Survey", "Matrix", "Multi Choice drop", "Drag and Drop", "Matching", "Essay", "File Upload"];
    for(var i = 0; i < choices.length; i++) {
        var option = document.createElement('option');
        if(i == 10) {
            option.selected = true;
            //option.disabled = true;
        }
        option.value = choices[i];
        option.text = choices[i];
        selectList.appendChild(option);
    }
    selectList.onchange = function() {createClickHandler2(this,'1')};
    selectList.id = "type_row1";
    selectList.className = "newSelect";
    td1.appendChild(selectList);

    var td2 = document.createElement("td");
    var questionTitle = document.createElement("textarea");
    questionTitle.className = "questionCont";
    questionTitle.value = "Drag and Drop";
    questionTitle.id = "title_row1";
    td2.appendChild(questionTitle);

    var td3 = document.createElement("td");
    var questionInstr = document.createElement("textarea");
    questionInstr.className = "questionCont";
    questionInstr.value = "Locate the parts of the cat";
    questionInstr.id = "instr_row1";
    td3.appendChild(questionInstr);

    var td4 = document.createElement("td");
    var questionEqu = document.createElement("textarea");
    questionEqu.className = "questionCont";
    questionEqu.value = "";
    questionEqu.id = "eqn_row1";
    questionEqu.style.display = "none";
    td4.appendChild(questionEqu);

    var td5 = document.createElement("td");
    var questionCont1 = document.createElement("textarea");
    questionCont1.className = "questionCont";
    questionCont1.value = "cat.jpg";
    questionCont1.id = "1cont_row1";
    td5.appendChild(questionCont1);

    var td6 = document.createElement("td");
    var questionCont2 = document.createElement("textarea");
    questionCont2.className = "questionCont";
    questionCont2.value = "Ear,Eye,Nose,Tongue";
    questionCont2.id = "2cont_row1";
    td6.appendChild(questionCont2);

    var td7 = document.createElement("td");
    var questionCont3 = document.createElement("textarea");
    questionCont3.className = "questionCont";
    questionCont3.value = "{left:215,top:30}, {left:255,top:120},{left:285,top:160},{left:285,top:220}";
    questionCont3.id = "3cont_row1";
    td7.appendChild(questionCont3);

    var td8 = document.createElement("td");
    var bt1 = Util.button("Del", function () {delete_question('1')}, "three");
    td8.appendChild(bt1);

    trow1.appendChild(td1);
    trow1.appendChild(td2);
    trow1.appendChild(td3);
    trow1.appendChild(td4);
    trow1.appendChild(td5);
    trow1.appendChild(td6);
    trow1.appendChild(td7);
    trow1.appendChild(td8);

    t.appendChild(trow1);

    var trow3 = document.createElement("tr");

    var td11 = document.createElement("td");
    td11.className = "instrText";
    td11.appendChild(document.createTextNode("Please select question type"));

    var td22 = document.createElement("td");
    td22.className = "instrText";
    td22.appendChild(document.createTextNode("Please input the title above"));

    var td33 = document.createElement("td");
    td33.className = "instrText";
    td33.appendChild(document.createTextNode("Please input the instruction above"));

    var td44 = document.createElement("td");
    td44.id = "eqnInstr";

    var td55 = document.createElement("td");
    td55.id = "cont1Instr";
    td55.className = "instrText";
    td55.appendChild(document.createTextNode("Please input the image above"));

    var td66 = document.createElement("td");
    td66.className = "instrText";
    td66.id = "cont2Instr";
    td66.appendChild(document.createTextNode("Please input the objects above"));

    var td77 = document.createElement("td");
    td77.className = "instrText";
    td77.id = "cont3Instr";
    td77.appendChild(document.createTextNode("Please input the location of objects above"));

    var td88 = document.createElement("td");
    var bt11 = Util.button("Add", function () {add_question()}, "three");
    td88.appendChild(bt11);

    trow3.appendChild(td11);
    trow3.appendChild(td22);
    trow3.appendChild(td33);
    trow3.appendChild(td44);
    trow3.appendChild(td55);
    trow3.appendChild(td66);
    trow3.appendChild(td77);
    trow3.appendChild(td88);

    t.appendChild(trow3);

    newDiv.appendChild(t);

    var saveQuiz = Util.button("Save Quiz",function () {tableToJson3(data_table); window.location.reload(false);},"three");
    // var submitQuiz = Util.button("Show Quiz",function () {launch(takeNewQuiz, newQuizPayload, 'up3')},"three");
    newDiv.appendChild(saveQuiz);
    // newDiv.appendChild(submitQuiz);

    s.appendChild(newDiv);
    // clearClass("active");
    // document.getElementById("allquizzes").className = "active";
};


function add_question() {
    var table = document.getElementById("data_table");
    var table_len = (table.rows.length) - 1;
    var row = table.insertRow(table_len).outerHTML =
        "<tr id='row" + table_len + "'>" +
        "<td>" + "<select id='type_row" + table_len + "' onchange = 'createClickHandler2(this," + table_len + ")' class = 'newSelect'>" + "<option disabled selected value>" + "-- select question type --" + "</option>" + "<option>" + "Multi Choice" + "</option>" + "<option>" + "Multi Choice Select" + "</option>" + "<option>" + "Fill in" + "</option>" + "<option>" + "Numbers" + "</option>" + "<option>" + "Cloze" + "</option>" + "<option>" + "Codes" + "</option>" + "<option>" + "Grid" + "</option>" + "<option>" + "Survey" + "</option>" + "<option>" + "Matrix" + "</option>" + "<option>" + "Multi Choice drop" + "</option>" + "<option>" + "Drag and Drop" + "</option>" + "<option>" + "Matching" + "</option>" + "<option>" + "Essay" + "</option>" + "</select>" + "</td>" +
        "<td>" + "<textarea class = 'questionCont' id='title_row" + table_len + "' placeholder='Click to input'>" + "</textarea>" + "</td>" +
        "<td>" + "<textarea class = 'questionCont' id='instr_row" + table_len + "' placeholder='Click to input'>" + "</textarea>" + "</td>" +
        "<td>" + "<textarea class = 'questionCont' id='eqn_row" + table_len + "' placeholder='Click to input'>" + "</textarea>" + "</td>" +
        "<td>" + "<textarea class = 'questionCont' id='1cont_row" + table_len + "' placeholder='Click to input'>" + "</textarea>" + "</td>" +
        "<td>" + "<textarea class = 'questionCont' id='2cont_row" + table_len + "' placeholder='Click to input'>" + "</textarea>" + "</td>" +
        "<td>" + "<textarea class = 'questionCont' id='3cont_row" + table_len + "' placeholder='Click to input'>" + "</textarea>" + "</td>" +
        "<td>" + "<input type='button' value='Del' onclick='delete_question(" + table_len + ")' class = 'three'></td></tr>";
}


function delete_question(no) {
    document.getElementById("row" + no + "").outerHTML = "";
}

function createClickHandler2(loc,no){
    console.log(no);
    var eqnInstr = document.getElementById("eqnInstr");
    var cont1Instr = document.getElementById("cont1Instr");
    var cont2Instr = document.getElementById("cont2Instr");
    var cont3Instr = document.getElementById("cont3Instr");
    eqnInstr.innerText = "";
    cont1Instr.innerText = "";
    cont2Instr.innerText = "";
    cont3Instr.innerText = "";
    if (loc.value == "Multi Choice" || loc.value == "Fill in" || loc.value == "Numbers" || loc.value == "Multi Choice drop") {
        document.getElementById('eqn_row' + no).style.display = 'inline';
        eqnInstr.className = "instrText";
        eqnInstr.appendChild(document.createTextNode("Please input the equation above"));
    } else {
        document.getElementById('eqn_row' + no).style.display = 'none';
    }
    if(loc.value == "Multi Choice" || loc.value == "Multi Choice Select" ||  loc.value == "Numbers" || loc.value == "Cloze" || loc.value == "Codes" || loc.value == "Multi Choice drop" || loc.value == "Grid") {
        document.getElementById('1cont_row' + no).style.display = 'none';
        document.getElementById('2cont_row' + no).style.display = 'inline';
        document.getElementById('3cont_row' + no).style.display = 'none';
        cont2Instr.className = "instrText";
        cont2Instr.appendChild(document.createTextNode("Please input the options, requirements, codes above"));

    } else if(loc.value == "Survey" || loc.value == "Matrix" || loc.value == "Matching") {
        document.getElementById('1cont_row' + no).style.display = 'none';
        document.getElementById('2cont_row' + no).style.display = 'inline';
        document.getElementById('3cont_row' + no).style.display = 'inline';
        cont2Instr.className = "instrText";
        cont2Instr.appendChild(document.createTextNode("Please input the first part above"));
        cont3Instr.className = "instrText";
        cont3Instr.appendChild(document.createTextNode("Please input the second part above"));
    } else if(loc.value == "Fill in" || loc.value == "Essay" || loc.value == "File Upload") {
        document.getElementById('1cont_row' + no).style.display = 'none';
        document.getElementById('2cont_row' + no).style.display = 'none';
        document.getElementById('3cont_row' + no).style.display = 'none';
    } else {
        document.getElementById('1cont_row' + no).style.display = 'inline';
        document.getElementById('2cont_row' + no).style.display = 'inline';
        document.getElementById('3cont_row' + no).style.display = 'inline';
        cont1Instr.className = "instrText";
        cont1Instr.appendChild(document.createTextNode("Please input the name of image above"));
        cont2Instr.className = "instrText";
        cont2Instr.appendChild(document.createTextNode("Please input the name of objects above"));
        cont3Instr.className = "instrText";
        cont3Instr.appendChild(document.createTextNode("Please input the location of objects above"));
    }
}


function tableToJson3(table) {
    var datas = []; // first row needs to be headers
    var headers = ["id", "title", "comp"];
    var addOn = "1";
    for (var i = 1; i < table.rows.length - 1; i++) {
        var tableRow = table.rows[i];
        var rowData = {};
        rowData[headers[0]] = addOn;
        rowData[headers[1]] = document.getElementById("title_row"+i).value;

        var instr = [];
        instr.push("Instr");
        instr.push(document.getElementById("instr_row"+i).value);
        instr.push(addOn);

        var eqn;
        if(document.getElementById("eqn_row"+i).value != "") {
            eqn = [];
            eqn.push("Eqn");
            eqn.push(document.getElementById("eqn_row"+i).value);
            eqn.push(addOn);
        } else {
            eqn = [""];
        }

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
            operCont2 = "[" + document.getElementById("2cont_row"+i).value + "]";
            operFinal.push(operCont2);
            operFinal.push(addOn);
        }else if(document.getElementById("type_row"+i).value == "Multi Choice Select"){
            operFinal.push("MCS");
            operCont2 = "[" + document.getElementById("2cont_row"+i).value + "]";
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
            operCont2 = "[" + document.getElementById("2cont_row"+i).value + "]";
            operFinal.push(operCont2);
            operFinal.push(addOn);
        }else if(document.getElementById("type_row"+i).value == "Cloze"){
            operFinal.push("Cloze");
            var newOperCont2 = document.getElementById("2cont_row"+i).value;
            newOperCont2 = newOperCont2.replace(/\n/g, ",");
            newOperCont2 = newOperCont2.replace(/\s\[\]\s/g,",[],");
            operCont2 = "[" + newOperCont2 + "]";
            operFinal.push(operCont2);
            operFinal.push(addOn);
        }else if(document.getElementById("type_row"+i).value == "Codes"){
            operFinal.push("Codes");
            newOperCont2 = document.getElementById("2cont_row"+i).value;
            newOperCont2 = newOperCont2.replace(/\n/g, "<>");
            operCont2 = newOperCont2;
            operFinal.push(newOperCont2);
            operFinal.push(addOn);
        }else if(document.getElementById("type_row"+i).value == "Grid"){
            operFinal.push("Grid");
            operCont2 = "[" + document.getElementById("2cont_row"+i).value + "]";
            operFinal.push(operCont2);
            operFinal.push(addOn);
        }else if(document.getElementById("type_row"+i).value == "Survey"){
            operFinal.push("Survey");
            operCont2 = document.getElementById("2cont_row"+i).value;
            operFinal.push(operCont2);
            operCont3 = "[" + document.getElementById("3cont_row"+i).value + "]";
            operFinal.push(operCont3);
            operFinal.push(addOn);
        }else if(document.getElementById("type_row"+i).value == "Matrix"){
            operFinal.push("Matrix");
            operCont2 = document.getElementById("2cont_row"+i).value;
            operFinal.push(operCont2);
            operCont3 = document.getElementById("3cont_row"+i).value;
            operFinal.push(operCont3);
            operFinal.push(addOn);
        }else if(document.getElementById("type_row"+i).value == "Multi Choice drop"){
            operFinal.push("MCDrop");
            operCont2 = "[" + document.getElementById("2cont_row"+i).value + "]";
            operFinal.push(operCont2);
            operFinal.push(addOn);
        }else if(document.getElementById("type_row"+i).value == "Matching"){
            operFinal.push("Match");
            operCont2 = "[" + document.getElementById("2cont_row"+i).value + "]";
            operFinal.push(operCont2);
            operCont3 = "[" + document.getElementById("3cont_row"+i).value + "]";
            operFinal.push(operCont3);
            operFinal.push(addOn);
        }else if(document.getElementById("type_row"+i).value == "Essay") {
            operFinal.push("Essay");
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
