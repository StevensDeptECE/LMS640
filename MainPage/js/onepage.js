/* Utilizes functions in mylib.js */

/* Try to stop the clearing of changes when a page refreshes */
if (performance.navigation.type == 1) {
  console.info( "This page is reloaded" );
  //preventDefault()
} else {
  console.info( "This page is not reloaded");
}


/* Grade payload construcotr. The payload is a 2D array. */
function Grade(payload) {
  this.payload = payload;
}

/* Given an HTML element ID, clears the content the box with that ID. */
function clearElements(elementID)
{
    console.log("clearing '" + elementID + "'");
    document.getElementById(elementID).innerHTML = "";
}

/* Draw function to clear and then redraw the 'content'
   box with given data. */
Grade.prototype.draw = function(c) {
  console.log("draw");
  clearElements('content');
  //var u = new Util();
  var newTable = Util.table(gradepayload, "Grades Table Example", "gradestable");
  //TODO add onclick functionality to the reDraw variable and the h1 that gets created
  var reDraw = Util.h1("Redraw Grades", "grades", "redrawgrades");
  //var text = document.createTextNode("Re Draw Grades");
  console.log("Appending New Table");
  c.appendChild(newTable);
  c.appendChild(reDraw);
  document.getElementById("redrawgrades").onclick = function() { console.log("Hello"); };
}

//TEST - launch with grade payload
function launch(name, payload) {
  console.log("Calling Launch");
  console.log(name);
  var x = new name(payload);
  var c = document.getElementById("content");
  x.draw(c);
}
/*
void function launch(name, payload) {
    var x = eval("new " + name + "(" + payload + ")");
    var c = document.getElementById("content");
    x.draw(c);
}
*/
var gradepayload = [
[1, 2, 3],
[3,4,5],
[10, 50, 90],
["Angelo", "Zac", "Joey"]
];
