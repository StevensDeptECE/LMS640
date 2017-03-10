/* Login construcotr. It currently takes no arguments */
function Login() {
  ;
}


Login.prototype.draw = function(content) {
  console.log("draw");

  var up2 = document.getElementById("up2")

  clearElements("up2");
  var header = Util.h1("Welcome to LMS.");
  up2.appendChild(header);

  clearElements(content);
  var newDiv = Util.div("loginformabs", "");
    var newForm = Util.form("/action_page.php", "", "", ""); //TODO - no php, this is a placeholder
      var newDiv2 = Util.div("container", "");
        var userName = Util.input("text", "", "", value, oninput, onEnter);
        var password = Util.input(type, className, id, value, oninput, onEnter);
        var submitButton = Util.button(value, onClick, className, id);
        var checkbox = Util.input(type, className, id, value, oninput, onEnter);
        newDiv2.appendChild(userName);
        newDiv2.appendChild(password);
        newDiv2.appendChild(submitButton);
        newDiv2.appendChild(checkbox)l
      newForm.appendChild(newDiv2);
      var newDiv3 = Util.div("container", "");
        var cancelButton = Util.button(value, onClick, className, id);
        var forgotPassword = Util.span(innerHTML, className, id);
          var newA = Util.a("#", "password?", className, id);
          forgotPassword.appendChild(newA);
        newDiv3.appendChild(cancelButton);
        newDiv3.appendChild(forgotPassword);
      newForm.appendChild(newDiv3);
    newDiv.appendChild(newForm);


  content.appendChild(newDiv);
  clearClass("active");

  //set active to some other class
  document.getElementById("account").className = "active";
}
