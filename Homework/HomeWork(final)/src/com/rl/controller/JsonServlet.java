package com.rl.controller;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Date;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.json.JSONObject;
import net.sf.json.JSONArray;

public class JsonServlet extends HttpServlet {
    public JsonServlet() {
        super();
    }
    public void destroy() {
        super.destroy();
    }
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        this.doPost(request, response);
    }
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
                                                                                                                                                                             
        response.setContentType("text/xml");
        response.setHeader("Cache-Control", "no-cache");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        try {
            String json1 = request.getParameter("assignmenthead");
            String json2 = request.getParameter("aassignment");
            
            if ((json1 != "") && (json2 != "")) {
                //System.out.println("json1:"+json1);
                JSONObject jsonObject1 = JSONObject.fromObject(json1);
                JSONArray jsonArray2 = JSONArray.fromObject(json2);
                for(int i=0;i<jsonArray2.size();i++){
                    JSONObject resultObj = jsonArray2.optJSONObject(i);//
                    int assignment_id=resultObj.getInt("assigment_id");
                }
                String result = "success！";
                out.println("<response>");
                out.println("<result>" + result + "</result>");
                out.println("</response>");
                out.close();
            } else{
                                                                                                                                                                                     
                String result = "wrong";
                out.println("<response>");
                out.println("<result>" + result + "</result>");
                out.println("</response>");
                out.close();
            }
        } catch (Exception e) {
            System.out
                    .println("JsonServlet doPost(HttpServletRequest request, HttpServletResponse response) wrong："
                            + e.getMessage());
        }
    }
    public void init() throws ServletException {
    }
                                                                                                                                                                         
                                                                                                                                                                         
}