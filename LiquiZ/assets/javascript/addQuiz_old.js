/**
 * Created by yucheng on 3/2/17.
 */

function edit_row_old(no)
{
    document.getElementById("edit_button"+no).style.display="none";
    document.getElementById("save_button"+no).style.display="block";

    var id=document.getElementById("id_row"+no);
    var title=document.getElementById("title_row"+no);
    var instr=document.getElementById("instr_row"+no);
    var eqn=document.getElementById("eqn_row"+no);
    var oper=document.getElementById("oper_row"+no);

    var id_data=id.innerHTML;
    var title_data=title.innerHTML;
    var instr_data=instr.innerHTML;
    var eqn_data=eqn.innerHTML;
    var oper_data=oper.innerHTML;

    id.innerHTML="<input type='text' id='id_text"+no+"' value='"+id_data+"'>";
    title.innerHTML="<input type='text' id='title_text"+no+"' value='"+title_data+"'>";
    instr.innerHTML="<input type='text' id='instr_text"+no+"' value='"+instr_data+"'>";
    eqn.innerHTML="<input type='text' id='eqn_text"+no+"' value='"+eqn_data+"'>";
    oper.innerHTML="<input type='text' id='oper_text"+no+"' value='"+oper_data+"'>";
}

function save_row(no)
{
    var id_val=document.getElementById("id_text"+no).value;
    var title_val=document.getElementById("title_text"+no).value;
    var instr_val=document.getElementById("instr_text"+no).value;
    var eqn_val=document.getElementById("eqn_text"+no).value;
    var oper_val=document.getElementById("oper_text"+no).value;

    document.getElementById("id_row"+no).innerHTML=id_val;
    document.getElementById("title_row"+no).innerHTML=title_val;
    document.getElementById("instr_row"+no).innerHTML=instr_val;
    document.getElementById("eqn_row"+no).innerHTML=eqn_val;
    document.getElementById("oper_row"+no).innerHTML=oper_val;

    document.getElementById("edit_button"+no).style.display="block";
    document.getElementById("save_button"+no).style.display="none";
}

function delete_row(no)
{
    document.getElementById("row"+no+"").outerHTML="";
}

function add_row()
{
    var new_id=document.getElementById("new_id").value;
    var new_title=document.getElementById("new_title").value;
    var new_instr=document.getElementById("new_instr").value;
    var new_eqn=document.getElementById("new_eqn").value;
    var new_oper=document.getElementById("new_oper").value;

    var table=document.getElementById("data_table");
    var table_len=(table.rows.length)-1;
    var row = table.insertRow(table_len).outerHTML=
        "<tr id='row"+table_len+"'>" +
        "<td id='id_row"+table_len+"'>"+new_id+"</td>" +
        "<td id='title_row"+table_len+"'>"+new_title+"</td>" +
        "<td id='instr_row"+table_len+"'>"+new_instr+"</td>" +
        "<td id='eqn_row"+table_len+"'>"+new_eqn+"</td>" +
        "<td id='oper_row"+table_len+"'>"+new_oper+"</td>" +
        "<td><input type='button' id='edit_button"+table_len+"' value='Edit' class='edit' onclick='edit_row_old("+table_len+")' class = 'three'> " +
        "<input type='button' id='save_button"+table_len+"' value='Save' class='save' onclick='save_row("+table_len+")' class = three> " +
        "<input type='button' value='Delete' class='delete' onclick='delete_row("+table_len+")' class = 'three'></td></tr>";

    document.getElementById("new_id").value="";
    document.getElementById("new_title").value="";
    document.getElementById("new_instr").value="";
    document.getElementById("new_eqn").value="";
    document.getElementById("new_oper").value="";
}

//modify this part to test localstoraege
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
        while (left < right) {
            if (oper.charAt(left) != ",") left++;

            if (oper.charAt(right) != ",") right--;

            if (oper.charAt(left) == "," && oper.charAt(right) == ",") break;
        }
        var operTitle = oper.substring(0, left);
        var operId = oper.substring(right + 1, oper.length);

        var operFinal = [];
        operFinal.push(operTitle);

        if (left != right) {
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
            } else if (operTitle == "Matrix") {
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
            } else if (operTitle == "Match") {
                var operMid = oper.substring(left + 1, right);
                var left = 0;
                right = operMid.length - 2;
                while (left < right) {
                    if (operMid.charAt(left) != "]") left++;
                    if (operMid.charAt(right) != "[") right--;
                    if (operMid.charAt(left) == "]" && operMid.charAt(right) == "[") break;
                }
                var operMidOne = operMid.substring(0, left + 1);
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
