package com.controller;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.sql.*;
import java.util.Properties;
class databaseInfo {
	String usr = "";
	String pwd = "";
	String url = "";
	public void setusr (String usr) {
		this.usr = usr;
	}
	public void setpwd (String pwd) {
		this.pwd = pwd;
	}
	public void seturl (String url) {
		this.url = url;
	}
	public String getusr () {
		return usr;
	}
	public String getpwd () {
		return pwd;
	}
	public String geturl () {
		return url;
	}
}
public class connectDatabase {
    public databaseInfo getdatabase(String path) {
        databaseInfo dinfo= new databaseInfo();
        Properties prop = new Properties();
		InputStream input = null;
		String usr ="";
		String pwd ="";
		String url ="";
		try {

			input = new FileInputStream("/Users/xinyu/Documents/workspaces/TomcatTest/conf/conf.properties");
			
			
			 prop.load(input);
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
		dinfo.setusr(usr);
		dinfo.setpwd(pwd);
		dinfo.seturl(url);
    	return dinfo;
    }
	public void insertGrade (String id, String grade) {
		String path = "Users/xinyu/Documents/workspaces/TomcatTest/conf/conf.properties";
		databaseInfo dinfo = getdatabase(path);
		try {
			Class.forName("org.postgresql.Driver");
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Connection conn = null;
		try {
			conn = DriverManager.getConnection(dinfo.geturl(), dinfo.getusr(), dinfo.getpwd());
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
		PreparedStatement ps = null;		
		try {
			String temp = "insert into articlee(id,name) values('" + id + "','" + grade + "')";
			ps = conn.prepareStatement(temp);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
		try {
			ps.execute();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public void updataGrade (String studentid, String assignmentid, int grade) {
		String path = "Users/xinyu/Documents/workspaces/TomcatTest/conf/conf.properties";
		databaseInfo dinfo = getdatabase(path);
		try {
			Class.forName("org.postgresql.Driver");
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Connection conn = null;
		try {
			conn = DriverManager.getConnection(dinfo.geturl(), dinfo.getusr(), dinfo.getpwd());
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
		PreparedStatement ps = null;		
		try {
			String temp = "UPDATE assignmentgrade SET grade='" + grade + "' WHERE studentid='" + studentid +"' and assignmentid ='" + assignmentid +"'";
			ps = conn.prepareStatement(temp);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
		try {
			ps.execute();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public void updatacomment (String studentid, String assignmentid, String comment) {
		String path = "Users/xinyu/Documents/workspaces/TomcatTest/conf/conf.properties";
		databaseInfo dinfo = getdatabase(path);
		try {
			Class.forName("org.postgresql.Driver");
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Connection conn = null;
		try {
			conn = DriverManager.getConnection(dinfo.geturl(), dinfo.getusr(), dinfo.getpwd());
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
		PreparedStatement ps = null;		
		try {
			String temp = "UPDATE assignmentgrade SET comment='" + comment + "' WHERE studentid='" + studentid +"' and assignmentid ='" + assignmentid +"'";
			ps = conn.prepareStatement(temp);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
		try {
			ps.execute();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public int getGrade (String studentId, String assignmentId) {
		Integer grade = -1;
		String path = "Users/xinyu/Documents/workspaces/TomcatTest/conf/conf.properties";
		databaseInfo dinfo = getdatabase(path);
		try {
			Class.forName("org.postgresql.Driver");
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Connection conn = null;
		try {
			conn = DriverManager.getConnection(dinfo.geturl(), dinfo.getusr(), dinfo.getpwd());
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
		PreparedStatement ps = null;		
		try {
			String temp = "select * from assignmentGrade where studentid='" + studentId + "'" + "and assignmentid= '"+assignmentId +"'";
			//ps = conn.prepareStatement(temp);
			//String temp ="select * from articlee where id = '1234'";
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(temp);
			while (rs.next()) {
				grade = (Integer) rs.getObject("grade");
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
		return grade;
	}
	public String getComment (String studentId, String assignmentId) {
		String comment = "";
		String path = "Users/xinyu/Documents/workspaces/TomcatTest/conf/conf.properties";
		databaseInfo dinfo = getdatabase(path);
		try {
			Class.forName("org.postgresql.Driver");
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Connection conn = null;
		try {
			conn = DriverManager.getConnection(dinfo.geturl(), dinfo.getusr(), dinfo.getpwd());
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
		PreparedStatement ps = null;		
		try {
			String temp = "select * from assignmentgrade where studentid='" + studentId + "'" + "and assignmentid= '"+assignmentId +"'";	
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(temp);
			while (rs.next()) {
				comment =  rs.getString("comment");
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
		return comment;
	}
	public String getAddress (String studentId, String assignmentId) {
		String address = "";
		String path = "Users/xinyu/Documents/workspaces/TomcatTest/conf/conf.properties";
		databaseInfo dinfo = getdatabase(path);
		try {
			Class.forName("org.postgresql.Driver");
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Connection conn = null;
		try {
			conn = DriverManager.getConnection(dinfo.geturl(), dinfo.getusr(), dinfo.getpwd());
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
		PreparedStatement ps = null;		
		try {
			String temp = "select * from fileaddress where studentid='" + studentId + "'" + "and assignmentid= '"+assignmentId +"'";	
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(temp);
			while (rs.next()) {
				address = rs.getString("filename");
			}         
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
		return address;
	}
//	public void main(String []args) {
//		String path = "Users/xinyu/Documents/workspaces/TomcatTest/conf/conf.properties";
//		databaseInfo dinfo= getdatabase( path);
//		System.out.println(dinfo.getpwd());
//		insertGrade ("", "");
//	}
//	public void connect() 
//	{	
//		Properties prop = new Properties();
//		InputStream input = null;
//		String usr ="";
//		String pwd ="";
//		String url ="";
//		try {
//
//			input = new FileInputStream("/Users/xinyu/Documents/workspaces/TomcatTest/conf/conf.properties");
//			
//			
//			 prop.load(input);
//			 usr = prop.getProperty("usr");
//			 pwd = prop.getProperty("pwd");
//			 url = prop.getProperty("url");
//			
//
//		} catch (IOException ex) {
//			ex.printStackTrace();
//		} finally {
//			if (input != null) {
//				try {
//					input.close();
//				} catch (IOException e) {
//					e.printStackTrace();
//				}
//			}
//		}
//
//		try
//		{
//			Class.forName("org.postgresql.Driver");
//			System.out.println("Success loading Driver!");
//		}
//
//		catch(Exception e)
//		{
//			System.out.println("Fail loading Driver!");
//			e.printStackTrace();
//		}
//
//		try
//		{
//			Connection conn = DriverManager.getConnection(url, usr, pwd);
//			System.out.println("Success connecting server!");
//			//PreparedStatement ps=conn.prepareStatement("insert into articlee(id,name) values('XIXI','HEIEHI')");
//			//ps.execute();
//			Statement stmt = conn.createStatement();
//			ResultSet rs = stmt.executeQuery("SELECT * FROM articlee");
//			while (rs.next())
//			{
//				System.out.println( rs.getString("id")+rs.getString("name"));
//			}
//		}
//
//		catch(SQLException e)
//		{
//			System.out.println("Connection URL or username or password errors!");
//			e.printStackTrace();
//		}
//
//	}

}
