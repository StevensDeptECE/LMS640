package grade;

import java.io.File;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;

public class HttpServer {
	public static final String WEB_ROOT = System.getProperty("user.dir")+File.separator+"WebContent";
	private static final String SHUTDOWN_COMMAND = "/SHUTDOWN";
	
	public static void main(String[] args) {
		HttpServer server = new HttpServer();
		server.await();
	}
	public void await() {
		ServerSocket serverSocket = null;
		int port = 8080;
		try {
			serverSocket = new ServerSocket(port, 1, InetAddress.getByName("127.0.0.1"));
			while (true) {
				try {
					Socket socket = null;
					InputStream input = null;
					OutputStream output = null;
					socket = serverSocket.accept();
					input = socket.getInputStream();
					output = socket.getOutputStream();
					
					Request request = new Request(input);
					request.parse();
					
					Response response = new Response(output);
					response.setRequest(request);
					response.sendStaticResource();
					socket.close();
				} catch (Exception e) {
					e.printStackTrace();
					continue;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
