<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
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
             <a href="">Hello, Dov!</a>
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
             Implement atoi to convert a string to an integer.

               Hint:
               Carefully consider all possible input cases. 
               If you want a challenge, please do not see below and ask yourself what are the possible input cases.

               Notes: 
               It is intended for this problem to be specified vaguely (ie, no given input specs). 
               You are responsible to gather all the input requirements up front. 
             </p>
         </div>

         <hr WIDTH="300%" SIZE="3" NOSHADE>
         <h1>Download List</h1>
         <hr WIDTH="300%" SIZE="3" NOSHADE>
         	<c:forEach items="${downFiles}" var="fileName">
         		<a href="/HomeWork/DownServlet?fileName=${fileName}">${fileName}</a><br>
         	</c:forEach>
         	

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