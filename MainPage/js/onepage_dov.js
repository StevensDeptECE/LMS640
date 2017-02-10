function Grade(payload) {
    this.payload = payload;
}

Grade.prototype.draw = function(c) {
    var t = document.createElement("table");
    t.className = "fooo";
    for (var i = 0; i < this.payload.length; ++i) {
	var r = document.createElement("tr");
	t.appendChild(r);
	for (var j = 0; j < this.payload[i].length; ++j) {
	    var cell = document.createElement("td");
	    r.appendChild(cell);
	}
    }
    c.appendChild(t);
}


void launch(name, payload) {
    var x = eval("new " + name + "(" + payload + ")");
    var c = document.getElementById("content");
    x.draw(c);
}

var gradepayload = [
[1, 2, 3],
[3,4,5],
[10, 50, 90]
];
