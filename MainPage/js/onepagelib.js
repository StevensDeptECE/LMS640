/*
  * This file contains useful functions for creating HTML elements and interacting
  * with the HTML page. "Util" is used to create specific HTML elements. All other
  * functions are located below "Util".
*/


Util = {
  aryCons: ([]).constructor,
  strCons: ("").constructor,
  numCons: (-1).constructor,
  /*
   * Returns an html tag filled with the keys and values you pass in. Second
   * arg is an object filled with key, value pairs Returns. undefined if no
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
   * Creates a td (table element) with a given class name and id
  */
  td: function(tElement, className, id) {
    //console.log("new td");
    var td = Util.make("td", {
        className: className, //set td class name
        id: id // set td id
    });
    td.innerHTML = tElement;

    return td;
  },

  /*
   * Creates a th (table element) with a given class name and id
  */
  th: function(tElement, className, id) {
    //console.log("new td");
    var th = Util.make("th", {
        className: className, //set td class name
        id: id // set td id
    });
    th.innerHTML = tElement;

    return th;
  },

  /*
   * Creates a thead (table header). Creates a tr (table row) from tElement.
   * Appends that tr to the thead.
   * The thead has a given class name and id.
   * tElement can be a list or a single element.
  */
  thead: function(tElement, className, id) {
    //console.log("new td");
    console.log("in thead: telement = " + tElement);
    var thead = Util.make("thead", {
        className: className, //set td class name
        id: id // set td id
    });
    var newTr = Util.tr(tElement);
    /*
    for (var i = 0; i < tElement.length; i++) {
      var newTd = Util.td(tElement[i]);
      thead.appendChild(newTd);
    }
    */
    thead.appendChild(newTr);
    //thead.innerHTML = tElement;
    return thead;
  },

  /*
   * Creates a tr (table row) from a list of elements
   * with a given className and id.
   */
  tr: function (list, className, id) {
      //console.log("new tr");
      var tr = Util.make("tr", {
          className: className, //set tr class name
          id: id // set tr id
      });
      for (var i = 0; i < list.length; i++) {
          var tElement;
          /*
          tElement = Util.make("td", {
              innerHTML: list[i],
          });
          */
          /*
          if (header) {
            tElement= Util.thead(list[i]);
          }
          else {
            tElement = Util.td(list[i]);
          }
          */
          tElement = Util.td(list[i]);
          tr.appendChild(tElement);
      }
      return tr;
  },

  tbody: function (className, id) {
    var tbody = Util.make("tbody", {
        className: className, //set tr class name
        id: id // set tr id
    });
    return tbody;
  },

  /*
   * Takes in a class for the table, a list of elements to be inserted into
   * the table, an optional boolean if there's a header in the table, and an
   * optional function that will accept a list and a bool if the list passed
   * in is the header and return a tr element. If you wish to create your own
   * header, pas the header argument as false, create a thead separately,
   * and append it to the table.
   */

   //list --> list of lists
   //header --> boolean of whether or not the first row is a table header
  table: function (list, header, className, id) {
      //console.log("new table");
      var result = Util.make("table", {
          className: className, //set table class name
          id: id // set table id
      });

      var tbody = Util.tbody();
      result.appendChild(tbody);
      for (var i = 0; i < list.length; i++) {
          var row;
          if (header && i == 0) {
            row = Util.thead(list[i]);
            result.appendChild(row);
          }
          else {
            row = row = Util.tr(list[i]);
            tbody.appendChild(row);
          }
      }
      return result;
  },

  /*
   * Most of the following functions only take the innerHTML, the className,
   * and the id of the tag you want, in that order. Any cases that break this
   * rule will be noted explicitly.
   */
  span: function (innerHTML, className, id) {
      return Util.make("span", {
          innerHTML: innerHTML,
          className: className,
          id: id,
      });
  },

  div: function (className, id) {
      return Util.make("div", {
          className: className,
          id: id
      });
  },

  p: function (innerHTML, className, id) {
      return Util.make("p", {
          innerHTML: innerHTML,
          className: className,
          id: id,
      });
  },

  a: function (href, innerHTML, className, id) {
      return Util.make("a", {
          href: href,
          innerHTML: innerHTML,
          className: className,
          id: id,
      });
  },

  h1: function (innerHTML, className, id) {
      return Util.make("h1", {
          innerHTML: innerHTML,
          className: className,
          id: id,
      });
  },

  h2: function (innerHTML, className, id) {
      return Util.make("h2", {
          innerHTML: innerHTML,
          className: className,
          id: id,
      });
  },

  h3: function (innerHTML, className, id) {
      return Util.make("h3", {
          innerHTML: innerHTML,
          className: className,
          id: id,
      });
  },

  h4: function (innerHTML, className, id) {
      return Util.make("h4", {
          innerHTML: innerHTML,
          className: className,
          id: id,
      });
  },

  h5: function (innerHTML, className, id) {
      return Util.make("h5", {
          innerHTML: innerHTML,
          className: className,
          id: id,
      });
  },

  h6: function (innerHTML, className, id) {
      return Util.make("h6", {
          innerHTML: innerHTML,
          className: className,
          id: id,
      });
  },

  strong: function (innerHTML, className, id) {
      return Util.make("strong", {
          innerHTML: innerHTML,
          className: className,
          id: id,
      });
  },

  em: function (innerHTML, className, id) {
      return Util.make("em", {
          innerHTML: innerHTML,
          className: className,
          id: id,
      });
  },

  pre: function (innerHTML, className, id) {
      return Util.make("pre", {
          innerHTML: innerHTML,
          className: className,
          id: id,
      });
  },
  applyStyles: function (elem, styles) {
      var style = elem.style;
      for (var k in styles) {
          style[k] = styles[k];
      }
  },
  text: function (text) {
      return document.createTextNode(text);
  },
  /*
   * This function takes rows and cols as additional arguments
   */
  textarea: function (value, className, id, rows, cols) {
      return Util.make("textarea", {
          value: value,
          className: className,
          id: id,
          rows: rows,
          cols: cols,
      });
  },

  ul: function (innerHTML, className, id) {
      return Util.make("ul", {
          innerHTML: innerHTML,
          className: className,
          id: id,
      });
  },

  ol: function (innerHTML, className, id) {
      return Util.make("ol", {
          innerHTML: innerHTML,
          className: className,
          id: id,
      });
  },

  li: function (innerHTML, className, id) {
      return Util.make("li", {
          innerHTML: innerHTML,
          className: className,
          id: id,
      });
  },

  /*
   * This function takes the src as its first argument instead of innerHTML
   * src is relative to the dir you defined in mediaLocations
   */
  img: function (src, className, id) {
      className = (className || "");
      className = "quizimg" + (className.length > 0 ? " " : "") + className;
      if (!src.startsWith("data:")) {
          src = mediaLocations.img + src;
      }
      return Util.make("img", {
          src: src,
          className: className,
          id: id,
      });
  },

  /*
   * Takes the innerHTML, the className and the id of the tag you want,
   * in that order.
   */
  span: function (innerHTML, className, id) {
      return Util.make("span", {
          innerHTML: innerHTML,
          className: className,
          id: id,
      });
  },

  button: function (value, onClick, className, id) {
      return Util.make("input", {
          type: "button",
          value: value,
          className: className,
          id: id,
          onclick: onClick,
          disabled: (onClick) ? false : true,
      });
  },

  form: function (action, innerHTML, className, id) {
      return Util.make("form", {
          innerHTML: innerHTML,
          className: className,
          id: id,
          action: action,
      });
  },

  input: function (type, className, id, value, oninput, onEnter) {
      onEnter = (typeof onEnter === "undefined") ? function () {} : onEnter;
      return Util.make("input", {
          type: type,
          className: className,
          id: id,
          value: value,
          oninput: oninput,
          onkeydown: function (e) {
              if (e.keyCode === 13) {
                  onEnter(e);
              }
          }
      });
  },

  label: function (htmlFor, innerHTML, className, id) {
      return Util.make("label", {
          htmlFor: htmlFor,
          innerHTML: innerHTML,
          className: className,
          id: id,
      });
  },
};



