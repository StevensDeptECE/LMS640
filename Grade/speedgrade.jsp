 <%@ page  import="java.sql.*" %>
 
<%@ page language="java" contentType="text/html; charset=Utf-8"
    pageEncoding="utf-8"%>
  
   
 
<!DOCTYPE html>
<html lang="en">
<head>

  <title>Bootstrap Example</title>
  <meta charset="utf-8">
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

<%
// DB.connect();
//Properties p;
//p.load("conf/lms640.conf");

//String userid = p.getAttribute("userid");
 		/*  String usr ="xinyu";
 		String pwd ="679000";
 		String url ="jdbc:postgresql://localhost:5432/xinyu";

 		try
 		{
 			Class.forName("org.postgresql.Driver");
 			System.out.println("Success loading Driver!");
 		}

 		 catch(Exception e)
 		{
 			System.out.println("Fail loading Driver!");
 			e.printStackTrace();
 		} 

 		 try
 		{ 
 			 Connection conn = DriverManager.getConnection(url, usr, pwd);
 			System.out.println("Success connecting server!");

 			Statement stmt = conn.createStatement();
 			 ResultSet rs = stmt.executeQuery("SELECT * FROM Sales");
 			String cust=rs.getString("cust");
 			out.println(cust); 
 		}

 		 catch(SQLException e)
 		{
 			System.out.println("Connection URL or username or password errors!");
 			e.printStackTrace();
 		}  
 		 */
 %>
   <%-- <sql:query
 		dataSource="${xinyu}"
 		var="result"
 		select * from sales>
 		</sql:query>

 		
 		<c:forEach var="param"  items="${result}">
<td><c:out value="${param.cust}" /></td>
</c:forEach>
 		 --%>
 		
 		
      <hr>
      <div class="container">      
     <button type="button" class="btn btn-info">SpeedGrader</button>
      </div>
      
  
      
      
      <hr>
      <h2>Assignment</h2>
      <h5><span class="glyphicon glyphicon-time"></span> Post by John Doe, Mar 24, 2017.</h5>
      
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
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
