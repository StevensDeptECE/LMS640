<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
        pageEncoding="ISO-8859-1"%>
<%@ page import="java.util.*"%>
<%@ page import="java.sql.*"%>
<%@ page import="com.google.gson.Gson" %>
<%@ page import="java.io.IOException" %>
<%@ page import=" java.io.PrintWriter" %>
<%!

class Grade {


public List<String> courses = null;

public List<String> names = null;

public List<Integer> ID = null;

public List<List<Double>> grades = null;

public Grade() {
	courses = new ArrayList<String>();
	names = new ArrayList<String>();
	ID = new ArrayList<Integer>();
	grades = new ArrayList<List<Double>>();
}
}
%>
<%

	Grade gradebook = new Grade();

	Class.forName("com.mysql.jdbc.Driver");
	System.out.println("sucsess");
    
	String url="jdbc:mysql://localhost:3306/grade";        
	Connection conn;

	conn = DriverManager.getConnection(url,    "root","123qwe");
	Statement stmt = conn.createStatement(); 
	System.out.println("sucuess");

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
    gradebook.courses = new ArrayList<String>();
    gradebook.courses.add("test");
    gradebook.courses.add("quiz");
    gradebook.courses.add("homework");
    rs.close();
    stmt.close();
    conn.close();
    Gson gson = new Gson();
    String json = gson.toJson(gradebook);
    response.getWriter().write(json);
%>
