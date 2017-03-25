var user =[
	{name:"luoyu",
	 sex:"male",
	 cwid:"1041511",
	 picture:"url"},
	
	{name:"zhangyang",
     sex:"male",
     cwid:"1041512",
     picture:"url"}

];

var time =new Date();

var discussion=[
	{		"id": "1",	
			"subject": "CSP",
			"user":user[0].name,					
			"posttime":time,
			"content":"text",						
			"reply"	:[{"user":user[0].name,"content":"text","reply_time":time},
					  {"user":user[1].name,"content":"text","reply_time":time},
					  ]
					  }]; 