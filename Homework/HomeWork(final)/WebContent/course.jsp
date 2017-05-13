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
	    Mongo mg = new Mongo("Localhost", 27017);
	  	DB db = mg.getDB("person");
  		DBCollection coll = db.getCollection("person");
     	BasicDBObject eObj = new BasicDBObject("email",email);//email
     	DBObject obj = coll.findOne(eObj);
     	session.setAttribute("email", email);
     	DBObject course = (DBObject)obj.get("course");
     	DB dbCourse = mg.getDB("course");
     	DBCollection coursecoll = dbCourse.getCollection("course");
     	%>
     	<div id = "login">
          <p>
              <a id = person, value = <%out.println(obj.get("name")); %>>Hello, <%out.println(obj.get("name")); %> ! </a>
          </p>
          <p>
        	<a href = "login.jsp">Logout</a>
 		  </p>
    	</div>
    	<div id = "courseDashboard">
          <div class = "coursetitle">
              <p>
                  <bold>Course</bold>
              </p>
          </div>
          <div class = "course">
            <table class = "table table-hover">
            <% 	Map c = course.toMap();
            	System.out.println(c.toString());
     			Iterator it = c.entrySet().iterator();
				try{
					while(it.hasNext()){
		     			Map.Entry entry = (Map.Entry) it.next();
		     			String cc = (String)entry.getValue();
		     			System.out.println(cc);
                   		BasicDBObject cObj = new BasicDBObject("courseId",cc);//email
                  		DBObject objcc = coursecoll.findOne(cObj);
                  		//System.out.println(objcc.get("name").toString());
                  		Date d = new Date();
                  		System.out.println(d);
                  		%>
		     	<tr>
                  <th>
                      <h2><a href="assignmentList.jsp?id=<%out.println(entry.getValue());%>"><%out.println(entry.getValue()+" "+objcc.get("name"));%></a></h2>
                  </th>
              </tr>
              <%
		
		     		}
				}
				finally
				{
					
				}
				mg.close();
     		%>
            </table>
           
          </div>
        </div>
     	
     	
     	
     
     
</body>
<script src="/HomeWork/script.js" type="text/javascript"></script>
</html>