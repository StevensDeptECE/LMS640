package com.rl.controller;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.json.JSONArray;
public class JsonFromServlet extends HttpServlet {
public void doGet(HttpServletRequest request, HttpServletResponse response)  throws ServletException, IOException {
           doPost(request,response);
}
public void doPost(HttpServletRequest request, HttpServletResponse response)  throws ServletException, IOException {
  response.setContentType("text/html");
  String str= request.getParameter("name");//得到ajax传递过来的paramater
  System.out.println(str);
  PrintWriter out = response.getWriter();
  List list = new ArrayList();//传递List
                    //Map m=new HashMap();//传递Map

                    //m.put("u1", u1);
                    //m.put("u2", u2);
        JSONArray jsonArray2 = JSONArray.fromObject( list );//转化成json对象
                    //JSONObject jo=JSONObject.fromObject(m);//转化Map对象
        out.print(jsonArray2);//返给ajax请求
        System.out.println(jsonArray2);
                    //out.print(jo);//返给ajax请求
}
}
