<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page import="java.util.*"%>
<%@ page import="java.sql.*"%>
<%@ page import="com.google.gson.Gson"%>
<%@ page import="java.io.IOException"%>
<%@ page import="java.io.PrintWriter"%>
<%@ page import="grade.User"%>
<%
	Gson gson = new Gson();
	String query = request.getParameter("username");
	if (query != null) {
		String name = request.getParameter("username");
		String password = request.getParameter("password");
		String course = request.getParameter("course");
		System.out.print(request);
		if (name.equals("john") && password.equals("123qwe")) {
			User user = new User(name, course, true);
			String json = gson.toJson(user);
			response.getWriter().write(json);
			session.setAttribute("name", name);
			session.setAttribute("course", course);
			System.out.print(session.getAttribute("name"));
		} else {
			User user = new User(name, course, false);
			session.setAttribute("name", name);
			session.setAttribute("course", course);
			String json = gson.toJson(user);
			response.getWriter().write(json);
		}
	} else {
		if (session.isNew()) {
			response.getWriter().write("false");
			session.setMaxInactiveInterval(1 * 60);
		} else if (session.getAttribute("name") == null) {
			response.getWriter().write("false");
		} else {
			String name = (String) session.getAttribute("name");
			if (name.equals("john")) {
				User user = new User((String) session.getAttribute("name"),
						(String) session.getAttribute("course"), true);
				String json = gson.toJson(user);
				response.getWriter().write(json);
			} else {
				response.getWriter().write("false");
			}
		}
	}
%>