<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
        pageEncoding="ISO-8859-1"%>
<%@ page import="java.util.*"%>
<%@ page import="java.sql.*"%>
<%@ page import="com.google.gson.Gson" %>
<%@ page import="java.io.IOException" %>
<%@ page import=" java.io.PrintWriter" %>
<%!

class Grade {


public List<String> head = null;

public List<String> names = null;

public List<Integer> ID = null;

public List<List<Double>> grades = null;

public Grade() {
	head = new ArrayList<String>();
	names = new ArrayList<String>();
	ID = new ArrayList<Integer>();
	grades = new ArrayList<List<Double>>();
}
}
%>
<%
	String query = request.getParameter("query");
	if (query.equals("get_grade"));
	{
		System.out.print("sucess!!!");
	
	Grade gradebook = new Grade();

	Class.forName("com.mysql.jdbc.Driver");
    
	String url="jdbc:mysql://localhost:3306/grade";        
	Connection conn;

	conn = DriverManager.getConnection(url,    "root","123qwe");
	Statement stmt = conn.createStatement(); 

	String sql = "select * from gradebook";    
	ResultSet rs = stmt.executeQuery(sql);
    while (rs.next()){
    	gradebook.ID.add(rs.getInt(2));
    	gradebook.names.add(rs.getString(1));
    	gradebook.grades.add(new ArrayList<Double>());
    	int size = gradebook.grades.size();
    	for (int i = 3; i <= rs.getMetaData().getColumnCount(); i++) {
    		gradebook.grades.get(size - 1).add(rs.getDouble(i));
    	}
    }
    rs.close();
    
    String sql1 = "select column_name from information_schema.columns where table_name='gradebook'";
    ResultSet getHead = stmt.executeQuery(sql1);
    while (getHead.next()) {
    	gradebook.head.add(getHead.getString(1));
    }
    getHead.close();
    stmt.close();
    conn.close();
    Gson gson = new Gson();
    String json = gson.toJson(gradebook);
    response.getWriter().write(json);
	}
%>
