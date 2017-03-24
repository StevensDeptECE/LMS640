package com.rl.controller;

import java.io.*;
import java.util.*;

import javax.servlet.*;
import javax.servlet.http.*;


public class ListDown extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		List<String> fileNames = new ArrayList<String>();
		String path = request.getSession().getServletContext().getRealPath("/upload/");
		System.out.println("LD"+ path);
		File file = new File(path);
		if(file.isDirectory()){
			File[] files = file.listFiles();
			for(File fi : files){
				String fileName = fi.getName();
				fileNames.add(fileName);
			}
		}
		// fileNames 
		request.setAttribute("downFiles", fileNames);
		request.getRequestDispatcher("/Download.jsp").forward(request, response);;
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
