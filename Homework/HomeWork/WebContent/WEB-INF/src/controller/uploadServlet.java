/*@Auther Sihan Wang */
package com.rl.controller;

import java.util.*;
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

public class uploadServerlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public uploadServerlet() {
        super();
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		/*InputStream IS = request.getInputStream();
		@SuppressWarnings("deprecation")
		String inputStream = IOUtils.toString(IS);
		System.out.println(inputStream);*/
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		DiskFileItemFactory factory = new DiskFileItemFactory();
		ServletFileUpload sfu = new ServletFileUpload(factory);
		try {
			List<FileItem> fiList = sfu.parseRequest(request);
			for(FileItem fi : fiList){
				//original file name
				String origFileName = fi.getName();
				//get the content
				//String content = fi.getString();
				//get name
				String fieldName = fi.getFieldName();
				//get type
				String contentType = fi.getContentType();
				//get size
				//Long Size = fi.getSize();
				//true:normal ;false:form
				boolean isFieldForm = fi.isFormField();
				//get inputstream
				//write the file on the servlet
				if(!isFieldForm){
					if(fieldName != null &&!"".equals(fieldName)){
						String uploadPath = request.getSession().getServletContext().getRealPath("/data");
						//create a file
						File file = new File(uploadPath, origFileName);
						//put file on the server
						fi.write(file);
						response.getWriter().print("Success");
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
