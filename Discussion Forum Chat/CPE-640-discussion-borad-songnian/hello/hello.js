'use strict';

var s = 'Hello';
function greet(name)
{
    console.log(s+','+name+'!');
}
var arry = ['潘莹峻','bear','songnian'];
function love(arr)
{
    arr.forEach(function(element) {
        console.log("love," + element)
    });
}

module.exports = 
{
    greet:greet,
    arry:arry,
    love:love,
};//so other module can use this function