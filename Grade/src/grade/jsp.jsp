<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ page import="java.sql.*"%>
<%@ page import="com.google.gson.Gson" %>
<%@ page import="java.io.IOException" %>
<%@ page import=" java.io.PrintWriter" %>
<%!
	class limit {
	public double max;
	public double min;
	public limit(double max, double min) {
		this.max = max;
		this.min = min;
	}
}
%>
 <%
 	Class.forName("com.mysql.jdbc.Driver");
 	String url = "jdbc:mysql://localhost:3306/grade";
 	Connection conn;
 	conn = DriverManager.getConnection(url, "root", "123qwe");
 	Statement stmt = conn.createStatement();
 	String sql = "select * from grade_limit where names='homework'";
 	double max = 0;
 	double min = 0;
 	ResultSet rs = stmt.executeQuery(sql);
 	while (rs.next()) {
 	max = rs.getDouble(2);
 	min = rs.getDouble(3);
 	}
 	rs.close();
 	stmt.close();
    conn.close();
 	limit result = new limit(max, min);
 	Gson gson = new Gson();
 	String json = gson.toJson(result);
 	response.getWriter().write(json);
 %>