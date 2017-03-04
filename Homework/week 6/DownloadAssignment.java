
import java.io.*;
import java.net.*;

public class DownloadAssignment {
	private String courseId;
	private String userId;
	private String token;
	private static String targetURL;
	private  static double grade;
	static String output;
	public DownloadAssignment(String courseId,String userId){
		this.courseId=courseId;
		this.userId=userId;
   	
		DownloadAssignment.targetURL = "https://github.com/StevensDeptECE"
   			+ "/courses/"+this.courseId
   			+ "/users/"+this.userId
   			+"/assignments"
   			;
   	
   }
	
	
   public void get(){
   	try {

			URL targetUrl = new URL(targetURL);

			HttpURLConnection httpConnection = (HttpURLConnection) targetUrl.openConnection();
			httpConnection.setDoOutput(true);
			httpConnection.setRequestMethod("GET");
			httpConnection.setRequestProperty("Content-Type", "application/json");

			if (httpConnection.getResponseCode() != 200) {
				throw new RuntimeException("Failed : HTTP error code : "
					+ httpConnection.getResponseCode());
			}

			BufferedReader responseBuffer = new BufferedReader(new InputStreamReader(
					(httpConnection.getInputStream())));

			
			System.out.println("Output from Server:\n");
			while ((output = responseBuffer.readLine()) != null) {
				System.out.println(output);

				
			}

			httpConnection.disconnect();
			//return "success!";

		  } catch (Exception e) {

			e.printStackTrace();

		  } 
   		
		}
   
       public void printurl(){
       	System.out.println(targetURL);
       }
       
      public static double getGrade(){
   	   return grade;
      }
      public static void main(String[] args){//a test example
   	    	String courseId="133";
   	    	String userId="20168";
   	    	DownloadAssignment test =  new DownloadAssignment(courseId,userId);
   	    	test.printurl();
   	    	test.get();
   	     
 
      }

}
