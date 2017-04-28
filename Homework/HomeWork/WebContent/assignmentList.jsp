<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
    import="com.mongodb.BasicDBObject"
	import="com.mongodb.*"
	import="com.mongodb.DBCollection"
	import="com.mongodb.DBCursor"
	import="com.mongodb.MongoClient"
	import="java.net.UnknownHostException"
	import="com.sun.org.apache.bcel.internal.generic.NEW"
	import="com.mongodb.DBObject"
	import="com.mongodb.Mongo"
	import="java.util.*"
	import="com.rl.controller.mgdbConnect"
	%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8">
        <title>Course</title>
        <link rel="stylesheet" media="screen" href="/HomeWork/style.css">
        <link rel="stylesheet" href="/HomeWork/css/bootstrap.min.css">
        <script type="text/javascript">    
        </script>      
</head>
<body>
     <%
     	String email = (String)(session.getAttribute("email"));
     	String course = request.getParameter("id");
     	if(course == null){
     		course = (String)(session.getAttribute("course"));
     	}
     	session.setAttribute("email", email);
     	session.setAttribute("course", course);
	    Mongo mg = new Mongo("Localhost", 27017);
	    System.out.println(course);
	    DB db = mg.getDB("person");
  		DBCollection coll = db.getCollection("person");
     	BasicDBObject eObj = new BasicDBObject("email",email);//email
     	DBObject eobj = coll.findOne(eObj);
     	
     	DB cour = mg.getDB("course");
	 	DBCollection ccour = cour.getCollection("course");
	 	BasicDBObject courObj = new BasicDBObject("courseId",course);//email
	 	DBObject courobj = ccour.findOne(courObj);
	 	String Instructor = (String)courobj.get("instructor");
	 	String TA = (String)courobj.get("TA");
     	
     	DB dbC = mg.getDB(course);
     	DBCollection collc = dbC.getCollection("assigment");
     	BasicDBObject doc = new BasicDBObject();
     	DBCursor cursor = collc.find();
     	
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
                  <bold><%out.println(course); %></bold>
              </p>
          </div>
          <div class = "course">
            
            <% 	
            
				try{
					while(cursor.hasNext()){
						DBObject str = cursor.next();
						%>
		     			<hr />
		     			<h2><a href = "assignment.jsp?id=<%out.println(str.get("name"));%>"><%out.println(str.get("name"));%></a></h2>
		     			<h4><%
		     			Date due = (Date)str.get("due");
		     			Date ddl = (Date)str.get("ddl");
		     			Date now = new Date();
		     			if(now.compareTo(ddl)<0){
		     				out.println("Avaliable until:"+ddl.toString()+"   Due:" + due.toString()+"   Points:"+str.get("point"));	
		     			}else{
		     				out.println("cloesd"+"   Due:" + due.toString()+"   Points:"+str.get("point"));
		     			}
		     			%></h4>
			<% 
		     		}
				}
				finally
				{
					cursor.close();
				}
            if(eobj.get("name").equals(Instructor)||eobj.get("name").equals(TA)){
            	%>	   	
        		<p>
	            <a href = "course.jsp?id=<%out.println(course);%>">Return</a>
	     		</p>
	     		
            	</div>
        </div>
            	<div id = "createAssignment">
            	<p>
                <a href = "createAssignment.jsp?id=<%out.println(course);%>">CreateAssignment</a>
            	</p>
        		</div>
        <% 
            }else{
            	%>
          
        		<p>
	            <a href = "course.jsp?id=<%out.println(course);%>">Return</a>
	     		</p>
	     		
            	</div>
        </div>
            	<%
            }
				mg.close();
				
     		%>
            
          
     	
     	
     	
     
     
</body>
<script src="/HomeWork/script.js" type="text/javascript"></script>
</html>