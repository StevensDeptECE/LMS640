package com.chatroom.websocket;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;


import net.sf.json.JSONObject;

/*-----------------------------------
* Name: Endpoint of live chatting room server
* Author: Fangming Zhao Songnian Yin He Song Yang Bai Bhavitha Yang Liu Yang Zhang
* Date:
*
*commons-beanutils-1.8.0.jar、commons-collections-3.2.1.jar、commons-lang-2.5.jar、commons-logging-1.1.1.jar、ezmorph-1.0.6.jar和json-lib-2.4-jdk15.jar
*-----------------------------------*/

@ServerEndpoint("/Chatroom")
public class chatroom {
	static Set<Session> livechatusers = Collections.synchronizedSet(new HashSet<Session>());
	private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("MM-dd-yyyy HH:mm");
	private static int onlineCount = 0;					// count number of people who is online;
	
	@OnOpen
	public void handleOpen(Session userSession){
		livechatusers.add(userSession);	// put all the user information into a set
		addOnlineCount();
		System.out.println("Someone sneak in, the number of people now is " +  getOnlineCount());
	}
	@OnMessage
	public void handleMessage(String message, Session userSession){
		String jsonStr = "{\"password\":\"123456\",\"username\":\"张三\"}";
        //JSONObject jsonLCRObject = JSONObject.fromObject(message);					// LCR means LiveChatRoom
		System.out.println(message);
		String username = (String) userSession.getUserProperties().get("username");	// get value from key username and Stringify it and give it to username,
																		// which is string type.

        JSONObject jsonObject = JSONObject.fromObject(message);

        jsonObject.put("date", DATE_FORMAT.format(new Date()));
        // 把消息发送给所有连接的会话
        for (Session openSession : userSession.getOpenSessions()) {
            // 添加本条消息是否为当前会话本身发的标志
            jsonObject.put("isSelf", openSession.equals(userSession));
            // 发送JSON格式的消息
    		System.out.println(username);	
            openSession.getAsyncRemote().sendText(jsonObject.toString());
        }
		/*if (username == null){
			userSession.getUserProperties().put("username", message); // create a key username and move data, which is in message, into this key only if 
																	  // username is null or no key called username in current session 
			System.out.println("Im online1!");
		}else {
			// Iterator<Session> iterator = livechatusers.iterator();	// if you already have username, just send as you wish. first give current 
																	// content of livechatusers set to iterator. interator is index to retrieve.
			System.out.println("Im online2!");
	        jsonLCRObject.put("nickname", username);									// put username, which is in session, into key nickname as jsonObj
	        jsonLCRObject.put("date", DATE_FORMAT.format(new Date()));					// put date into json
	        for (Session openSession : userSession.getOpenSessions()) {
	        	jsonLCRObject.put("isSelf", openSession.equals(userSession));			// use
	        	try{
	        		openSession.getBasicRemote().sendText(jsonLCRObject.toString());
	        	}catch(IOException t){
	        		t.printStackTrace();
	        	}
	        }
			
		}*/
}
	@OnClose
	public void handleClose(Session userSession){
		livechatusers.remove(userSession);
		subOnlineCount();
		System.out.println("Someone sneak out, the number of people now is " +  getOnlineCount());
	}
	@OnError
	public void  handleError(Throwable t){
		t.printStackTrace();
	}
	public static synchronized void addOnlineCount() {  
		chatroom.onlineCount++;  
	}  
    public static synchronized void subOnlineCount() {  
    	chatroom.onlineCount--;  
    } 
    public static synchronized int getOnlineCount() {  
        return onlineCount;  
    }  
}
