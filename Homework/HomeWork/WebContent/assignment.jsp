<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE HTML>
<%@ page language="Java" import="java.lang.*" import="java.util.Scanner"
	import="com.mongodb.Mongo"
	import="java.io.FileReader" 
	import="java.net.*" 
	import="com.mongodb.BasicDBObject"
	import="com.mongodb.DB"
	import="com.mongodb.DBCollection"
	import="com.mongodb.DBCursor"
	import="com.mongodb.MongoClient"
	import="java.net.UnknownHostException"
	import="com.sun.org.apache.bcel.internal.generic.NEW"
	import="com.mongodb.DBObject"
	import="java.util.*"
	import="com.rl.controller.mgdbConnect"%>


<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <title>Assignment Detail</title>
        <link rel="stylesheet" media="screen" href="/HomeWork/style.css">
        <link rel="stylesheet" href="/HomeWork/css/bootstrap.min.css">
        <script type="text/javascript">
            
        var upload = function() {
            var assignment = document.getElementById("Assignment");
            var file = assignment.files[0];
            console.log("File name: " + file.fileName);
            console.log("File size: " + file.fileSize);
            console.log("Binary content: " + file.getAsBinary());
            console.log("Text content: " + file.getAsText(""));
           /* var fr = new FileReader;
            fr.onloadend = changeimg;
       
            var preview = document.getElementById("preview");
            preview.src = fr.readAsDataURL(file)
            //preview.src = file.getAsDataURL();
            return false;*/
        };
            
        function readURL(input) {
            var x = document.getElementById("Assignment").value;
            document.getElementById("preview").getAttributeNode.src = x;
            
        }
        </script> 
        
    </head>
    <body>
    <%
	    String email = (String)(session.getAttribute("email"));
		String assignment = request.getParameter("id");
		System.out.println(assignment);
		String course = (String)(session.getAttribute("course"));
		Mongo mg = new Mongo("Localhost",27017);
		DB db = mg.getDB("person");
		DBCollection coll = db.getCollection("person");
	 	BasicDBObject eObj = new BasicDBObject("email",email);//email
	 	DBObject eobj = coll.findOne(eObj);
	 	
	 	DB dbC = mg.getDB(course);
	 	DBCollection collc = dbC.getCollection("assigment");
	 	BasicDBObject cObj = new BasicDBObject("name",assignment);//_id
	 	DBObject cobj = collc.findOne(cObj);
	 	
	 	DB cour = mg.getDB("course");
	 	DBCollection ccour = cour.getCollection("course");
	 	BasicDBObject courObj = new BasicDBObject("courseId",course);//email
	 	DBObject courobj = ccour.findOne(courObj);
	 	String Instructor = (String)courobj.get("instructor");
	 	String TA = (String)courobj.get("TA");
	 	System.out.println("TA:"+TA+" Instructor"+Instructor);
	 	
	 	session.setAttribute("person", eobj.get("name"));
	 	session.setAttribute("assignment", assignment);
	 	session.setAttribute("course", course);
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
          <div class = "coursetitle" id = "coursetitle">
              <p>
                  <bold><%out.println(course); %></bold>
              </p>
          </div>
          <div class = "course">
          </div>
          <div id = "Questions" class = "requirement">
             <% 	
				try{
					if(cobj != null){
						%>
						<div class = "coursetitle" id = "coursetitle">
				              <p>
				                  <bold><%out.println(cobj.get("name"));%></bold>
				              </p>
          				</div>
		     			
		     			<div id = "Questions" class = "requirement">
				     			<p><%
				     			Date due = (Date)cobj.get("due");
				     			Date ddl = (Date)cobj.get("ddl");
				     			Date now = new Date();
				     			if(now.compareTo(ddl)<0){
				     				out.println("Avaliable until:"+ddl.toString());
				     				out.println("Due:" + due.toString());
				     				out.println("Points:"+cobj.get("point"));	
				     			}else{
				     				out.println("cloesd"+"   Due:" + due.toString()+"   Points:"+cobj.get("point"));
				     			}
				     			%></p>
				     			<hr />
				            	<p>
				            	Hint:<%out.println(cobj.get("hint"));%>
				              	</p>
				        </div>
				          <% 
					}
				}
				finally
				{
					
				}
             if(eobj.get("name").equals(Instructor)||eobj.get("name").equals(TA)){
            	%>
            	<hr />
        	 		<h3>Download List</h3>
        	 	<hr />
	         	<c:forEach items="${downFiles}" var="fileName">
	         		<a href="/HomeWork/DownServlet?fileName=${fileName}">${fileName}</a><br>
	         	</c:forEach>
	        	<p>
		            <a href = "assignmentList.jsp?id=<%out.println(course);%>">Return</a>
		     	</p>
	     	
        </div>
        	</div>
        	<div class = "gradesList">
	            <p>
	            <a href = "editAssignment.jsp?id=<%out.println(assignment);%>">Edit</a>
      			</p>
			</div>
    		</div> 
    		<div class = "quiz">
	        	<p>
	            <a href = "/HomeWork/ListDown">Download</a>
	        	</p>
    		</div> 
    		
        <% }else {
        	%>
            	  <hr WIDTH="300%" SIZE="3" NOSHADE>
	              <form method="post" action="/HomeWork/uploadServlet" enctype = "multipart/form-data" onsubmit="return upload();">
	                  <br>
	                  <input type="file" id="Assignment" name="files[]" multiple onchange="readURL(this);"><br>
	                  <input type="Submit" VALUE="Upload"><br>
	              </form>
				 <p>
			            <a href = "assignmentList.jsp?id=<%out.println(course);%>">Return</a>
			     </p>
	    
    	</div>
            </div>
			        <div class = "quiz">
			            <p>Quiz</p>
			        </div>
			        <div class = "gradesList">
			            <p>Grades</p>
				   </div>
		     			
    	<% 
        }
				mg.close();
				
     	%>
        
    </body>
    <script src="/HomeWork/script.js" type="text/javascript"></script>
</html>
