/*Contains objects for general components of questions such as 
instructions, and equations */

Instr.prototype.draw = function(div) {
	app(div, this.s);
}

function Eqn(s, id) {
	this.id = id;
	this.s = s;
}

Eqn.prototype.draw = function(div) {
	app(div, this.s);
}