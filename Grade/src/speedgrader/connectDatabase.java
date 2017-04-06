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
		Properties prop = new Properties();
		InputStream input = null;
		String usr ="";
		String pwd ="";
		String url ="";
		try {

			input = new FileInputStream("/Users/xinyu/Documents/workspaces/TomcatTest/conf/conf.properties");
			
			
			prop.load(input);

			// get the property value and print it out
			 usr = prop.getProperty("usr");
			 pwd = prop.getProperty("pwd");
			 url = prop.getProperty("url");
			

		} catch (IOException ex) {
			ex.printStackTrace();
		} finally {
			if (input != null) {
				try {
					input.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

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
			ResultSet rs = stmt.executeQuery("SELECT * FROM articlee");

			while (rs.next())
			{
				System.out.println( rs.getString("id")+rs.getString("name"));
			}
		}

		catch(SQLException e)
		{
			System.out.println("Connection URL or username or password errors!");
			e.printStackTrace();
		}

	}

}

