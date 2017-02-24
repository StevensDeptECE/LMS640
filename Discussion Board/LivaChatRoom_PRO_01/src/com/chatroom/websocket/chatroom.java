package com.chatroom.websocket;

import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.springframework.web.socket.server.standard.SpringConfigurator;

import net.sf.json.JSONObject;

/*-----------------------------------
* Name: Endpoint of live chatting room server
* Author: Fangming Zhao Songnian Yin He Song Yang Bai Bhavitha Yang Liu Yang Zhang
* Date:
*
*
*-----------------------------------*/

@ServerEndpoint(value="/LiveChatServerEndpoint", configurator = SpringConfigurator.class)
public class chatroom {
	static Set<Session> livechatusers = Collections.synchronizedSet(new HashSet<Session>());
	private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("MM-dd-yyyy HH:mm");
	
	@OnOpen
	public void handleOpen(Session userSession){
		livechatusers.add(userSession);
	}
	@OnMessage
	public void handleMessage(String message, Session userSession){
		JSONObject jsonObject = JSONObject.fromObject(message);
	}
	@OnClose
	public void handleClose(){
		
	}
	@OnError
	public void handleError(Throwable t){
		t.printStackTrace();
	}
}
