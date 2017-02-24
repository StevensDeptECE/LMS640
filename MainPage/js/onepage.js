/* A simple example of creating an object, clearing part of a page, and drawing
 * the object.
*/

/* Utilizes functions in mylib.js */


/* Grade payload construcotr. The payload is a 2D array. */
function Grade_Old(payload) {
  this.payload = payload;
}



/* Draw function to clear and then redraw the 'content'
   box with given data. */
Grade_Old.prototype.draw = function(c) {
  console.log("draw");
  clearElements('content');
  //var u = new Util();
  var newTable = Util.table(this.payload, "Grades Table Example", "gradestable", "");
  //TODO add onclick functionality to the reDraw variable and the h1 that gets created
  var reDraw = Util.h1("Redraw Grades", "grades", "redrawgrades");
  //var text = document.createTextNode("Re Draw Grades");
  console.log("Appending New Table");
  c.appendChild(newTable);
  c.appendChild(reDraw);
  document.getElementById("redrawgrades").onclick = function() { console.log("Hello"); };
}

/*
void function launch(name, payload) {
    var x = eval("new " + name + "(" + payload + ")");
    var c = document.getElementById("content");
    x.draw(c);
}
*/



/* Try to stop the clearing of changes when a page refreshes */
/*
if (performance.navigation.type == 1) {
  console.info( "This page is reloaded" );
  //preventDefault()
} else {
  console.info( "This page is not reloaded");
}
*/

var gradepayload = [
[1, 2, 3],
[3,4,5],
[10, 50, 90],
["Angelo", "Zac", "Joey"]
];
