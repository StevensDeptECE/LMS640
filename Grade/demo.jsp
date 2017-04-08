<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="java.util.*"%>

<%
	String name = request.getParameter("name");
	String grade = request.getParameter("grade");
	out.println("Name is " + name + " grade is " + grade + ".");
%>