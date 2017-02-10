Util = {
  aryCons: ([]).constructor,
  strCons: ("").constructor,
  numCons: (-1).constructor,
  /*
   * Returns an html tag filled with the keys and values you pass in Second
   * arg is an object filled with key, value pairs Returns undefined if no
   * valid tag was passed.
   */
  make: function (tag, obj) {
      console.log("make " + tag);
      // without a valid tag we can't continue
      if (typeof tag === "undefined" || !tag) {
          console.error("Util.make failed with tag: " + tag);
          Util.dump(obj);
          return;
      }
      var element = document.createElement(tag);
      for (var i in obj) {
          if (typeof obj[i] !== "undefined" && obj[i] !== null)
              if (i === "innerHTML" && obj[i].nodeName) {
                  element.appendChild(obj[i]);
              } else {
                  element[i] = obj[i];
              }
      }
      return element;
  },

  /*
   * Generic <tr> generator. For the use of Util.table(). You probably
   * shouldn't use this.
   */

  tr: function (list) {
      console.log("new tr");
      var tr = Util.make("tr");
      for (var i = 0; i < list.length; i++) {
          var tElement;
          tElement = Util.make("td", {
              innerHTML: list[i],
          });
          tr.appendChild(tElement);
      }
      return tr;
  },

  /*
   * Takes in a class for the table, a list of elements to be inserted into
   * the table, an optional boolean if there's a header in the table, and an
   * optional function that will accept a list and a bool if the list passed
   * in is the header and return a tr element
   *
   * trFunction should be used to modify escape characters that you pass in
   * through the list. It lets you insert any arbitrary formatting to any tr
   * element based on whatever escape mechanism you choose.
   */

   //list --> list of lists
  table: function (list, header, className) {
      console.log("new table");
      var result = Util.make("table", {
          className: className,
      });

      /*
      if (header) {
          var headList = list.shift();
          var thead = result.createTHead();
          thead.appendChild(trFunction(headList, true));
      }
      */

      var tbody = Util.make("tbody");
      result.appendChild(tbody);
      for (var i = 0; i < list.length; i++) {
          var row = Util.tr(list[i]);
          tbody.appendChild(row);
      }
      return result;
  },
};

//payload - 2D array
function Grade(payload) {
  this.payload = payload;
}

function clearElements(elementID)
{
    console.log("clearing '" + elementID + "'");
    document.getElementById(elementID).innerHTML = "";
}

Grade.prototype.draw = function(c) {
  console.log("draw");
  clearElements('content');
  //var u = new Util();
  var newTable = Util.table(gradepayload, "Grades Table Example", "foo");
  console.log("Appending New Table")
  c.appendChild(newTable);
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
