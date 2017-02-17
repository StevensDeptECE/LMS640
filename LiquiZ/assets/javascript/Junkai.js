function Match(types,choices, id) {
    this.id = id;
    this.types=types;
    this.choices = choices;
    this.responses = [];
}

Match.prototype.draw = function(div) {  
    for (var j=0;j<this.types.length;j++){
        var x = document.createElement('div');
        var selectList = document.createElement("select");
        for (var i = 0; i < this.choices.length; i++) {
            var option = document.createElement('option');
            option.value = this.choices[i];
            option.text = this.choices[i];
            selectList.appendChild(option);
        }
        var label = document.createElement('label');
        label.appendChild(document.createTextNode(this.types[j]));
        x.appendChild(label);
        x.appendChild(selectList);

        div.appendChild(x);
    }
}
