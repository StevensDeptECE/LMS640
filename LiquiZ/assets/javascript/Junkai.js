function Match(types,choices, id) {
    this.id = id;
    this.types=types;
    this.choices = choices;
    this.responses = [];
}

Match.prototype.draw = function(div) {
    var x = document.createElement("div");
    var t = document.createElement("table");
    for (var j = 0; j < this.types.length; j++) {
    var selectList = document.createElement("select");
    for (var i = 0; i < this.choices.length; i++) {
        var option = document.createElement('option');
        option.value = this.choices[i];
        option.text = this.choices[i];
        selectList.appendChild(option);
    }
    var row = document.createElement('tr');
    var cell1 = document.createElement('td');
    var cell2 = document.createElement('td');
    cell1.appendChild(document.createTextNode(this.types[j]));
    cell2.appendChild(selectList);
    row.appendChild(cell1);
    row.appendChild(cell2);
    t.appendChild(row);
}
    x.appendChild(t);
    div.appendChild(x);
}
