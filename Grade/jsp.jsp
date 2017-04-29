<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ page import="java.sql.*"%>
<%@ page import="com.google.gson.Gson" %>
<%@ page import="java.io.IOException" %>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="grade.Limit" %>

 <%
 	Limit limit = new Limit(0, 0);
 	String flag = request.getParameter("id");
 	if (flag == null) {
 		limit.updateLimit(request, response);
 		return;
 	}
 	limit.update(request, response);
 %>