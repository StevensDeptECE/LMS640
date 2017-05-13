<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
    import="com.mongodb.BasicDBObject"
	import="com.mongodb.DB"
	import="com.mongodb.DBCollection"
	import="com.mongodb.DBCursor"
	import="com.mongodb.MongoClient"
	import="java.net.UnknownHostException"
	import="com.sun.org.apache.bcel.internal.generic.NEW"
	import="com.mongodb.DBObject"
	import="com.mongodb.Mongo"
	import="java.util.*"
	import="com.rl.controller.mgdbConnect"
	import="java.text.*"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8">
        <title>Assignment Detail</title>
        <!-- Include Required Prerequisites -->
		<script type="text/javascript" src="//cdn.jsdelivr.net/jquery/1/jquery.min.js"></script>
		<script type="text/javascript" src="//cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
		<link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/bootstrap/3/css/bootstrap.css" />
		 
		<!-- Include Date Range Picker -->
		<script type="text/javascript" src="//cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.js"></script>
		<link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.css" />	
		<link rel="stylesheet" media="screen" href="/HomeWork/style.css">
        <link rel="stylesheet" href="/HomeWork/css/bootstrap.min.css">
        
        
</head>
<body>
<%
	String email =(String)(session.getAttribute("email"));
	String course = (String)(session.getAttribute("course"));
	Mongo mg = new Mongo("Localhost",27017);
	DB db = mg.getDB("person");
	DBCollection coll = db.getCollection("person");
 	BasicDBObject eObj = new BasicDBObject("email",email);//email
 	DBObject eobj = coll.findOne(eObj);
 	BasicDBObject cObj = new BasicDBObject("courseId",course);
 	DB dbCourse = mg.getDB("course");
 	DBCollection coursecoll = dbCourse.getCollection("course");
 	DBObject ccobj = coursecoll.findOne(cObj);
 	
 	DB dbC = mg.getDB(course);
 	DBCollection collc = dbC.getCollection("assigment");
 	DBObject cobj = collc.findOne(eObj);

 	BasicDBObject doc = new BasicDBObject();
 	if(request.getParameter("point")!=null&&request.getParameter("title")!=null&&request.getParameter("hint")!=null){
 		doc.append("name",request.getParameter("title"));
 	 	doc.append("hint",request.getParameter("hint"));
 	 	doc.append("point",request.getParameter("point"));
 	 	doc.append("type","assignment");
 	 	
 	 	DateFormat formatter = new SimpleDateFormat("MM/dd/yyyy"); 
 	 	Date ddl = (Date)formatter.parse(request.getParameter("ddl")); 
 	 	DateFormat format3 = new SimpleDateFormat("MM/dd/yyyy"); 
 	 	Date due = (Date)format3.parse(request.getParameter("due"));
 	 	//Date ddl = new Date(2017, 5, 12, 24, 00, 00);
 	 	//Date due = new Date(2017, 5, 16, 24, 00, 00);
 	 	//Date ddl = (Date)request.getParameter("ddl");
 	 	//<input type="text" name="available" value="04/28/2017 0:00 AM - 05/08/2017 12:00 PM" />
		
 	 	doc.append("ddl",ddl);
 	 	doc.append("courseId",course);
 	 	doc.append("due",due);
 	 	doc.append("number",ccobj.get("studentCapacity"));
 	 	doc.append("TA",ccobj.get("TA"));
 	 	collc.insert(doc);
 	 	String str= "assignmentList.jsp?id="+course;
 	 	response.sendRedirect(str);
 	}
 	
 	mg.close();

%>
     
     <div id = "login">
          <p>
              <a>Hello, <%out.println(eobj.get("name")); %> ! </a>
          </p>
        	<p>
      		  <a href = "login.jsp">Logout</a>
 			</p>
    	</div>
     <div id = "courseDashboard">
     <div class = "coursetitle">
              <p>
                  <bold><% out.println(course);%></bold>
              </p>
    </div>
    <form action="createAssignment.jsp" method="post" name = "form1">  
	    <label >Assignment Name</label>
	            <div class="textarea">
	                <input name="title" maxlength="50" type="text" placeholder="AssignmentName">
	            </div><br>
	    <label >Hint</label> 
	    <div class="textarea">
	                <textarea name="hint" rows="10" placeholder="Hint"></textarea>
	    </div>
	    <br>
	            <div class="textarea">
	        Points:<input name="point" maxlength="50" type="text" placeholder="100">
	            </div><br>
	     <div>
	        Available:<input type="text" name="due" value="05/12/2017" />
	        </div>
		<br>
		<div>
			Deadline:<input type="text" name="ddl" value="05/28/2017" />
		</div>
		<br>
		<div class="button">
	                <a href="assignmentList.jsp?id=<%out.println(course);%>"><button type="submit" ">SAVE</button></a>
	                <a href="assignmentList.jsp?id=<%out.println(course);%>">CANCEL</a>
	    </div>
 	</form>
	

    </div>
</body>
<script src="/HomeWork/script.js" type="text/javascript"></script>
</html>