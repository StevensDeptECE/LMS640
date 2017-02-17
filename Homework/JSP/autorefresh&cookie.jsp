<%@ page import="java.io.*,java.text.*,java.util.*"%>
<html>

<head>
<title>Auto Refresh Header Example</title>
</head>

<body>
<h2>Auto Refresh Header Example</h2>
<%
// Page will be auto refresh after 1 seconds
response.setIntHeader("Refresh", 1);

// Get Current Time
DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
Calendar cal = Calendar.getInstance();
out.println(dateFormat.format(cal.getTime()));

Cookie cookie = null;
Cookie[] cookies = null;
cookies = request.getCookies();
      if (cookies != null) {
         out.println("<h2> List of cookies : </h2>");
         for (int i = 0; i < cookies.length; i++) {
         //Get the json file of the correct student
         	if(cookie[i]==Username){
         		cookie = cookies[i];
           		out.print("Name : " + cookie.getName() + ",  ");
           		out.print("Value: " + cookie.getValue() + " <br/>");
         	}
         }
      } else {
         out.println("<h2>No cookies founds</h2>");
      }
%>
</body>
</html>