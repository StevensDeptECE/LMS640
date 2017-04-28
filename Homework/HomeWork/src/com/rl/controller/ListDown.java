package com.rl.controller;

import java.io.*;
import java.util.*;
import java.util.zip.*;

import javax.servlet.*;
import javax.servlet.http.*;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.Mongo;


public class ListDown extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		List<String> fileNames = new ArrayList<String>();
		String name =(String) request.getSession().getAttribute("person"); 
		String assignment = (String) request.getSession().getAttribute("assignment");
		System.out.println(assignment);
		String course = (String) request.getSession().getAttribute("course"); 
		
		Mongo mg = new Mongo("Localhost",27017);
	 	DB dbC = mg.getDB(course);
	 	DBCollection collc = dbC.getCollection(assignment);
	 	BasicDBObject cObj = new BasicDBObject("name",assignment);//_id
	 	DBCursor cursor = collc.find();
	 	try{
			while(cursor.hasNext()){
				DBObject str = cursor.next();
				String path = (String)str.get("path");
				System.out.println();
				File file = new File(path);
				String fileName = file.getName();
				fileNames.add(fileName);
			
			}
				/*
				 * File[] files = file.listFiles();
					for(File fi : files){
						String fileName = fi.getName();
						fileNames.add(fileName);
					}
				 */
     
		}
	 	finally
		{
			cursor.close();
		}
		
		
		/*
		String path = request.getSession().getServletContext().getRealPath("/upload/");
		String zippath = request.getSession().getServletContext().getRealPath("/");
		String zipName = ZipMultiFile(path, zippath);
		if(zipName!=null){
			fileNames.add(fileName);
		}
		System.out.println("LD"+ path);
		
		// fileNames 
		 
		*/
		request.setAttribute("downFiles", fileNames);
		request.getRequestDispatcher("/assignment.jsp").forward(request, response);;
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}
	//zip a file 
    public static String ZipMultiFile(String filepath ,String zippath) {
		try {
	        File file = new File(filepath);
	        File zipFile = new File(zippath);
	        InputStream input = null;
	        ZipOutputStream zipOut = new ZipOutputStream(new FileOutputStream(zipFile));
	        if(file.isDirectory()){
	            File[] files = file.listFiles();
	            for(int i = 0; i < files.length; ++i){
	                input = new FileInputStream(files[i]);
	                zipOut.putNextEntry(new ZipEntry(file.getName() + File.separator + files[i].getName()));
	                int temp = 0;
	                while((temp = input.read()) != -1){
	                    zipOut.write(temp);
	                }
	                input.close();
	            }
	        }
	        zipOut.close();
	        return zipFile.getName();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}


}
