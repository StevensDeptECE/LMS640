package com.webtest.websocket;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnOpen;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/ServerEndPointDemo")
public class ServerEndPointDemo {
	@OnOpen
	public void handleOpen(){
		System.out.println("Client is now connected...");
	}
	
	public String handleMessage(String message){
		System.out.println("receive from client:" + message);
		String replymessage = "echo" + message;
		System.out.println("sent to client:" + replymessage);
		return replymessage;
	}
	@OnClose
	public void handleClose(){
		System.out.println("Client is now disconnected...");
	}
	@OnError
	public void handleError(Throwable t){
		t.printStackTrace();
	}

}
