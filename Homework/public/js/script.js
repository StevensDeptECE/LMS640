//登录用户
function checkuser() {
         if($('uname' == "lala") && $('pwd') == "123") {
           return true;
         }else {
            return false;
         }
      }

function $(id) {
        return document.getElementById(id).value;
      }