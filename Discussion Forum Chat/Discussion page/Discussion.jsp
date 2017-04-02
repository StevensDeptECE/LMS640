<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Discussion </title>
<link rel="stylesheet" href="bootstrap-3.3.7-dist/css/bootstrap.min.css">
<script src="jquery-3.1.1.min.js"></script>
<script src="bootstrap-3.3.7-dist/js/bootstrap.min.js" ></script>
<script type="text/javascript">
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
} 
</script>

<script type="text/javascript">

$(document).ready(function(){
$("#post").click(function(){	
	var title=document.getElementById("InputSubject").value;
	$("#discusscontent div").prepend("<hr><div id='s'><div>");
	$("#s").html(title);	
	var content=document.getElementById("InputSub").value;
	$("#s").after("<hr><div id='c'><div>");
	$("#c").html(content);	
	var time= getNowFormatDate() ;
	$("#c").after("<br><div id='t'><div>");
	$("#t").html(time);	
	$("#t").after("<hr><h4 id='l'>Leave a Comment:</h4>");
    $("#l").after("<form id='s' role='form'><div class='form-group'><textarea id='text1' class='form-control' rows='3' ></textarea></div><button id='submit' type='button' class='btn btn-primary'>Submit</button></form>"); 

	$("#submit").on("click",function(){		
		var comment=document.getElementById("text1").value;
		var commenttime=getNowFormatDate();
		
		$("#onetime").html(commenttime);
		$("#comment").html(comment);
});
});
});

</script>

<script type="text/javascript">

</script>

</head>
<body>
    <div id="navbar">
     <nav class="navbar navbar-inverse navbar-fixed-top" data-spy="affix">
       <div class="container-fluid">   
         <a class="navbar-brand" href="#">Discussion Board</a>
         <!-- Collect the nav links, forms, and other content for toggling -->
         <div class="collapse navbar-collapse">
           <ul class="nav navbar-nav">
             <li><a href="#">Home</a></li>
             <li class="dropdown active">
               <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Discussion<span class="caret"></span></a>
               <ul class="dropdown-menu">
                 <li><a href="#">Create Discussion</a></li>
                 <li><a href="#">View Discussion</a></li>
               </ul>
             </li>
             <li class="dropdown">
               <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Project<span class="caret"></span></a>
               <ul class="dropdown-menu">
                 <li><a href="#">Create Project</a></li>
                 <li><a href="#">View Project</a></li>
               </ul>
             </li>

		 </ul>
           <form class="navbar-form navbar-left">
             <div class="form-group">
               <input type="text" class="form-control" placeholder="Search">
             </div>             
             <div class="btn-group">
               <button type="button" class="btn btn-primary">Search</button>
             </div>    
           </form>           
           <ul class="nav navbar-nav navbar-right">
             <li><a href="#"><span class="glyphicon glyphicon-log-in" aria-hidden="true"></span> Sign In</a></li>
             <li><a href="#"><span class="glyphicon glyphicon-log-out" aria-hidden="true"></span> Sign Out</a></li>
             <li class="dropdown">
               <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-globe" aria-hidden="true"></span> Quick Links<span class="caret"></span></a>
               <ul class="dropdown-menu">
                 <li><a href="#">LiquiZ</a></li>
                 <li><a href="#">Homework</a></li>
                 <li><a href="#">Grading</a></li>
                 <li class="active"><a href="#">Discussion Board</a></li>
                 <li><a href="#">Calendar</a></li>
               </ul>
             </li>
           </ul>
         </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
     </nav>
    </div>     
     <br><br>
     
     <div id="quickDiscussion" class="container">
       <div class="col-xs-12 col-sm-9">
           <div class="jumbotron">              
                  <h4>Quick Discuss</h4>
                  <div class="form-group">
                    <label class="sr-only" for="InputSubject">Input subject</label>
                    <input type="text" class="form-control" id="InputSubject" placeholder="Subject">
                  </div>
                  <div class="form-group">
                  <label class="sr-only" for="InputBody">Input body</label>
                	 <textarea id="InputSub" class="form-control" rows="3"></textarea>
                  </div>
                  <button id="post" type="button" class="btn btn-primary btn-sm">Post</button>               
           </div>	               
       </div>
     </div>    
         
     <div id="discusscontent" class="container">
       <div class="col-xs-12 col-sm-9">         
         <br><br>            
         <p><span class="badge">2</span> Comments:</p>
         <div class="row">
           <div class="col-sm-2 text-center">
139
             <img src="bandmember.jpg" class="img-circle" height="65" width="65" alt="Avatar">
140
           </div>
141
           <div class="col-sm-10">
142
                 <h4>Anja <small id="onetime"></small></h4>
143
             <p id="comment"></p>
144
             <br>
145
           </div>
146
           
147
         </div>
148
        
149
         
150
     <hr>
151
     <footer><br><br></footer> 
152
   </body>
153
​
154
</html>
