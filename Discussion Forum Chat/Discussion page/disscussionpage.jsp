

<%@ page language="java" contentType="text/html; charset=Utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=Utf-8">
 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="jquery-3.1.1.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" ></script>
<script type="text/javascript">

var jsonObj={student:[
	{name:"luoyu",sex:"male"},
	{name:"zhangyang",sex:"male"}
]};

function showJson(){	
	alert(jsonObj.student[0].name);	
}
function showSigninwindow(){
	var id,password;
	id=prompt("ID:");
	password=prompt("PASSWORD:");
	if(id==jsonObj.student[0].name){
		alert("sign in successfully!");
	}
	else{
		alert("use the correct id!");
	}
}
</script>

</head>
<body>

<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">
        <p> CPE-640-project </p>
      </a>
    </div>
    
    <div class="collapse navbar-collapse">
    	<ul class="nav navbar-nav navbar-right">
    	<li><input name="button" type="button" onClick="showSigninwindow()" value="Sign in"/> </li>
    	<li><a href="#">out</li>
    	</ul>
    </div>
  
  </div>
</nav>


	<ul class="nav nav-tabs nav-justified">
  		<li><a href="#">operation 1</a></li>
  		<li><a href="#">operation 2</a></li>
  		<li><a href="#">operation 3</a></li>
	</ul>
	<ul class="nav nav-pills nav-justified">
  		<li><a href="#">operation 4</a></li>
  		<li><a href="#">operation 5</a></li>
  		<li><a href="#">operation 6</a></li>
	</ul>


<div class="container">
	
	<div class="page-header">
  		<h1>Talking forum/discussion page<small></small></h1>
		</div>
 	<div class="jumbotron">
        <h1>Hi,everyone</h1>
        <p>This is a forum which can help the students and professor communicate</p>
        <p><a href="https://640project.wikispaces.com/" target="_blank">Like this »</a></p>
      </div>
      
     <div class="row">
      <div class="col-xs-8 "> 
   
 <div class="panel panel-primary">
    <div class="panel-heading">
        <h3 class="panel-title">Question 1</h3>
    </div>
    <div class="panel-body">
       Question Content
    </div>
    <ul class="list-group">
        <li class="list-group-item">reply 1</li>
        <li class="list-group-item">reply 2</li>
        <li class="list-group-item">reply 3</li>        
    </ul>
</div>

<div class="panel panel-success">
    <div class="panel-heading">
        <h3 class="panel-title">Question 2</h3>
    </div>
    <div class="panel-body">
        Question Content
    </div>
</div>

<div class="panel panel-info">
    <div class="panel-heading">
        <h3 class="panel-title">Question 3</h3>
    </div>
    <div class="panel-body">
        Question Content
    </div>
</div>

<div class="panel panel-warning">
    <div class="panel-heading">
        <h3 class="panel-title">Question 4</h3>
    </div>
    <div class="panel-body">
        Question Content
    </div>
</div>

<div class="panel panel-danger">
    <div class="panel-heading">
        <h3 class="panel-title">Question 5</h3>
    </div>
    <div class="panel-body">
        Question Content
    </div>
    </div>

</div>    

	<div class="col-xs-4 "> 
		<div class="panel panel-default">
  <!-- Default panel contents -->
  <div class="panel-heading">Group member</div>
  <div class="panel-body"> 
    <p>The information of the forum member</p>
  </div>
	<form>
	<input name="press to display" type="button" value="press me"onclick="showJson()"/>
	</form>
  
</div> 
     
     
     <div class="panel panel-default">
  <!-- Default panel contents -->
  <div class="panel-heading">Operation part</div>
  <div class="panel-body">
    <p>You can choose to create a new question or
       turn to other pages...	
    </p>
  </div>

  <!-- Table -->
  <table class="table">
    ...
  </table>
</div>

	<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="https://www.youtube.com/watch?v=909Ewzg5x3k"></iframe>
</div>

  </div>
   </div>
</div>
     

      
	<!-- HTML注释 -->
	<%-- JSP注释 --%>

</body>
</html>