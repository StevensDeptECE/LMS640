 <%@ page  import="java.sql.*" %>
 <%@ page import="com.controller.readFiles" %>
<%@ page language="java" contentType="text/html; charset=Utf-8"
    pageEncoding="utf-8"%>
 <%@page import="java.io.File"%>
<%@page import="java.io.InputStreamReader"%>
<%@page import="java.net.URL"%>
<%@page import="java.io.FileReader"%>
<%@page import="java.io.BufferedReader"%> 
<%@ page import="com.controller.connectDatabase" %>
<%@ page import="com.controller.readFiles" %>
  <%@ page  import="java.util.LinkedHashMap" %>  
<%@ page  import="java.util.Map" %>
<%@ page  import="java.util.HashMap" %>

 
<!DOCTYPE html>
<html lang="en">
<head>

  <title>Bootstrap Example</title>
  <meta charset="utf-8">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.2/css/bootstrap-select.min.css">

<!-- Latest compiled and minified JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.2/js/bootstrap-select.min.js"></script>

<!-- (Optional) Latest compiled and minified JavaScript translation files -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.2/js/i18n/defaults-*.min.js"></script>
  
  <style>
    /* Set height of the grid so .sidenav can be 100% (adjust if needed) */
    .row.content {height: 1500px}
    
    /* Set gray background color and 100% height */
    .sidenav {
      background-color: #f1f1f1;
      height: 100%;
    }
    
    /* Set black background color, white text and some padding */
    footer {
      background-color: #555;
      color: white;
      padding: 15px;
    }
    
    /* On small screens, set height to 'auto' for sidenav and grid */
    @media screen and (max-width: 767px) {
      .sidenav {
        height: auto;
        padding: 15px;
      }
      .row.content {height: auto;} 
    }
  </style>
</head>
<body>

<div class="container-fluid">
  <div class="row content">
    <div class="col-sm-3 sidenav">
      <ul class="nav nav-pills nav-stacked">
        <li class="active"><a href="#section1">Account</a></li>
        <li><a href="#section2">Dashboard</a></li>
        <li><a href="#section3">Course</a></li>
        <li><a href="#section3">Groups</a></li>
        <li><a href="#section3">Calendar</a></li>
        <li><a href="#section3">Inbox</a></li>
        <li><a href="#section3">Commons</a></li>
        <li><a href="#section3">Help</a></li>
      </ul><br>
      
      
      
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Search by tag">
        <span class="input-group-btn">
          <button class="btn btn-default" type="button">
            <span class="glyphicon glyphicon-search"></span>
          </button>
        </span>
      </div>
    </div>

    <div class="col-sm-9">
    
    
    <div class="btn-group">
    <button type="button" class="btn btn-info">Menu</button>
    <button class="btn dropdown-toggle" data-toggle="dropdown">
        <span class="caret"></span>
    </button>
    <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu">
       <li><a tabindex="-1" href="#">Home</a></li>
       <li><a tabindex="-1" href="#">Announcement</a></li>
       <li><a tabindex="-1" href="#">Assignments</a></li>
       <li><a tabindex="-1" href="#">Discussion</a></li>
       <li><a tabindex="-1" href="#">Grade</a></li>
       <li><a tabindex="-1" href="#">People</a></li>
       <li><a tabindex="-1" href="#">Pages</a></li>
       <li><a tabindex="-1" href="#">Files</a></li>
       <li><a tabindex="-1" href="#">Syllabus</a></li>          
       <li><a tabindex="-1" href="#">Outcomes</a></li>
       <li><a tabindex="-1" href="#">Quizzes</a></li>
       <li><a tabindex="-1" href="#">Modules</a></li>
       <li><a tabindex="-1" href="#">Comferences</a></li>
       <li><a tabindex="-1" href="#">Collaborations</a></li>
       <li><a tabindex="-1" href="#">BlackBoard</a></li>
       <li><a tabindex="-1" href="#">Chat</a></li>
    </ul>
</div>


      <hr>
      <div class="container">      
     <button type="button" class="btn btn-info">SpeedGrader</button>
      </div>
      
   
   


<head>

<title>AJAX calls using Jquery in Servlet</title>
        <script src="http://code.jquery.com/jquery-latest.js"> 
