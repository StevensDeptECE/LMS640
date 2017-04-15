<%@ page language="java" contentType="text/html; UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Login in</title>
<link type="text/css" rel="stylesheet" href="../style/reset.css">
<link type="text/css" rel="stylesheet" href="../style/main.css">
</head>

<body>
<div class="headerBar">
	<div class="logoBar login_login">
		<div class="comWidth">
			<div class="logo fl">			
			</div>
			<h3 class="welcome_title">welcome login</h3>
			</div>
			</div>
			</div>
			
			
<div class="loginBox">
	<div class="login_cont">
		<ul class="login">
			<form action="${pageContext.request.contextPath}/person/dologin" method="post">
			<li class="l_tit">Username</li>
			<li class="mb_10"><input type="text" name="userName" class="login_input user_icon"></li>
			<li class="l_tit">Password</li>
			<li><input type="submit" value="" class="login_btn"></li>
		</form>
		</ul>
		</div>

</div>

</body>
</html>