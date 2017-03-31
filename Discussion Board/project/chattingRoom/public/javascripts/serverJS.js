var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http); 


var port = 3000;


io.on('connection', function(socket){
    console.log("someone sneaks in...");
    socket.on("new-message", function(msg){
        console.log("yes, start to send!!", msg);
        io.emit("receive-message", msg);
    })
});
http.listen(port, function(){
    console.log("Server is runing at port" + port);
});