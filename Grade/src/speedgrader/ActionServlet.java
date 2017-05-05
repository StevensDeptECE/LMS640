package ajaxdemo;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.controller.connectDatabase;
public class ActionServlet extends HttpServlet 
{
	private static final long serialVersionUID = 1L;
	public ActionServlet() 
	{
		
	}
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		connectDatabase cd = new connectDatabase();
		String name="assignment1";
		//name = "Hello "+request.getParameter("user");
		name = request.getParameter("user");
		if(request.getParameter("user").toString().equals(""))
		{
			name="Hello User";
			}
		response.setContentType("text/plain");
		response.setCharacterEncoding("UTF-8"); 
		String filePath = cd.getAddress("1620001", name);
		
	//	String filePath = "/Users/xinyu/Movies/640allFiles/"+name+".java";
//		PrintWriter outt = response.getWriter();
//		response.getWriter();
//   	    outt.write(cd.getAddress("1620001", name)); 
//     	outt.println();
		 BufferedReader reader = new BufferedReader(new FileReader(filePath));
         String line;
         while((line = reader.readLine())!= null){
        	 PrintWriter out = response.getWriter();
        	 out.write(line); 
        	out.println();
         }        
     reader.close(); 

 
reader.close(); 
		}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
		{
			
		}
}