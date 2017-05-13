package com.rl.controller;

import java.io.*;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;


public class DownServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
   

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//get the file name
		String fileName = request.getParameter("fileName");
		//get the absolute path
		/*
		String fileNameSuffix = "." + FilenameUtils.getExtension(fileName);
		String realPath;
		if(fileNameSuffix.equals("zip")){
			realPath = request.getSession().getServletContext().getRealPath("/");
		}else{
			realPath = request.getSession().getServletContext().getRealPath("/upload/");
		}
		*/
		String realPath = request.getSession().getServletContext().getRealPath("/upload/");
		System.out.println("DS"+ realPath);
		File file = new File(realPath, fileName);
		if(!file.exists()){
			response.getWriter().write("not exist");
			return;
		}
		//
		response.addHeader("content-disposition", "attachment;filename=" + fileName);;
		IOUtils.copy(new FileInputStream(file), response.getOutputStream());
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		doGet(request, response);
	}

}
