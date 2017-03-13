<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link href="css/style.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="js/jquery.js"></script> 
<script type="text/javascript" src="js/jquery.tablesorter.js"></script> 
</head>
<body>

<ul class="navigation">
  <li><a class="account" href="#">Account</a></li>
  <li><a href="#">Dashboard</a></li>
  <li><a class="active" href="#">Course</a></li>
  <li><a href="#">Groups</a></li>
  <li><a href="#">Calendar</a></li>
  <li><a href="#">Inbox</a></li>
  <li><a href="#">Commons</a></li>
  <li><a href="#">Help</a></li>
</ul>

<div class="right">
<div class="up1">
<div class="dropdown">
<button class="menu"><span>Menu</span></button>
  <div class="dropdown-menu" style="left:0;">
    <a href="#">Home</a>
    <a href="#">Announcements</a>
    <a href="#">Assignments</a>
    <a href="#">Discussions</a>
    <a href="#">Grades</a>
    <a href="#">People</a>
    <a href="#">Pages</a>
    <a href="#">Files</a>
    <a href="#">Syllabus</a>
    <a href="#">Outcomes</a>
    <a href="#">Quizzes</a>
    <a href="#">Modules</a>
    <a href="#">Conferences</a>
    <a href="#">Collaborations</a>
    <a href="#">Blackboard</a>
    <a href="#">Chat</a>
  </div>
</div>
<div  class="nav-top">
<nav>
<ul>
<li><span><a href="#">DOV DEV</a></span></li>
<span> > </span>
<li><span class="nav-grade"><a href="#">Grade</a></span></li>
</ul>
</nav>
</div>
</div>
<hr style="clear:left; margin-top:4em;">

<div class="up2">
<button class="aggreate" style="margin-left:10px;">Grade</button>
<button class="aggreate" onclick="window.location.href='grades distribution.html'" formtarget="_blank">SpeedGrader</button>
<button class="button" style="float:right;">Individual View</button>
<button class="button" style="float:right;">Showing All Section</button>
</div>
<hr style="clear:left; margin-top:4em;">

<div class="up3">
<style>
div.ex1 {
   height: 50px;
    width:200 %;
    background-color:#CCCCCC;}
</style>
<div class="ex1">Name: John Woo</div>
 <div class="ex1">Assignment for test</div>

<style>
.div1 {
    float: left;
    width: 520px;
    height: 500px;
    margin: 10px;
    border: 3px solid #73AD21;
}

.div3 {
    float: right;
    width: 520px;
    height: 500px;
    margin: 10px;
    border: 3px solid #73AD21;
}


</style>


<div class="div1">

<br>
   <th>Grade </th>
   <input type="text" style="height:30px;width:30px">
   <th>out of 100</th>
  </br>
<br>
   <th>Assignment Comments</th>
  </br>
  <br>
   
   <input type="text" style="height:100px;width:280px">
   
  </br> 

</div>
<div class="div3">Submission
</br>
  <p>This student does not have a submission for this assignment</p>
  <br>


</div>

<button class="in-ex" style="float:left">submit</button>
<button class="in-ex" style="float:right">submit</button>
<br>
</div>


<script type="text/javascript">
$(document).ready(function() { 
    $("#keywords").tablesorter(); 
});
</script>

</body>
</html>
