<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE HTML>
<%@ page language="Java" import="java.lang.*" import="java.util.Scanner"
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
	import="com.mongodb.Mongo"
	import="java.util.*"	
	import="javax.tools.*"	
	import="com.rl.controller.mgdbConnect"%>


<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <title>Assignment Detail</title>
        <link rel="stylesheet" media="screen" href="/HomeWork/style.css">
        <link rel="stylesheet" href="/HomeWork/css/bootstrap.min.css">
        <script type="text/javascript">
        </script> 
        
    </head>
    <body>
    <%
    String assignment = (String)(session.getAttribute("assignment"));
	String name = request.getParameter("id");
	String user = (String)(session.getAttribute("person"));
	String course = (String)(session.getAttribute("course"));

	
	Mongo mg = new Mongo("Localhost",27017);
	DB db = mg.getDB(course);
	DBCollection coll = db.getCollection(assignment);
 	BasicDBObject eObj = new BasicDBObject("name",name);//email
 	DBObject str = coll.findOne(eObj);
	
 	String path = (String)str.get("path");
 	Iterable<String> options = Arrays.asList("-d", path);
 	String filename = (String)str.get("filename");
 	path = path+"/"+filename;
 	
 	JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
	DiagnosticCollector<JavaFileObject> diagnostics = new DiagnosticCollector<JavaFileObject>(); 
	StandardJavaFileManager fileManager = compiler.getStandardFileManager(diagnostics, null, null);
	Iterable<? extends JavaFileObject> compilationUnits = fileManager.getJavaFileObjectsFromStrings(Arrays.asList(path));
	JavaCompiler.CompilationTask task = compiler.getTask(null, fileManager,diagnostics, options, null, compilationUnits);
	boolean success = task.call();
	fileManager.close();
	
    %>
      <div id = "login">
          <p>
              <a>Hello, <%out.println(user); %> ! </a>
          </p>
          <p>
       		 <a href = "login.jsp">Logout</a>
 		  </p>
      </div>
      <div id = "courseDashboard">
          <div class = "coursetitle" id = "coursetitle">
              <p>
                  <bold><%out.println(assignment+" "+name); %></bold>
              </p>
          </div>
          <div class = "course">
          </div>
          <div id = "Questions" class = "requirement">
            <%
            out.println((success)?"build success":"build fail");
        	for (Diagnostic diagnostic : diagnostics.getDiagnostics())
        		out.println(
        		"Code: \n" +
        		"Kind: \n" +
        		"Position: \n" +
        		"Start Position: \n" +
        		"End Position: \n" +
        		"Source: \n" +
        		"Message: \n",
        		diagnostic.getCode(), diagnostic.getKind(),
        		diagnostic.getPosition(), diagnostic.getStartPosition(),
        		diagnostic.getEndPosition(), diagnostic.getSource(),
        		diagnostic.getMessage(null));

            %>
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
    		
    </body>
    <script src="/HomeWork/script.js" type="text/javascript"></script>
</html>
