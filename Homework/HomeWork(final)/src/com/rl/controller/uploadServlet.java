/*@Auther Sihan Wang */
package com.rl.controller;

import java.util.*;
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.Mongo;

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
				doJson d = null;
				
				//get inputstream
				//write the file on the servlet
				if(!isFieldForm){
					if(fieldName != null && !"".equals(fieldName)){
						String uploadPath = request.getSession().getServletContext().getRealPath("/upload");
						
						String name =(String) request.getSession().getAttribute("person"); 
						String assignment = (String) request.getSession().getAttribute("assignment");
						System.out.println(assignment);
						String course = (String) request.getSession().getAttribute("course"); 
						
						
						
						Mongo mg = new Mongo("Localhost",27017);
						DB db = mg.getDB("person");
						DBCollection coll = db.getCollection("person");
					 	BasicDBObject eObj = new BasicDBObject("name",name);//email
					 	DBObject eobj = coll.findOne(eObj);
					 	int sid = (int)eobj.get("cwid");
					 	String StudentId = String.valueOf(sid);
					 	
					 	DB dbC = mg.getDB(course);
					 	DBCollection collc = dbC.getCollection("assigment");
					 	BasicDBObject cObj = new BasicDBObject("name",assignment);//_id
					 	DBObject cobj = collc.findOne(cObj);
					 	String AssignmentId = (String)cobj.get("name");
					 	
					 	String actualName = course +"_"+AssignmentId+"_"+StudentId+"_"+origFileName;
						System.out.println(actualName);
					 	//create a file
						File file = new File(uploadPath, actualName);//origFileName
						
						
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
						
					 	DBCollection uplo = dbC.getCollection(assignment);
					 	BasicDBObject doc = new BasicDBObject();
					 	
					 		doc.append("name",name);
					 	 	doc.append("assignment",assignment);
					 	 	doc.append("filename",actualName);
					 	 	doc.append("origname",origFileName);
					 	 	doc.append("graded",false);
					 	 	
					 	 	Date createAt = new Date();
					 	 	doc.append("createAt",createAt);
					 	 	doc.append("courseId",course);
					 	 	doc.append("path",file.getAbsolutePath());
					 	 	uplo.insert(doc);
					 	 	String str= "assignmentList.jsp?id="+course;
					 	 	response.sendRedirect(str);
								 	
					 	mg.close();
						response.getWriter().print("Success!");
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
