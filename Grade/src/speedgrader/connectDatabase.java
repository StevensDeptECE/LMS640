package com.controller;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.sql.*;
import java.util.Properties;

public class connectDatabase {
	
	public  static void main(String[] args) 
	{


		String usr ="xinyu";
		String pwd ="679000";
		String url ="jdbc:postgresql://localhost:5432/xinyu";

		try
		{
			Class.forName("org.postgresql.Driver");
			System.out.println("Success loading Driver!");
		}

		catch(Exception e)
		{
			System.out.println("Fail loading Driver!");
			e.printStackTrace();
		}

		try
		{
			Connection conn = DriverManager.getConnection(url, usr, pwd);
			System.out.println("Success connecting server!");

			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT * FROM Sales");

			while (rs.next())
			{
				System.out.println(rs.getString("cust") + " " + rs.getString("prod") + " " + rs.getString("day") + " " +
					   	rs.getString("month") + " " + rs.getString("year") + " " + rs.getString("quant"));
			}
		}

		catch(SQLException e)
		{
			System.out.println("Connection URL or username or password errors!");
			e.printStackTrace();
		}

	}

}
