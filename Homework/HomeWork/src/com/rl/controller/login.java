package com.rl.controller;

public class login {
	private String logname;
	private String password;
	private String backNews="";
	private boolean success = false;
	public void setLogname(String name){
		logname= name;
	}
	public String getLogname(){
		return logname;
	}
	public void setPassword(String pw){
		password=pw;
	}
	public String getPassword(){
		return password;
	}
	public String getBackNews(){
		return backNews;
	}public void setBackNews(String s){
		backNews=s;
	}
	public void setSuccess(boolean b){
		success=b;
	}
	public boolean getSuccess(){
		return success;
	}
}
