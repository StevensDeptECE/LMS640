package com.rl.controller;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class doJson {
	protected String getJsonString(String urlPath) throws Exception {  
        URL url = new URL(urlPath);  
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();  
        connection.connect();  
        InputStream inputStream = connection.getInputStream();  
        //对应的字符编码转换  
        Reader reader = new InputStreamReader(inputStream, "UTF-8");  
        BufferedReader bufferedReader = new BufferedReader(reader);  
        String str = null;  
        StringBuffer sb = new StringBuffer();  
        while ((str = bufferedReader.readLine()) != null) {  
            sb.append(str);  
        }  
        reader.close();  
        connection.disconnect();  
        return sb.toString();  
    }  
	
	public JsonObject getJsonO(String path) throws Exception{
		JsonParser parse =new JsonParser();  
        JsonObject json=(JsonObject) parse.parse(new FileReader(path)); 
		return json;
	}
	
	public String get(JsonObject json, String oName, String cName) throws Exception{
	   	JsonObject object = (JsonObject) json.get(oName);  
        String re = object.get(cName).getAsString();     
        return re;
	}
	
	public String get(JsonObject json, String cName) throws Exception{
        String re = json.get(cName).getAsString();     
        return re;
	}
}

/*	
	public void jsonToObj(String jsonStr) throws Exception {  
        JSONObject jsonObject = new JSONObject(jsonStr);  
        String fatherName = jsonObject.getString("FatherName");  
        JSONArray childs= jsonObject.getJSONArray("Childs");  
        int length = childs.length();  
        for (int i = 0; i < length; i++) {  
            jsonObject = childs.getJSONObject(i);  
            String childName = jsonObject.getString("Name");  
        }  
    }  */