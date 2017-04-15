<%@ page language="java" contentType="text/html; charset=Utf-8"
    pageEncoding="utf-8"%>
    <!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>

<div class="container">
  <h1>Successful Submission</h1>
  <%
    String Grade=request.getParameter("Grade");
    String Comment=request.getParameter("Comment");
    
    %>
  <h2>Grade:</h2>
  <h3><% out.println(Grade);%></h3>
  <h2>Comment:</h2>
  <h3><% out.println(Comment);%></h3>            
  <button type="button" class="btn btn-warning">home</button>
  <button type="button" class="btn btn-warning">back</button>
</div>




</body>
</html>
    