package grade;

import java.util.*;
import java.sql.*;
import com.google.gson.Gson;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;


public class Limit {
	public double max;
	public double min;
	public Limit(double max, double min) {
		this.max = max;
		this.min = min;
	}
	public void update(HttpServletRequest request, HttpServletResponse response) {
		Gson gson = new Gson();
		
		String name = request.getParameter("name");
		double val = Double.valueOf(request.getParameter("value"));
		System.out.print(val);
		int id = Integer.valueOf(request.getParameter("id"));
		
	 	try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	 	String url = "jdbc:mysql://localhost:3306/grade";
	 	Connection conn = null;
	 	try {
			conn = DriverManager.getConnection(url, "root", "123qwe");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	 	PreparedStatement stmt = null;
		try {
			stmt = conn.prepareStatement("select * from grade_limit where names = ?");
			stmt.setString(1, name);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	 	ResultSet rs;
		try {
			rs = stmt.executeQuery();
		 	while (rs.next()) {
			 	this.max = rs.getDouble(2);
			 	this.min = rs.getDouble(3);
			 	}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	 	String json = gson.toJson(this);
	 	try {
			response.getWriter().write(json);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	 	
	 	if (val <= max && val >= min) {
	 		try {
	 			String sql = "update gradebook set " + name + "=" + val + " where ID=" + id;
	 			stmt = (PreparedStatement) conn.prepareStatement(sql);
	 			int i = stmt.executeUpdate();
	 			System.out.println(i);
	 			stmt.close();
	 			conn.close();
	 		} catch (SQLException e) {
	 			e.printStackTrace();
	 		}
	 	}
	}
	
}
