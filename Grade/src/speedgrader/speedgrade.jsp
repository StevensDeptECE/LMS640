 <%@ page  import="java.sql.*" %>
 <%@ page import="com.controller.readFiles" %>
<%@ page language="java" contentType="text/html; charset=Utf-8"
    pageEncoding="utf-8"%>
 <%@page import="java.io.File"%>
<%@page import="java.io.InputStreamReader"%>
<%@page import="java.net.URL"%>
<%@page import="java.io.FileReader"%>
<%@page import="java.io.BufferedReader"%> 

   
 
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
      
  
    
      <hr>
      <h2>Assignment</h2>
      <h5><span class="glyphicon glyphicon-time"></span> </h5>
      
      <p><%
    String filePath = "/Users/xinyu/Desktop/Boggle.java";%>
    <textarea name="message" rows="25" cols="120">
   <%
            
            
            BufferedReader reader = new BufferedReader(new FileReader(filePath));
            //BufferedReader br = new InputStreamReader(new FileInputStream(txtFilePath));
            StringBuilder sb = new StringBuilder();
            String line;

            while((line = reader.readLine())!= null){ %>
         <% 	out.println(line); 
            	  %>
         <%    }
          //out.println(sb.toString()); 
         reader.close();
        %>
      </textarea>
      </p>
      <hr>
      
      <h4>Make a Grade:</h4>
      <form id="myform" name="myform" method="post" action="test2.jsp">
    <input type="text"  name="Grade" />
     <br><br>
     <h4>Leave a Comment:</h4>  
    <div class="form-group">
          <textarea class="form-control" rows="3" required name="Comment"></textarea>
        </div>     
    <input type="submit" value="submit" onclick="window.location.href='test2.jsp'" />
   </form>
     

      
    
      



</body>
</html>
