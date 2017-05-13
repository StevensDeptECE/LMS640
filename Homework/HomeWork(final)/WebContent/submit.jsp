<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<%@ page language="Java" import="java.lang.*" import="java.util.Scanner"
import="java.io.FileReader" import="java.net.*" %>
<!--...import="src.DisplayFile" 
  DisplayFile log = new DisplayFile();
  //log.display(x);
-->

<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <title>Assignment Detail</title>
        <link rel="stylesheet" media="screen" href="/HomeWork/style.css">
        <link rel="stylesheet" href="/HomeWork/css/bootstrap.min.css">
        <script type="text/javascript">
            
        var upload = function() {
            var assignment = document.getElementById("Assignment");
            var file = assignment.files[0];
            console.log("File name: " + file.fileName);
            console.log("File size: " + file.fileSize);
            console.log("Binary content: " + file.getAsBinary());
            console.log("Text content: " + file.getAsText(""));
           /* var fr = new FileReader;
            fr.onloadend = changeimg;
       
            var preview = document.getElementById("preview");
            preview.src = fr.readAsDataURL(file)
            //preview.src = file.getAsDataURL();
            return false;*/
        };
            
        function readURL(input) {
            var x = document.getElementById("Assignment").value;
            document.getElementById("preview").getAttributeNode.src = x;
            
        }
        </script> 
        
    </head>
    <body>
      <div id = "login">
          <p>
              <a href="">Hello, Yu!</a>
          </p>
        </div>
      <div id = "courseDashboard">
          <div class = "coursetitle" id = "coursetitle">
              <p>
                  <bold>HomeWork_A</bold>
              </p>
          </div>
          <div id = "Questions" class = "requirement">
            <p>
              Implement atoi to convert a string to an integer.<br>
				<br>
                Hint:<br>
                Carefully consider all possible input cases. <br>
                If you want a challenge, please do not see below and ask yourself what are the possible input cases.<br>
				<br>
                Notes: <br>
                It is intended for this problem to be specified vaguely (ie, no given input specs). <br>
                You are responsible to gather all the input requirements up front. <br>
              </p>
          </div>

          <hr WIDTH="300%" SIZE="3" NOSHADE>
              <form method="post" action="/HomeWork/uploadServlet" enctype = "multipart/form-data" onsubmit="return upload();">
                  <br>
                  <input type="file" id="Assignment" name="files[]" multiple onchange="readURL(this);"><br>
                  <input type="Submit" VALUE="Upload"><br>
              </form>

    </div>
        <div class = "quiz">
            <p>Quiz</p>
        </div>
        <div class = "gradesList">
            <p>Grades</p>
        </div>
    </body>
    <script src="/HomeWork/script.js" type="text/javascript"></script>
</html>




<!--...
            <form action="/" method="post" onsubmit="return upload();">
                    <fieldset>
                        <input type="file" id="Assignment" name="files[]" multiple onchange="readURL(this);">
                        <output id="list"></output>
                        <input type="submit" value="Upload">
                        <hr>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                        <Legend>Preview the Assignment</Legend>
                        <p><iframe src="" id ="preview" frameborder="0" height="400" width="95%"></iframe></p>
                  </fieldset>
              </form>
-->