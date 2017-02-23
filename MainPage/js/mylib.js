/* This file contains useful functions for creating HTML elements and interacting
*  with the HTML page. "Util" is used to create specific HTML elements. All other
* functions are located below Util.
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
   * Generic <tr> generator. For the use of Util.table().
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
  table: function (list, header, className, id) {
      console.log("new table");
      var result = Util.make("table", {
          className: className,
          id: id
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
};

/*
  * Calls the constructor for the object that needs to be drawn. "Name" is the name
  * of that object. "payload" is the thing you need to construct your object.
  * For example if you need a list to construct a certain object, paylod should be a
  * list. It then calls the draw function for the object, and draws it in the HTML
  * element with the id that is passed.
*/
function launch(name, payload, id) {
  console.log("Calling Launch");
  console.log(name);
  console.log(payload);
  var x = new name(payload); // grade object
  var c = document.getElementById(id);
  x.draw(c);
}

/* Given an HTML element ID, clears the content the box with that ID. */
function clearElements(elementID)
{
    console.log("clearing '" + elementID + "'");
    document.getElementById(elementID).innerHTML = "";
}

/* Sets the class attribute of an HTML object to nothing */
function clearClass(name)
{
    console.log("Clear Class: " + name);
    var change = document.getElementsByClassName(name);  // Find the elements
    for (var i = 0; i < change.length; i++)
    {
      change[i].className="";    // Change the content
    }
}

/* Sets the onclick attribute of to HTML elements of a given class "name" */
/* TODO not currently used */
function onclickClass(name, func)
{
    console.log("Onlick Class: " + name);
    var change = document.getElementsByClassName(name);  // Find the elements
    for (var i = 0; i < change.length; i++)
    {
      change[i].onclick = func;    // Change the content
    }
}
