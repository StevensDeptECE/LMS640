<%@page language="java" contentType="text/html;charset=UTF-8" 
	pageEncoding = "UTF-8"
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
<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html;charset=ISO-8859-1">
	<title>Login</title>
	</head> 
	<body bgcolor= orange>
	<%
		String email1=(String)request.getParameter("email");  
        String pwd=(String)request.getParameter("password");
		String checkBox = request.getParameter("remember");
        boolean login_test = false;              
        try{   
            MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
            @SuppressWarnings("deprecation")
           DB db = mongoClient.getDB( "person" );  
           DBCollection coll = db.getCollection("person"); 
           System.out.println("Collection userInfo selected successfully");
           System.out.println(email1);
           System.out.println(pwd);
    
           BasicDBObject eObj = new BasicDBObject("email",email1);
           DBObject obj = coll.findOne(eObj);
           System.out.println(obj.toString());
           String name1 = java.net.URLEncoder.encode(email1,"UTF-8");
           Cookie nameCookie = new Cookie("username", name1);
           String s = (String)obj.get("pwd");
           System.out.print(s.equals(pwd));
           if(s.equals(pwd)){
               System.out.println(obj.toString());
               session.setAttribute("email", request.getParameter("email"));
           	   response.sendRedirect("course.jsp"); //trans a parameter
           	   login_test = true;
    		}else{
    			out.println("\n Error");
    		}
          
         }catch(Exception e){
            System.err.println( e.getClass().getName() + ": " + e.getMessage() );
        }
        /*
       if(login_test) {
           if ("save".equals(checkBox)) {
               //Cookie存取时用URLEncoder.encode进行编码(PS:读取时URLDecoder.decode进行解码)
              String name1 = java.net.URLEncoder.encode(email,"UTF-8");
          	  Cookie nameCookie = new Cookie("username", name1);
               //设置Cookie的有效期为3天
               nameCookie.setMaxAge(60 * 60 * 24 * 3);
               
               String passw = java.net.URLEncoder.encode(pwd,"UTF-8");
               Cookie pwdCookie = new Cookie("password", passw);
               pwdCookie.setMaxAge(60 * 60 * 24 * 3);
               response.addCookie(nameCookie);
               response.addCookie(pwdCookie);
            }
           // request.getRequestDispatcher("welcome.jsp").forward(request, response);  
            response.sendRedirect("course.jsp");         
       }
        */
        
	%>
		<br><br>  
		<h1>Login Here</h1><br><a href="signUp.jsp">New Users?</a>
			<form action="login.jsp" method="post">  
			Email:<input type=text name="email"><br><br>
			Password:<input type=password name="password"style="width: 158px:"><br><br>
			<input type="checkbox"name="remember">Remember me<br><br>
			<input type="submit"style="width: 108px;" name="Login" value="Login"><br>
		</form>
</body>
</html>