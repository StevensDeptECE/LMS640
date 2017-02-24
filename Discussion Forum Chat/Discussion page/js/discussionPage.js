var o = document.body;
function createTable(w,h,r,c) // draw table
{
    var table = document.createElement("table");
    var tbody = document.createElement("tbody");
    table.width = w;
    table.height = h;
    table.border = 1; 
    for(var i=1;i<=r;i++)
    {
        var tr = document.createElement("tr");
        for(var j=1;j<=c;j++)
        {
            var td = document.createElement("td");
            td.innerHTML = i + "" + j;
            //td.appendChild(document.createTextNode(i + "" + j));
            td.style.color = "#FF0000";
            tr.appendChild(td);
        }
        tbody.appendChild(tr); 
    }
    table.appendChild(tbody);
    o.appendChild(table);
}
createTable(270,270,9,9);