/* Login construcotr. It currently takes no arguments */
function LoginTop(payload) {
  this.payload = payload;
}


LoginTop.prototype.draw = function(content) {
  console.log("draw");

  var newDiv = Util.div("loginformabs_top", "");
    var newForm = Util.form("/action_page.php", "", "", ""); //TODO - no php, this is a placeholder
      var newDiv2 = Util.div("container", "");
        var userNameTxt = Util.label("", "Username", "", "");
        var userName = Util.input("text", "", "", "Username", "", "");
        var passwordTxt = Util.label("", "Password", "", "");
        var password = Util.input("password", "", "", "Password", "", "");
        var submitButton = Util.button("submit", "", "", "");
        var checkbox = Util.input("checkbox", "", "", "", "", "");
        var newLabel = Util.label("", "Remember me", "", "")
        newDiv2.appendChild(userNameTxt);
        newDiv2.appendChild(userName);
        newDiv2.appendChild(passwordTxt);
        newDiv2.appendChild(password);
        newDiv2.appendChild(submitButton);
        newDiv2.appendChild(checkbox);
      newForm.appendChild(newDiv2);
      var newDiv3 = Util.div("container", "");
        var cancelButton = Util.button("Cancel", "", "cancelbtn", "");
        var forgotPassword = Util.span("Forgot ", "psw", "");
          var newA = Util.a("#", "password", "", "");
          forgotPassword.appendChild(newA);
        newDiv3.appendChild(cancelButton);
        newDiv3.appendChild(forgotPassword);
      newForm.appendChild(newDiv3);
    newDiv.appendChild(newForm);

  content.appendChild(newDiv);
}
