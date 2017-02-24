'use strict';
var fs=require("fs");
fs.readFile("input.txt",function(err,data){
    if(err)
    return console.err(error);
    console.log(data.toString());
});
console.log("function end");
