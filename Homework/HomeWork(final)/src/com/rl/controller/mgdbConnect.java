package com.rl.controller;
import com.mongodb.*;

import java.net.UnknownHostException;

// To directly connect to a single MongoDB server (note that this will not auto-discover the primary even
// if it's a member of a replica set:

public class mgdbConnect {
	final String HOST = "Localhost";
	final int PORT = 27017;
	final String DBNAME = "person";
	public static mgdbConnect instance;
	public Mongo connection;
	public DB database;
	
	@SuppressWarnings("deprecation")
	private mgdbConnect() throws UnknownHostException{
		this.connection = new Mongo(this.HOST, this.PORT);
		this.database = this.connection.getDB(this.DBNAME);
	}
	
	public static mgdbConnect createInstance() throws UnknownHostException{
		if(mgdbConnect.instance == null){
			mgdbConnect.instance = new mgdbConnect();
		}
		return mgdbConnect.instance;
	}
	
	public DBCollection getCollection(String name){
		return this.database.getCollection(name);
	}
}
