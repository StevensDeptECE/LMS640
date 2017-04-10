<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>主页面</title>
<link rel="stylesheet" href="../style/backstage.css">
</head>
<body>
<jsp:include page="header.jsp"/>
	<div class="content clearfix">
	<div class="main">
			<div class="cont">
			<div class="title">Person Management</div>
				<div class="details">
					<div class="details_operation clearfix">
						<div class="bui_select">
						<div><a class="mybtn" href="${pageContext.request.contextPath}/person/addPrompt"></a>
						</div>
						<div class="fr">
							<div class="text">	
								<span>Search</span>
								<input type="text" value="" class="search">
							</div>
							</div>
							
									<table>
				<thead>
					<tr>
					<th width="200">ID number</th>
					<th width="100">TEL</th>
					<th width="300">Address</th>
					<th></th>
					</tr>					
				</thead>
				<tbody>
				<c:forEach var="p" items="${persons}">
					<tr>
						<td><input type="checkbox" id="c9" class="check"><label for="c9" class></td>					
						<td>${p.idCard}</td>
						<td>${p.phone}</td>
						<td>${p.address}</td>
						<td align="center">
							<a class="btn" href=updatePrompt?id=${p.id}">modify</a>
							<a class="btn" href=deletePersonById?id=${p.id}" onclick='return'>modify</a>
						</td>
					</tr>
				</c:forEach>
				</tbody>
				</table>
			</div>
		</div>
	</div>
		<jsp:include page="navigator.jsp"/>
	</div>
</body>
</html>