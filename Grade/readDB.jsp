<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.io.*,java.util.*,java.sql.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
 
<html>
<head>
<title>SELECT</title>
</head>
<body>
<!--
JDBC
 -->
<sql:setDataSource var="snapshot" driver="com.mysql.jdbc.Driver"
     url="jdbc:mysql://localhost:3306/grade?"
     user="root"  password="123qwe"/>
 
<sql:query dataSource="${snapshot}" var="result">
SELECT * from gradebook;
</sql:query>
<h1>JSP</h1>
<table border="1" width="100%">
<tr>
   <th>Name</th>
   <th>ID</th>
   <th>homework</th>
   <th>Quiz</th>
   <th>Test</th>
</tr>
<c:forEach var="row" items="${result.rows}">
<tr>
   <td><c:out value="${row.name}"/></td>
   <td><c:out value="${row.ID}"/></td>
   <td><c:out value="${row.homework}"/></td>
   <td><c:out value="${row.test}"/></td>
   <td><c:out value="${row.quzi}"/></td>
</tr>
</c:forEach>
</table>
 
</body>
</html>