package com.rl.controller;

//import mybean.data.*; 
import java.sql.*; 
import java.io.*; 
import javax.servlet.*; 
import javax.servlet.http.*;

public class handleLogin extends HttpServlet{
	public void init(ServletConfig config) throws ServletException{ 
		super.init(config);        
		try {  
			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");           
		}catch(Exception e){}      
	}     
	public String handleString(String s){   
		try{ 
			byte bb[]=s.getBytes("iso-8859-1");             
			s=new String(bb);           
		}catch(Exception ee){}         
		return s;      
	}
	public  void  doPost(HttpServletRequest request,HttpServletResponse response) throws ServletException,IOException{   
		Connection con;          
		PreparedStatement sql;
		login loginBean=null;         
		String backNews="";          
		HttpSession session=request.getSession(true);          
		try{  
			loginBean=(login)session.getAttribute("login");
			if(loginBean==null){ 
				loginBean=new login();                    
				session.setAttribute("login",loginBean);               
				}          
		}catch(Exception ee){  
			loginBean=new login();                 
			session.setAttribute("login",loginBean);          
		}          
		String logname=request.getParameter("logname").trim(),
				password=request.getParameter("password").trim();         
		boolean ok=loginBean.getSuccess();         
		logname=handleString(logname);         
		password=handleString(password);          
		if(ok==true&&logname.equals(loginBean.getLogname())){  
			backNews=logname+"Already login";            
			loginBean.setBackNews(backNews);         
		}else{  
			String uri="jdbc:sqlserver://127.0.0.1:1433;DatabaseName=Friend";            
			boolean boo=(logname.length()>0)&&(password.length()>0);              
			try{ 
				con=DriverManager.getConnection(uri,"sa","sa");                  
				String condition="select * from member where logname =? and password =?";                 
				sql=con.prepareStatement(condition);                   
				if(boo){ 
					sql.setString(1,logname);                   
					sql.setString(2,password);                    
					ResultSet rs=sql.executeQuery();                   
					boolean m=rs.next();                   
					if(m==true){  
						backNews="success";                       
						loginBean.setBackNews(backNews);                      
						loginBean.setSuccess(true);                      
						loginBean.setLogname(logname);                   
					}else{  
						backNews="fail";                      
						loginBean.setBackNews(backNews);                       
						loginBean.setSuccess(false);                       
						loginBean.setLogname(logname);                      
						loginBean.setPassword(password);                   
					}                    
					con.close();               
				}             
			}catch(SQLException exp){  
					backNews=""+exp;                  
					loginBean.setBackNews(backNews);                  
					loginBean.setSuccess(false);              
			} 
		}
			RequestDispatcher dispatcher=request.getRequestDispatcher("showLoginMess.jsp");        
			dispatcher.forward(request, response);         
	}
	public  void  doGet(HttpServletRequest request,HttpServletResponse response)throws ServletException,IOException{   
		doPost(request,response);     
	}
}
