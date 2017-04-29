var express =require('express');
var app =express();
var mongojs = require('mongojs');
var db = mongojs('discussionlist',['discussionlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());

app.get('/discussionlist',function(req,res){
	console.log("I received a get request");

	db.discussionlist.find(function(err,docs){
		console.log(docs);
		res.json(docs);
	});
});

app.post('/discussionlist',function(req,res){
	console.log(req.body);
	db.discussionlist.insert(req.body,function(err,doc){
		res.json(doc);
	})	
});

app.delete('/discussionlist/:id',function(req,res){
	var id=req.params.id;
	console.log(id);
	db.discussionlist.remove({_id:mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	})
});

app.listen(3000);
console.log("Server running on port 3000");
