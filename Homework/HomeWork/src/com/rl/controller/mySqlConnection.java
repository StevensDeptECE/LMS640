package com.rl.controller;

import java.sql.*;                     //需要引入执行数据库操作的sql包
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.PreparedStatement;
import java.util.logging.Level;
import java.util.logging.Logger;
//import weinidingJavaData.WndMembers;       //这是由数据库生成的一个WndMembers类
//import com.mysql.jdbc.Connection;             //需要引入mysql驱动包
//import com.mysql.jdbc.Statement;
public class mySqlConnection {
	Connection conn=null;
	PreparedStatement stat=null;             //定义为stat为动态预处理sql语句类

	ResultSet rs=null;
	static mySqlConnection instance=null;

	public mySqlConnection() {
	init();
	}
	public void init()                                                             //用来初始化MyConnection类的函数
	{
	try {
	Class.forName("com.mysql.jdbc.Driver");
	conn=(Connection) DriverManager.getConnection("jdbc:mysql://IP地址/数据库名称","数据库授权的用户名","密码");
	System.out.println(conn);
	} catch (ClassNotFoundException ex) {
	Logger.getLogger(mySqlConnection.class.getName()).log(Level.SEVERE, null, ex);
	} catch (SQLException ex) {
	Logger.getLogger(mySqlConnection.class.getName()).log(Level.SEVERE, null, ex);
	}

	}
	public static mySqlConnection getInstance(){
	if(instance==null)
	instance=new mySqlConnection();
	return instance;
	}
/*	public void insert(WndMembers member) throws SQLException        //定义一个插入函数，参数是由数据库生成的实体类对象
	{
	init();                                                                                       //在插入函数中执行初始化
	String username=member.getWndMembersname();
	String pw=member.getWndMemberspw();                                   //接收从Servlet传过来的参数
	String sql ="insert into wnd_members(wnd_membersname,wnd_memberspw) values(?,?)";      //定义sql语句
	System.out.println(sql);

	stat=conn.prepareStatement(sql);
	stat.setString(1, username);
	stat.setString(2, pw);
	stat.executeUpdate();                       //执行插入操作
	if(stat!=null){stat.close();}

	}
*/
}



