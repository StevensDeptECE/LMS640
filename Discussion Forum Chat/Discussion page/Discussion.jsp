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
var user =[
	{name:"luoyu",
	 sex:"male",
	 cwid:"1041511",
	 picture:"url"},
	
	{name:"zhangyang",
     sex:"male",
     cwid:"1041512",
     picture:"url"}

];

var time =new Date();

var discussion=[
	{		"id": "1",	
			"subject": "CSP",
			"user":user[0].name,					
			"posttime":time,
			"content":"text",						
			"reply"	:[{"user":user[0].name,"content":"text","reply_time":time},
					  {"user":user[1].name,"content":"text","reply_time":time},
					  ]
					  }]; 
					  
$(function(){
	$("#post").click(function(){			
		  $("#s").html($("#InputSubject").val());			 
		  $("#c").html($("#InputBody").val());			  
		  var now=nowtime();		  
		  $("#posttime").append(now);
});
});
function nowtime(){
    var mydate = new Date();
    var str = "" + mydate.getFullYear();
    var mm = mydate.getMonth()+1
    if(mydate.getMonth()>9){
     str += mm;
    }
    else{
     str += "0" + mm;
    }
    if(mydate.getDate()>9){
     str += mydate.getDate();
    }
    else{
     str += "0" + mydate.getDate();
    }
    return str;
  }
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
               <form role="form">
                  <h4>Quick Discuss</h4>
                  <div class="form-group">
                    <label class="sr-only" for="InputSubject">Input subject</label>
                    <input type="text" class="form-control" id="InputSubject" placeholder="Subject">
                  </div>
                  <div class="form-group">
                  <label class="sr-only" for="InputBody">Input body</label>
                  <textarea class="form-control" id="InputBody "rows="3" placeholder="Body"></textarea>
                  </div>
                  <button id="post" type="button" class="btn btn-primary btn-sm">Post</button>
               </form>
           </div>	               
       </div>
     </div>    
         
     <div id="discusscontent" class="container">
       <div class="col-xs-12 col-sm-9">
	     <hr>
	    	<div id="s"> <h2></h2></div>
	    <hr>
	     	<div id="c" class="panel-body">
    			<p></p>
  				</div>
         <h5 ><span class="glyphicon glyphicon-time" id="posttime" >&nbsp;</span> </h5>
         <hr>
         
         <h4>Leave a Comment:</h4>
         <form role="form">
           <div class="form-group">
             <textarea class="form-control" rows="3" required></textarea>
           </div>
           <button type="submit" class="btn btn-primary">Submit</button>
         </form>
         <br><br>     
         <p><span class="badge">2</span> Comments:</p><br> 
         <div class="row">
           <div class="col-sm-2 text-center">
             <img src="bandmember.jpg" class="img-circle" height="65" width="65" alt="Avatar">
           </div>
           <div class="col-sm-10">
	         <h4>Anja <small>Jan 29, 2017, 9:12 PM</small></h4>
             <p>Keep up the GREAT work! I am cheering for you!! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
             <br>
           </div>
           <div class="col-sm-2 text-center">
             <img src="bird.jpg" class="img-circle" height="65" width="65" alt="Avatar">
           </div>
           <div class="col-sm-10">
             <h4>John Row <small>Jan 28, 2017, 8:25 PM</small></h4>
             <p>I am so happy for you man! Finally. I am looking forward to read about your trendy life. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
             <br>
           </div>
         </div>
         
         <hr>  
         
         <h2>How to learn JS and CSS?</h2>
         <h5><span class="glyphicon glyphicon-time"></span> Post by Yang Liu, Jan 27, 2017.</h5>
         <p>Food is my passion. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
         <hr>
         <h4>Leave a Comment:</h4>
         <form role="form">
           <div class="form-group">
             <textarea class="form-control" rows="3" required></textarea>
           </div>
           <button type="submit" class="btn btn-primary">Submit</button>
         </form>
         <br><br>     
         <p><span class="badge">2</span> Comments:</p><br> 
         <div class="row">
           <div class="col-sm-2 text-center">
             <img src="bandmember.jpg" class="img-circle" height="65" width="65" alt="Avatar">
           </div>
           <div class="col-sm-10">
	         <h4>Anja <small>Jan 29, 2017, 9:12 PM</small></h4>
             <p>Keep up the GREAT work! I am cheering for you!! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
             <br>
           </div>
           <div class="col-sm-2 text-center">
             <img src="bird.jpg" class="img-circle" height="65" width="65" alt="Avatar">
           </div>
           <div class="col-sm-10">
             <h4>John Row <small>Jan 28, 2017, 8:25 PM</small></h4>
             <p>I am so happy for you man! Finally. I am looking forward to read about your trendy life. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
             <br>
           </div>
         </div>  
       </div>
     </div>
     <hr>
     <footer><br><br></footer> 
   </body>

</html>