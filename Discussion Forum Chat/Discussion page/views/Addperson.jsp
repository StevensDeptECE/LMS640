<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="charset=UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>addperson</title>
<link type="text/css" rel="stylesheet" href="../style/backstage.css">
</head>

<body>
	<jsp:include page="header.jsp"/>
	<div class="main">
	<div class="cont">
		<table style="margin-left:30px;margin-top:30px">
			<form action="${pageContext.request.contextPath}/person/addPerson" method="post">
				<tr height ="30px">
					<td>Name:</td><td><input type="text" value="" name="name" style="background:gray" height=20px></td>
				</tr>
				<tr height="30px">
					<td>Idcard:</td><td><input type="text" value="" name="idCard" style="background:gray"  height=20px></td>
				</tr>
				<tr height="30px">
					<td>Phone:</td><td><input type="text" value="" name="phone" style="background:gray"  height=20px></td>
				</tr>
				<tr height="30px">
					<td>address:</td><td><input type="text" value="" name="address" style="background:gray"  height=20px></td>
				</tr>
				<tr height="30px">
					<td align="center" colspan="2"><input type="submit" value="submit" class="mybtn"/>
				</tr>
				</form>
				
			</table>
			</div>
			</div>
			<jsp:include page="navigator.jsp"/>
</body>
</html>