$('.selectpicker').selectpicker({
	  style: 'btn btn-info',
	  size: 4
	});
  
        </script>
        <script>
            $(document).ready(function() {                        
                $('#submit').click(function(event) {  
                   // var username=$('#user').val();
                      var username = $("#box1 option:selected").text();
                 $.get('ActionServlet',{user:username},function(responseText) { 
                        $('#message').text(responseText);         
                    });
                });
            });
        </script>
</head>
<body>
<form id="form1">
<!-- <h1>AJAX Demo using Jquery in JSP and Servlet</h1>
Enter your Name: -->
<!-- <input type="text" id="user"/> -->
<select class="selectpicker"  data-style="btn-primary" id="box1">
 <option value="98">HW1Computeprimes</option>
<option value="7122">HW2PrimesUsing MillerRabin</option>
<option value="142">HW3GrowArray</option>
<option value="97">HW4LinkedListclass</option>
<option value="722">HW5TrieDictionary</option>
<option value="14">HW6Sorting</option>
<option value="99">HW7HashMapLinearChaining</option>
<option value="72">HW8Boggle</option>
<option value="42">GraphSearchAlgorithms</option>
</select>
<input type="button" id="submit" value=" Submit"/>
<div id="welcometext">
</div>
</form>
</body>

 
 
    
      <h2>Assignment1</h2>
      <h5><span class="glyphicon glyphicon-time"></span> </h5>
   

<% String s = "assignment1";
String temp = "assignment1";


 
 %>
  <p>
   <% String filePath = "/Users/xinyu/Desktop/"+temp+".java";%>
    <textarea id = "message" name="message" rows="25" cols="120">
 <%          
             BufferedReader reader = new BufferedReader(new FileReader(filePath));
             String line;
             while((line = reader.readLine())!= null){
            	StringBuilder sb = new StringBuilder();
            	sb.append(line);
            	out.println(sb.toString()); 
             }        
         reader.close(); 
 
	 
 reader.close(); 
 
        %>
            
 <%connectDatabase cd = new connectDatabase();
 String path = "/Users/xinyu/Documents/workspaces/TomcatTest/conf/conf.properties";
   cd.insertGrade("1234","4321");
   String fileaddress = cd.getAddress("1620001", "HW1-Compute primes");
   out.println(fileaddress);
   //cd.updataGrade ("ow", "gaile");
   int grade = cd.getGrade("1620001", "cpe64001");
   String comment = cd.getComment("1620001", "cpe64001");
 %>    </textarea>
 </p>
     <%if (grade < 0) {%>
     <h3>Not yet graded</h3>
     <% }%>
     <%if (grade >= 0) {%>
     <h3>Current grade:  <% out.println(grade);%></h3>
     <h3>Current comment:  <% out.println(comment);%></h3>
     <% }%>
     <br></br>
     <button id="startbutton" onclick="myFunction()">Start Grading</button>

<div  id="myDIV" style="visibility:hidden;">
<h4>Make a Grade:</h4>
      <form type="hidden" id="myform" name="myform" method="post" action="transmitToSuccessPage.jsp">
    <input type="text"  name="Grade" />
     <br><br>
     <h4>Leave a Comment:</h4>  
    <div class="form-group">
          <textarea class="form-control" rows="3" required name="Comment"></textarea>
        </div>     
    <input type="submit" value="submit" onclick="window.location.href='transmitToSuccessPage.jsp'" />
   </form>
</div>
<script>
function myFunction() {
    var x = document.getElementById('myDIV');
    var y = document.getElementById('startbutton');
    if (x.style.visibility === 'hidden') {
        x.style.visibility = 'visible';
        y.style.visibility = 'hidden';
    } else {
        x.style.visibility = 'hidden';
        y.style.visibility = 'visible';
    }
}
</script>
     
      
     <!--  <h4>Make a Grade:</h4>
      <form id="myform" name="myform" method="post" action="transmitToSuccessPage.jsp">
    <input type="text"  name="Grade" />
     <br><br>
     <h4>Leave a Comment:</h4>  
    <div class="form-group">
          <textarea class="form-control" rows="3" required name="Comment"></textarea>
        </div>     
    <input type="submit" value="submit" onclick="window.location.href='transmitToSuccessPage.jsp'" />
   </form> -->
</body>
</html>
