var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http); 

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var port = 3000;

var chatSchema = new Schema({
    user: {
        name: String,
        status: String,
        icon: String,
        role: String
    },
    chat:{
        content: String,
        date: {type: Date, default: Date.now}
    }
});

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
