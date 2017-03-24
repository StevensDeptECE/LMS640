/*@Auther Sihan Wang */
package com.rl.controller;

import java.util.*;
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.FilenameUtils;

public class uploadServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public uploadServlet() {
        super();
    }
    private File uploadFolder;

    public void init() throws ServletException {
        uploadFolder = new File("/Users/sihanwang/Desktop");
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
				//String contentType = fi.getContentType();
				//get size
				//Long Size = fi.getSize();
				//true:normal ;false:form
				boolean isFieldForm = fi.isFormField();
				//get inputstream
				//write the file on the servlet
				if(!isFieldForm){
					if(fieldName != null && !"".equals(fieldName)){
						String uploadPath = request.getSession().getServletContext().getRealPath("/upload");
						//create a file
						File file = new File(uploadPath, origFileName);
						//System.out.println(file.getAbsolutePath());
						
						//String fileName = FilenameUtils.getName(fi.getName());
						//String fileNamePrefix = FilenameUtils.getBaseName(fileName) + "_";
						//String fileNameSuffix = "." + FilenameUtils.getExtension(fileName);
						//File file = File.createTempFile(fileNamePrefix, fileNameSuffix, uploadFolder);
						
						//File file2 = new File("newname");
						//boolean success = file.renameTo(file2);
				
						

						// Rename file (or directory)
						

					

						// ...
						fi.write(file);

						//put file on the server
						System.out.println("File successfully saved as " + file.getAbsolutePath());
						
						response.getWriter().print("Success!");
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
