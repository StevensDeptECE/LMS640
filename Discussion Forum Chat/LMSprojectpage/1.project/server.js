var express = require('express');
var app = express();

app.use(express.static(__dirname + "/public"));
app.get('/projectlist',function(req,res){
	console.log("I received a GET request")
})

app.listen(3000);
console.log("server running on port 3000");