/*
  * Calls the constructor for the object that needs to be drawn. "object" is the name
  * of that object. "payload" is the thing you need to construct your object.
  * For example if you need a list to construct a certain object, paylod should be a
  * list. It then calls the draw function for the object, and draws it in the HTML
  * element with the id that is passed. If you need to draw in more than one div, do it
  * in the objects corresponding draw function.
*/
var topLoginDrawn = false; //keeps track of whether or not the top login box is on the screen
function launch(object, payload, id) {
  console.log("Calling Launch");
  console.log("Object: " + object);
  console.log(payload);
  console.log("id: " + id);
  console.log("prev active link: " + activeLink);
  var newObject = new object(payload); // grade object
  var content = document.getElementById(id);
  newObject.draw(content);

  //check what 'object' is. If it's the initial load, then no
  //LoginTop object should be drawn
  if (topLoginDrawn == false)
  {
    var content2 = document.getElementById('loginformabs_top');
    var loginTop = new LoginTop();
    loginTop.draw(content2);
    topLoginDrawn = true;
  }
  activeLink = "grade";
}

/* Given an HTML element ID, clears the content the box with that ID. */
function clearElements(elementID)
{
    console.log("clearing '" + elementID + "'");
    document.getElementById(elementID).innerHTML = "";
}

/* Sets the class attribute of an HTML object to nothing */
/* TODO Should only clear if something is not null. Should work for classes and id's */
function clearClass(name)
{
    console.log("Clear Class: " + name);
    var change = document.getElementsByClassName(name);  // Find the elements
    for (var i = 0; i < change.length; i++)
    {
      change[i].className="";    // Change the content
    }
}

/* Sets the onclick attribute of the HTML elements of a given class "className" */
/* TODO not currently used nor tested */
function onclickClass(className, func)
{
    console.log("Onlick Class: " + className);
    var change = document.getElementsByClassName(className);  // Find the elements
    for (var i = 0; i < change.length; i++)
    {
      change[i].onclick = func;    // Change the content
    }
}

/* Sets the onclick attribute of the HTML elements of a given id "id" */
/* TODO not currently used nor tested */
function onclickId(id, func)
{
    console.log("Onlick Class: " + id);
    var change = document.getElementsByClassName(id);  // Find the elements
    change.onclick = func;    // Change the content
}

/* Edit the page's header (div id is 'up2'). Creates an HTML element of type
 * 'object' with inner HTML 'innerHTML' as well as class name 'className' and
 * id 'id'.
 */
//TODO - maybe use make function directly
function editPageHeader(innerHTML, object, className, id)
{
  console.log("Edit page header");
  var up2 = document.getElementById("up2")
  clearElements("up2");
  console.log("HTML ELement: " + object);
  var header = Util.object(innerHTML);
  up2.appendChild(header);
}

//global variable for last visited page
var activeLink = "Home"; //resets on reload - store in file???
