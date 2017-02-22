// this is java code for Endpoint of livechatroom. This is prototype. 
// co author: Fangming Zhao Songnian Yin He Song Yang Bai Nathalie Tran Yang Zhang Yang Liu 
// remember to add jar-lib into dependency before run server
package com.LCweb.websocket;

import java.io.IOException;
import java.io.StringWriter;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonWriter;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;



@ServerEndpoint("/livechatServerEndpoint")
public class LiveChatEndpoint {
	static Set<Session> livechatusers = Collections.synchronizedSet(new HashSet<Session>());
	
	@OnOpen
	public void handleOpen(Session userSession){
		livechatusers.add(userSession);
		
	}
	@OnMessage
	public void handleMessage(String message, Session userSession) throws IOException {
		String username = (String) userSession.getUserProperties().get("username");	// get current username
		
		if (username == null){
			userSession.getUserProperties().put("username", message); // if you dont hava a username at the beginning of chat, server will assign one
																	  // from message
			userSession.getBasicRemote().sendText(buildJsonData("System", "you are new connected as " + message));
		}else {
			Iterator<Session> iterator = livechatusers.iterator();	// if you already have username, just send as you wish. first give current 
																	// content of livechatusers set to iterator
			while (iterator.hasNext())iterator.next().getBasicRemote().sendText(buildJsonData(username, message));
			
		}
	}
	@OnClose
	public void handleClose(Session userSession){
		livechatusers.remove(userSession);
	}
	private String buildJsonData(String username, String message){
		
		JsonObject jsonObject = Json.createObjectBuilder().add("message", username + ": " + message).build();
		StringWriter stringWriter = new StringWriter();
		try (JsonWriter jsonWriter = Json.createWriter(stringWriter)){jsonWriter.write(jsonObject);}
		
		return stringWriter.toString();
	}
	
	
	
	
}
